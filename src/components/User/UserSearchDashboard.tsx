import React, { useEffect } from 'react';
import UserList from './UserList';
import { useGithubApi } from '../../hooks/useGithubApi';
import { useSearchSlice } from '../../store';
import BaseInput from '../Base/Input';
const UserSearchDashboard: React.FC = () => {
  const { searchTerm, setSearchTerm } = useSearchSlice();
  const { searchUsers, clearUsers } = useGithubApi();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchUsers(searchTerm);
    }
  };

  useEffect(() => {
    if (!searchTerm.trim()) {
      clearUsers();
    }
  }, [searchTerm, clearUsers]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 !max-h-full">
      <div className="w-full max-w-md my-8">
        <div className="relative">
          <BaseInput
            autoFocus
            value={searchTerm}
            onKeyDownHandler={handleKeyDown}
            onChangeHandler={handleSearchChange}
            ctaText="GO!"
            onCtaClickHandler={() => searchUsers(searchTerm)}
            tooltipText={
              !searchTerm ? 'Enter a search term to search for users' : 'Search for users'
            }
            id="user-search-input"
            placeholder="Search for a GitHub user..."
          />
        </div>
      </div>

      {/* Results Row */}
      <div className="w-full max-w-4xl max-h-[calc(100vh-280px)] md:max-h-[calc(100vh-300px)] overflow-y-auto">
        <div className="bg-gray-700 rounded-lg p-6 min-h-[200px] ">
          <h3 className="text-white text-lg font-semibold mb-4">Search Results</h3>
          <UserList />
        </div>
      </div>
    </div>
  );
};

export default UserSearchDashboard;
