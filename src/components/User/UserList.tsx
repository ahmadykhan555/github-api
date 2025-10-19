import { useEffect } from 'react';
import { useGithubApi } from '../../hooks/useGithubApi';
import type { GitHubUser } from '../../types/github';
import UserCard from './UserCard';
import { UserListLoadingState } from './UserListLoadingState';
import { UserListEmptyState } from './UserListEmptyState';
import { UserListErrorState } from './UserListErrorState';
import { useSearchSlice, useUserSlice } from '../../store';

const UserList = () => {
  const { getUserRepositories } = useGithubApi();
  const { selectedUser } = useUserSlice();
  const {
    searchTerm,
    searchResults: users,
    isSearching,
    error: searchError,
    resultsCount,
  } = useSearchSlice();

  useEffect(() => {
    if (selectedUser) {
      getUserRepositories(selectedUser.login);
    }
  }, [selectedUser, getUserRepositories]);

  if (isSearching) {
    return <UserListLoadingState />;
  }

  if (searchError) {
    return <UserListErrorState error={searchError} />;
  }

  if (!searchTerm.trim() || users.length === 0) {
    return <UserListEmptyState />;
  }

  return (
    <div className="flex flex-col max-h-full ">
      <p className="text-gray-400 mb-4 ">
        Showing {users.length} of {resultsCount} results for:{' '}
        <span className="text-white font-medium">"{searchTerm}"</span>
      </p>
      <div className="flex-1 grid grid-cols-1 gap-4">
        {users.map((user: GitHubUser) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
