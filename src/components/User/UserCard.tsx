import type { GitHubUser } from '../../types';

const UserCard: React.FC<{ user: GitHubUser }> = ({ user }) => {
  return (
    <div className="bg-gray-600 rounded-lg p-4 hover:bg-gray-500 transition-colors ">
      <div className="flex items-center space-x-3">
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-medium truncate">
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              {user.login}
            </a>
          </h4>
          {user.name && <p className="text-gray-300 text-sm truncate">{user.name}</p>}
          <div className="flex space-x-4 text-xs text-gray-400 mt-1">
            <span>{user.followers} followers</span>
            <span>{user.public_repos} repos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
