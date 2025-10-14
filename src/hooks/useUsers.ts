import { useState, useCallback } from 'react';
import type { GitHubUser, GitHubSearchResponse, UseUsersReturn } from '../types/github';
import { GITHUB_API_BASE, USER_SEARCH_LIMIT } from '../constants';

export const useUsers = (): UseUsersReturn => {
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchUsers = useCallback(async (query: string) => {
    if (!query.trim()) {
      setUsers([]);
      return;
    }

    setLoading(true);
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
      setUsers(data.items);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearUsers = useCallback(() => {
    setUsers([]);
    setError(null);
  }, []);

  return {
    users,
    loading,
    error,
    searchUsers,
    clearUsers,
  };
};
