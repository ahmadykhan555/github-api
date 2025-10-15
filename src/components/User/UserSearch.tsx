import React, { useState } from 'react';
import UserList from './UserList';
const UserSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="w-full max-w-md mb-8">
        <input
          type="text"
          placeholder="Search for a GitHub user..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Results Row */}
      <div className="w-full max-w-4xl">
        <div className="bg-gray-700 rounded-lg p-6 min-h-[200px] ">
          <h3 className="text-white text-lg font-semibold mb-4">Search Results</h3>
          <UserList searchTerm={searchTerm} />
        </div>
      </div>
    </div>
  );
};

export default UserSearch;
