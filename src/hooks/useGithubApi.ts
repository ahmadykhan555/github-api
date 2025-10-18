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
    } catch (err) {
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
    error,
    searchUsers,
    clearUsers,
    getUserRepositories,
  };
};

const parseAPIError = ({
  error,
  statusCode = -1,
  context,
  method = 'GET',
}: {
  error?: unknown;
  statusCode?: number;
  context: 'search' | 'repositories';
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
}): { errorMessage: string; throwException: boolean } => {
  let errorMessage = '';

  if (statusCode === 403) {
    errorMessage = `${method} ${context} failed: GitHub API rate limit exceeded. Please try again later.`;
  } else if (error) {
    errorMessage = `${method} ${context} failed: ${error instanceof Error ? error.message : 'An unexpected error occurred'}`;
  } else {
    errorMessage = `${method} ${context} failed: An unexpected error occurred}`;
  }

  return {
    errorMessage,
    throwException: [403, 500].includes(statusCode),
  };
};
