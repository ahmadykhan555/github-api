import React from 'react';
import searchIcon from '../assets/icons/search.svg';

const Header: React.FC = () => {
    return (
        <header className="bg-gray-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col space-y-4 py-4 md:hidden">
                    <div className="flex justify-center items-center">
                        <div className="flex-shrink-0">
                            <h1 className="text-2xl font-bold text-white">GitHub API</h1>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <img
                                    src={searchIcon}
                                    alt="Search"
                                    className="h-5 w-5 text-gray-400"
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Search repositories, users, or topics..."
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex items-center py-4">
                    <div className="flex items-center flex-shrink-0">
                        <h1 className="text-2xl font-bold text-white">GitHub API</h1>
                    </div>

                    <div className="flex-1 flex justify-center">
                        <div className="w-full max-w-lg">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <img
                                        src={searchIcon}
                                        alt="Search"
                                        className="h-5 w-5 text-gray-400"
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search repositories, users, or topics..."
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex-shrink-0 w-32"></div>
                </div>
            </div>
        </header>
    );
};

export default Header;
