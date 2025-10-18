import { useState, useCallback } from 'react';
import type { GitHubRepository, GitHubSearchResponse, UseUsersReturn } from '../types/github';
import { GITHUB_API_BASE, USER_SEARCH_LIMIT } from '../constants';
import useGlobalStore from '../store/useGlobalStore';

export const useUsers = (): UseUsersReturn => {
  const {
    userSearchResults,
    setUserSearchResults,
    setIsLoadingUsers,
    setUserRepositories,
    setIsLoadingRepositories,
  } = useGlobalStore();

  const [error, setError] = useState<string | null>(null);

  const searchUsers = useCallback(async (query: string) => {
    if (!query.trim()) {
      setUserSearchResults([]);
      return;
    }

    clearUsers();

    setIsLoadingUsers(true);
    setError(null);

    try {
      const response = await fetch(
        `${GITHUB_API_BASE}/search/users?q=${encodeURIComponent(query)}&per_page=${USER_SEARCH_LIMIT}`
      );

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('GitHub API rate limit exceeded. Please try again later.');
        }
        throw new Error(`Failed to fetch users: ${response.statusText}`);
      }

      const data: GitHubSearchResponse = await response.json();
      setUserSearchResults(data.items);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      setUserSearchResults([]);
    } finally {
      setIsLoadingUsers(false);
    }
  }, []);

  const clearUsers = useCallback(() => {
    setUserSearchResults([]);
    setError(null);
  }, []);

  const getUserRepositories = useCallback(async (username: string) => {
    setUserRepositories([]);
    setIsLoadingRepositories(true);
    try {
      const response = await fetch(`${GITHUB_API_BASE}/users/${username}/repos`);
      const data: GitHubRepository[] = await response.json();

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('GitHub API rate limit exceeded. Please try again later.');
        }
        throw new Error(`Failed to fetch user repositories: ${response.statusText}`);
      }

      setUserRepositories(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
      setUserRepositories([]);
    } finally {
      setIsLoadingRepositories(false);
    }
  }, []);

  return {
    users: userSearchResults,
    error,
    searchUsers,
    clearUsers,
    getUserRepositories,
  };
};
