import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import UserSearchDashboard from '../../src/components/User/UserSearchDashboard';

// Mock fetch to simulate real API responses
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock the SVG icon
vi.mock('../../src/assets/icons/chevron-down.svg', () => ({
  default: ({ className, ...props }: { className?: string; [key: string]: unknown }) => (
    <svg data-testid="chevron-down-icon" className={className} {...props}>
      <path d="M7 10l5 5 5-5z" />
    </svg>
  ),
}));

describe('User Search Integration', () => {
  const mockUsers = [
    {
      id: 1,
      login: 'octocat',
      avatar_url: 'https://github.com/images/error/octocat_happy.gif',
      html_url: 'https://github.com/octocat',
      type: 'User',
      name: 'The Octocat',
      public_repos: 8,
      public_gists: 8,
      followers: 1000,
      following: 9,
      created_at: '2011-01-25T18:44:36Z',
      updated_at: '2023-01-01T00:00:00Z',
    },
  ];

  it('should render search input and allow user to type', async () => {
    render(<UserSearchDashboard />);

    const searchInput = screen.getByPlaceholderText('Search for a GitHub user...');
    expect(searchInput).toBeInTheDocument();

    // Type in the search input
    fireEvent.change(searchInput, { target: { value: 'octocat' } });
    expect(searchInput).toHaveValue('octocat');
  });

  it('should trigger search when Enter key is pressed', async () => {
    // Mock successful API response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: mockUsers,
        total_count: 1,
      }),
    });

    render(<UserSearchDashboard />);

    const searchInput = screen.getByPlaceholderText('Search for a GitHub user...');
    fireEvent.change(searchInput, { target: { value: 'octocat' } });
    fireEvent.keyDown(searchInput, { key: 'Enter' });

    // Wait for API call
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/search/users?q=octocat'));
    });
  });

  it('should display search results when API returns users', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: mockUsers,
        total_count: 1,
      }),
    });

    render(<UserSearchDashboard />);

    const searchInput = screen.getByPlaceholderText('Search for a GitHub user...');
    fireEvent.change(searchInput, { target: { value: 'octocat' } });
    fireEvent.keyDown(searchInput, { key: 'Enter' });

    // Wait for results to appear
    await waitFor(() => {
      expect(screen.getByText('octocat')).toBeInTheDocument();
      expect(screen.getByText('The Octocat')).toBeInTheDocument();
      expect(screen.getByText('1000 followers')).toBeInTheDocument();
    });
  });

  it('should trigger search when GO button is clicked', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: [],
        total_count: 0,
      }),
    });

    render(<UserSearchDashboard />);

    const searchInput = screen.getByPlaceholderText('Search for a GitHub user...');
    const goButton = screen.getByText('GO!');

    fireEvent.change(searchInput, { target: { value: 'testuser' } });
    fireEvent.click(goButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/search/users?q=testuser'));
    });
  });

  it('should handle API errors gracefully', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(<UserSearchDashboard />);

    const searchInput = screen.getByPlaceholderText('Search for a GitHub user...');
    fireEvent.change(searchInput, { target: { value: 'erroruser' } });
    fireEvent.keyDown(searchInput, { key: 'Enter' });

    // Wait for error handling
    await waitFor(() => {
      // The component should handle the error without crashing
      expect(searchInput).toHaveValue('erroruser');
    });
  });

  it('should display results count using searchedTerm not searchTerm', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: mockUsers,
        total_count: 116491,
      }),
    });

    render(<UserSearchDashboard />);

    const searchInput = screen.getByPlaceholderText('Search for a GitHub user...');

    // Search for "ahmad"
    fireEvent.change(searchInput, { target: { value: 'ahmad' } });
    fireEvent.keyDown(searchInput, { key: 'Enter' });

    // Wait for results to appear
    await waitFor(() => {
      expect(screen.getByText('Showing 1 of 116491 results for:')).toBeInTheDocument();
      expect(screen.getByText('"ahmad"')).toBeInTheDocument();
    });

    // Now change the search input to something else (but don't search)
    fireEvent.change(searchInput, { target: { value: 'different-search' } });

    // The results display should still show "ahmad" (searchedTerm) not "different-search" (searchTerm)
    expect(screen.getByText('Showing 1 of 116491 results for:')).toBeInTheDocument();
    expect(screen.getByText('"ahmad"')).toBeInTheDocument();
    expect(screen.queryByText('"different-search"')).not.toBeInTheDocument();
  });
});
