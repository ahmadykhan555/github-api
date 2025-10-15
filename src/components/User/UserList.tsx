import React, { useEffect } from 'react';
import { useUsers } from '../../hooks/useUsers';
import { useDebounce } from '../../hooks/useDebounce';
import type { GitHubUser } from '../../types/github';
import UserCard from './UserCard';
import useGlobalStore from '../../store/useGlobalStore';
import { UserListLoadingState } from './UserListLoadingState';
import { UserListEmptyState } from './UserListEmptyState';
import { UserListErrorState } from './UserListErrorState';

interface UserListProps {
  // add props here if needed
}

const UserList: React.FC<UserListProps> = () => {
  const { error, searchUsers, clearUsers } = useUsers();
  const { userSearchResults: users, searchTerm, isLoadingUsers } = useGlobalStore();
  const debouncedSearchTerm = useDebounce(searchTerm);

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      searchUsers(debouncedSearchTerm);
    } else {
      clearUsers();
    }
  }, [debouncedSearchTerm, searchUsers, clearUsers]);

  if (isLoadingUsers) {
    return <UserListLoadingState />;
  }

  if (error) {
    return <UserListErrorState error={error} />;
  }

  if (!searchTerm.trim() || users.length === 0) {
    return <UserListEmptyState />;
  }

  return (
    <div>
      <p className="text-gray-400 mb-4">
        Showing {users.length} results for:{' '}
        <span className="text-white font-medium">"{searchTerm}"</span>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user: GitHubUser) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
