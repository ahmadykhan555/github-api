import { useUserSlice } from '../../store';
import { RepositoryCard } from './RepositoryCard';
import { RepositoryListLoadingState } from './RepositoryListLoadingState';

export const UserRepositoriesList: React.FC<{}> = () => {
  const { userRepositories, isLoadingUserRepositories: isLoadingRepositories } = useUserSlice();

  return (
    <div className="mt-4 pt-4 border-t border-gray-500">
      {!isLoadingRepositories && (
        <h5 className="text-white font-medium mb-3 text-sm">
          Repositories ({userRepositories.length})
        </h5>
      )}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {isLoadingRepositories ? (
          <RepositoryListLoadingState />
        ) : userRepositories.length ? (
          userRepositories.map((repository) => (
            <RepositoryCard key={repository.id} repository={repository} />
          ))
        ) : (
          <p className="text-xs text-gray-400">No repositories found</p>
        )}
      </div>
    </div>
  );
};
