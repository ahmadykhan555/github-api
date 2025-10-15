import React, { useEffect } from 'react';
import { useUsers } from '../../hooks/useUsers';
import { useDebounce } from '../../hooks/useDebounce';
import type { GitHubUser } from '../../types/github';
import UserCard from './UserCard';
import useGlobalStore from '../../store/useGlobalStore';

interface UserListProps {
  searchTerm: string;
}

const UserList: React.FC<UserListProps> = ({ searchTerm }) => {
  const { loading, error, searchUsers, clearUsers } = useUsers();
  const { userSearchResults: users } = useGlobalStore();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      searchUsers(debouncedSearchTerm);
    } else {
      clearUsers();
    }
  }, [debouncedSearchTerm, searchUsers, clearUsers]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-gray-400">Searching users...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 text-center py-4">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!searchTerm.trim()) {
    return (
      <div className="text-gray-400 text-center py-8">
        <p>Enter a username above to search for GitHub users</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-gray-400 text-center py-8">
        <p>No users found for "{searchTerm}"</p>
      </div>
    );
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
