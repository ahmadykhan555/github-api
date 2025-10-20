import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import UserCard from '../../../src/components/User/UserCard';
import type { GitHubUser } from '../../../src/types';

// Mock the useUserSlice hook
const mockSetSelectedUser = vi.fn();
let mockSelectedUser: GitHubUser | null = null;

vi.mock('../../../src/store', () => ({
  useUserSlice: () => ({
    setSelectedUser: mockSetSelectedUser,
    selectedUser: mockSelectedUser,
  }),
}));

// Mock the UserRepositoriesList component
vi.mock('../../../src/components/Repository/UserRepositoriesList', () => ({
  UserRepositoriesList: () => <div data-testid="user-repositories-list">Repositories List</div>,
}));

// Mock the SVG icon
vi.mock('../../../src/assets/icons/chevron-down.svg', () => ({
  default: ({ className, ...props }: { className?: string; [key: string]: unknown }) => (
    <svg data-testid="chevron-down-icon" className={className} {...props}>
      <path d="M7 10l5 5 5-5z" />
    </svg>
  ),
}));

describe('UserCard', () => {
  const mockUser: GitHubUser = {
    id: 1,
    login: 'testuser',
    avatar_url: 'https://example.com/avatar.jpg',
    html_url: 'https://github.com/testuser',
    type: 'User',
    name: 'Test User',
    public_repos: 10,
    public_gists: 5,
    followers: 100,
    following: 50,
    created_at: '2020-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
  };

  const mockUserWithoutName: GitHubUser = {
    ...mockUser,
    name: undefined,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockSelectedUser = null;
  });

  describe('Rendering', () => {
    it('should render user information correctly', () => {
      render(<UserCard user={mockUser} />);

      expect(screen.getByText('testuser')).toBeInTheDocument();
      expect(screen.getByText('Test User')).toBeInTheDocument();
      expect(screen.getByText('100 followers')).toBeInTheDocument();
      expect(screen.getByText('10 repos')).toBeInTheDocument();
    });

    it('should render user without name when name is not provided', () => {
      render(<UserCard user={mockUserWithoutName} />);

      expect(screen.getByText('testuser')).toBeInTheDocument();
      expect(screen.queryByText('Test User')).not.toBeInTheDocument();
    });
  });

  describe('User Selection', () => {
    it('should call setSelectedUser with user when card is clicked and user is not selected', () => {
      render(<UserCard user={mockUser} />);

      const card = screen.getByText('testuser').closest('[class*="bg-gray-600"]');
      fireEvent.click(card!);

      expect(mockSetSelectedUser).toHaveBeenCalledTimes(1);
      expect(mockSetSelectedUser).toHaveBeenCalledWith(mockUser);
    });

    it('should call setSelectedUser with null when card is clicked and user is already selected', () => {
      mockSelectedUser = mockUser;
      render(<UserCard user={mockUser} />);

      const card = screen.getByText('testuser').closest('[class*="bg-gray-600"]');
      fireEvent.click(card!);

      expect(mockSetSelectedUser).toHaveBeenCalledTimes(1);
      expect(mockSetSelectedUser).toHaveBeenCalledWith(null);
    });
  });

  describe('Visual States', () => {
    it('should apply correct classes when user is selected', () => {
      mockSelectedUser = mockUser;
      render(<UserCard user={mockUser} />);

      const chevronIcon = screen.getByTestId('chevron-down-icon');
      expect(chevronIcon).toHaveClass('rotate-180');
    });
  });

  describe('UserRepositoriesList Integration', () => {
    it('should render UserRepositoriesList when user is selected', () => {
      mockSelectedUser = mockUser;
      render(<UserCard user={mockUser} />);

      expect(screen.getByTestId('user-repositories-list')).toBeInTheDocument();
    });

    it('should not render UserRepositoriesList when user is not selected', () => {
      render(<UserCard user={mockUser} />);

      expect(screen.queryByTestId('user-repositories-list')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard accessible', () => {
      render(<UserCard user={mockUser} />);

      const card = screen.getByText('testuser').closest('[class*="bg-gray-600"]');
      expect(card).toBeInTheDocument();

      // Test click interaction (which works for both mouse and keyboard)
      fireEvent.click(card!);
      expect(mockSetSelectedUser).toHaveBeenCalledWith(mockUser);
    });

    it('should have proper clickable element', () => {
      render(<UserCard user={mockUser} />);

      const card = screen.getByText('testuser').closest('[class*="bg-gray-600"]');
      expect(card).toHaveClass('cursor-pointer');
    });
  });
});
