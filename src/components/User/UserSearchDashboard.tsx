import React, { useEffect, useRef } from 'react';
import UserList from './UserList';
import { useGithubApi } from '../../hooks/useGithubApi';
import { useSearchSlice } from '../../store';
const UserSearchDashboard: React.FC = () => {
  const { searchTerm, setSearchTerm } = useSearchSlice();
  const { searchUsers } = useGithubApi();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchUsers(searchTerm);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="w-full max-w-md my-8">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for a GitHub user..."
            value={searchTerm}
            onKeyDown={handleKeyDown}
            onChange={handleSearchChange}
            className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
          />
          <button
            title={!searchTerm ? 'Enter a search term to search for users' : 'Search for users'}
            disabled={!searchTerm}
            onClick={() => searchUsers(searchTerm)}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-sm bg-green-600 hover:bg-green-500 text-white transition-colors duration-200 focus:outline-none focus:ring-0 
              focus:ring-green/30 disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-label="Search"
          >
            GO!
          </button>
        </div>
      </div>

      {/* Results Row */}
      <div className="w-full max-w-4xl">
        <div className="bg-gray-700 rounded-lg p-6 min-h-[200px] ">
          <h3 className="text-white text-lg font-semibold mb-4">Search Results</h3>
          <UserList />
        </div>
      </div>
    </div>
  );
};

export default UserSearchDashboard;
