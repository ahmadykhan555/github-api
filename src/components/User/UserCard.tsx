import React from 'react';
import { useUserSlice } from '../../store';
import type { GitHubUser } from '../../types';
import { UserRepositoriesList } from './UserRepositoriesList';

const UserCard: React.FC<{ user: GitHubUser }> = React.memo(({ user }) => {
  const { setSelectedUser, selectedUser } = useUserSlice();

  const toggleUserSelection = () => {
    if (selectedUser?.id === user.id) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
    }
  };

  return (
    <div
      className={`bg-gray-600 rounded-lg p-4 hover:bg-gray-500 transition-colors  cursor-pointer`}
      onClick={toggleUserSelection}
    >
      {/* user information like name avatar etc */}
      <div className="flex items-center space-x-3">
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-medium truncate">
            <p>{user.login}</p>
          </h4>
          {user.name && <p className="text-gray-300 text-sm truncate">{user.name}</p>}
          <div className="flex space-x-4 text-xs text-gray-400 mt-1">
            <span>{user.followers} followers</span>
            <span>{user.public_repos} repos</span>
          </div>
        </div>
      </div>
      {/* user repositories information */}
      {selectedUser?.id === user.id && <UserRepositoriesList />}
    </div>
  );
});

export default UserCard;
