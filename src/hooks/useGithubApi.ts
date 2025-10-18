import { useState, useCallback } from 'react';
import type { GitHubRepository, GitHubSearchResponse, UseGithubApiReturn } from '../types/github';
import { GITHUB_API_BASE, USER_SEARCH_LIMIT } from '../constants';
import { useSearchSlice, useUserSlice } from '../store';
import { useErrorHandling } from './useErrorHandling';

export const useGithubApi = (): UseGithubApiReturn => {
  const {
    setSearchResults: setUserSearchResults,
    setIsSearching,
    searchResults,
    setError: setSearchError,
  } = useSearchSlice();
  const { setUserRepositories, setIsLoadingUserRepositories, setUserRepositoriesError } =
    useUserSlice();

  const { parseAPIError } = useErrorHandling();

  const searchUsers = useCallback(async (query: string) => {
    if (!query.trim()) {
      setUserSearchResults([]);
      return;
    }

    clearUsers();
    setIsSearching(true);

    try {
      const response = await fetch(
        `${GITHUB_API_BASE}/search/users?q=${encodeURIComponent(query)}&per_page=${USER_SEARCH_LIMIT}`
      );

      if (!response.ok) {
        const { errorMessage, throwException } = parseAPIError({
          statusCode: response.status,
          context: 'search',
        });

        setSearchError(errorMessage);
        setUserSearchResults([]);

        if (throwException) {
          throw new Error(errorMessage);
        }
      }

      const data: GitHubSearchResponse = await response.json();
      setUserSearchResults(data.items);
    } catch (error) {
      const { errorMessage } = parseAPIError({ error, context: 'search' });
      if (errorMessage) {
        setSearchError(errorMessage);
      }

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
        const { errorMessage, throwException } = parseAPIError({
          statusCode: response.status,
          context: 'repositories',
        });

        setUserRepositoriesError(errorMessage);
        setUserRepositories([]);

        if (throwException) {
          throw new Error(errorMessage);
        }
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
    searchUsers,
    clearUsers,
    getUserRepositories,
  };
};
