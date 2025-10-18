import { useState, useCallback } from 'react';
import type { GitHubRepository, GitHubSearchResponse, UseGithubApiReturn } from '../types/github';
import { GITHUB_API_BASE, USER_SEARCH_LIMIT } from '../constants';
import { useSearchSlice, useUserSlice } from '../store';

export const useGithubApi = (): UseGithubApiReturn => {
  const {
    setSearchResults: setUserSearchResults,
    setIsSearching,
    searchResults,
    setError: setSearchError,
  } = useSearchSlice();
  const { setUserRepositories, setIsLoadingUserRepositories, setUserRepositoriesError } =
    useUserSlice();
  const [error, setError] = useState<string | null>(null);

  const searchUsers = useCallback(async (query: string) => {
    if (!query.trim()) {
      setUserSearchResults([]);
      return;
    }

    clearUsers();

    setIsSearching(true);
    setError(null);

    try {
      const response = await fetch(
        `${GITHUB_API_BASE}/search/users?q=${encodeURIComponent(query)}&per_page=${USER_SEARCH_LIMIT}`
      );

      if (!response.ok) {
        if (response.status === 403) {
          setSearchError('GitHub API rate limit exceeded. Please try again later.');
          throw new Error('GitHub API rate limit exceeded. Please try again later.');
        }
        throw new Error(`Failed to fetch users: ${response.statusText}`);
      }

      const data: GitHubSearchResponse = await response.json();
      setUserSearchResults(data.items);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setSearchError(errorMessage);
      setUserSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const clearUsers = useCallback(() => {
    setUserSearchResults([]);
    setSearchError(null);
  }, []);

  const getUserRepositories = useCallback(async (username: string) => {
    setUserRepositories([]);
    setIsLoadingUserRepositories(true);
    try {
      const response = await fetch(`${GITHUB_API_BASE}/users/${username}/repos`);
      const data: GitHubRepository[] = await response.json();

      if (!response.ok) {
        const errorMessage =
          response.status === 403
            ? 'GitHub API rate limit exceeded. Please try again later.'
            : `Failed to fetch user repositories: ${response.statusText}`;
        setUserRepositoriesError(errorMessage);
        setUserRepositories([]);
        throw new Error(errorMessage);
      }

      setUserRepositories(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setUserRepositoriesError(errorMessage);
      setUserRepositories([]);
    } finally {
      setIsLoadingUserRepositories(false);
    }
  }, []);

  return {
    users: searchResults,
    error,
    searchUsers,
    clearUsers,
    getUserRepositories,
  };
};
