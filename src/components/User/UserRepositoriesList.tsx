import useGlobalStore from '../../store/useGlobalStore';

export const UserRepositoriesList: React.FC<{}> = () => {
  const { userRepositories } = useGlobalStore();
  return (
    <div className="mt-4 pt-4 border-t border-gray-500">
      <h5 className="text-white font-medium mb-3 text-sm">
        Repositories ({userRepositories.length})
      </h5>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {userRepositories.map((repository) => (
          <div
            key={repository.id}
            className="bg-gray-700 rounded-md p-3 hover:bg-gray-600 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <a
                  href={repository.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors block truncate"
                >
                  {repository.name}
                </a>
                {repository.description && (
                  <p className="text-gray-300 text-xs mt-1 line-clamp-2">
                    {repository.description}
                  </p>
                )}
                <div className="flex space-x-3 text-xs text-gray-400 mt-2">
                  <span>Created: {new Date(repository.created_at).toLocaleDateString()}</span>
                  <span>Updated: {new Date(repository.updated_at).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="ml-2 flex-shrink-0">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
