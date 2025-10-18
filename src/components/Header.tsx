import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 shadow-lg p-4 md:p-8 ">
      <p className="text-white max-md:text-center text-lg md:text-2xl font-bold">
        GitHub User & Repository Explorer
      </p>
    </header>
  );
};

export default Header;
