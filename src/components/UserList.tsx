import React from 'react';

const UserSearch: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  //   const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="text-gray-400">
      {searchTerm ? (
        <p>
          Searching for: <span className="text-white font-medium">"{searchTerm}"</span>
        </p>
      ) : (
        <p>Enter a username above to search for GitHub users</p>
      )}
    </div>
  );
};

export default UserSearch;
