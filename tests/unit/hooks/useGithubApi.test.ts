import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useGithubApi } from '../../../src/hooks/useGithubApi';
import type { GitHubSearchResponse, GitHubUser, GitHubRepository } from '../../../src/types/github';

// Mock the store hooks
const mockSetSearchResults = vi.fn();
const mockSetIsSearching = vi.fn();
const mockSetResultsCount = vi.fn();
const mockSetError = vi.fn();
const mockSetUserRepositories = vi.fn();
const mockSetIsLoadingUserRepositories = vi.fn();
const mockSetUserRepositoriesError = vi.fn();

vi.mock('../../../src/store', () => ({
  useSearchSlice: () => ({
    setSearchResults: mockSetSearchResults,
    setIsSearching: mockSetIsSearching,
    searchResults: [],
    setResultsCount: mockSetResultsCount,
    setError: mockSetError,
  }),
  useUserSlice: () => ({
    setUserRepositories: mockSetUserRepositories,
    setIsLoadingUserRepositories: mockSetIsLoadingUserRepositories,
    setUserRepositoriesError: mockSetUserRepositoriesError,
  }),
}));

// Mock the error handling hook
const mockParseAPIError = vi.fn().mockReturnValue({
  errorMessage: 'Test error message',
  throwException: false,
});
vi.mock('../../../src/hooks/useErrorHandling', () => ({
  useErrorHandling: () => ({
    parseAPIError: mockParseAPIError,
  }),
}));

// Get the mock fetch from global scope
const mockFetch = global.fetch as ReturnType<typeof vi.fn>;

describe('useGithubApi', () => {
  it('should return the correct interface', () => {
    const { result } = renderHook(() => useGithubApi());

    expect(result.current).toHaveProperty('users');
    expect(result.current).toHaveProperty('searchUsers');
    expect(result.current).toHaveProperty('clearUsers');
    expect(result.current).toHaveProperty('getUserRepositories');

    expect(typeof result.current.searchUsers).toBe('function');
    expect(typeof result.current.clearUsers).toBe('function');
    expect(typeof result.current.getUserRepositories).toBe('function');
  });

  describe('searchUsers', () => {
    it('should handle empty query by clearing results', async () => {
      const { result } = renderHook(() => useGithubApi());

      await result.current.searchUsers('   '); // Empty/whitespace query

      // Should clear results and not make API call
      expect(mockSetSearchResults).toHaveBeenCalledWith([]);
    });

    it('should handle successful API call', async () => {
      // Mock api response
      const mockUsers: GitHubUser[] = [
        {
          id: 1,
          login: 'testuser',
          avatar_url: 'https://example.com/avatar.jpg',
          html_url: 'https://github.com/testuser',
          type: 'User',
          bio: 'Test user bio',
          public_repos: 10,
          public_gists: 5,
          followers: 100,
          following: 50,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
        },
      ];

      const mockResponse: GitHubSearchResponse = {
        total_count: 1,
        incomplete_results: false,
        items: mockUsers,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const { result } = renderHook(() => useGithubApi());

      // Call searchUsers
      await result.current.searchUsers('testuser');

      // Wait for the async operation to complete
      await waitFor(() => {
        expect(mockSetIsSearching).toHaveBeenCalledWith(false);
      });

      // Verify the API was called correctly
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/search/users?q=testuser&per_page=')
      );

      // Verify the results were set correctly
      expect(mockSetSearchResults).toHaveBeenCalledWith(mockUsers);
      expect(mockSetResultsCount).toHaveBeenCalledWith(1);
    });

    it('should handle API errors gracefully', async () => {
      // Mock API error response
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
        json: () => Promise.resolve({ message: 'API rate limit exceeded' }),
      });

      mockParseAPIError.mockReturnValue({
        errorMessage: 'API rate limit exceeded',
        throwException: false,
      });

      const { result } = renderHook(() => useGithubApi());

      await result.current.searchUsers('testuser');

      await waitFor(() => {
        expect(mockSetIsSearching).toHaveBeenCalledWith(false);
      });

      // Verify error handling
      expect(mockParseAPIError).toHaveBeenCalledWith({
        statusCode: 403,
        context: 'search',
      });
      expect(mockSetError).toHaveBeenCalledWith('API rate limit exceeded');
      expect(mockSetSearchResults).toHaveBeenCalledWith([]);
    });
  });

  describe('getUserRepositories', () => {
    it('should handle successful repository fetch', async () => {
      // Mock successful API response
      const mockRepositories: GitHubRepository[] = [
        {
          id: 1,
          name: 'test-repo',
          html_url: 'https://github.com/testuser/test-repo',
          description: 'Test repository description',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockRepositories),
      });

      const { result } = renderHook(() => useGithubApi());

      // Call getUserRepositories
      await result.current.getUserRepositories('testuser');

      // Wait for the async operation to complete
      await waitFor(() => {
        expect(mockSetIsLoadingUserRepositories).toHaveBeenCalledWith(false);
      });

      // Verify the API was called correctly
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/users/testuser/repos?sort=created&direction=desc')
      );

      // Verify the results were set correctly
      expect(mockSetUserRepositories).toHaveBeenCalledWith(mockRepositories);
    });
  });
});
