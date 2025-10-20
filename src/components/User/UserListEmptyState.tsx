import { useSearchSlice } from '../../store';

export const UserListEmptyState = () => {
  const { isSearching, searchedTerm, resultsCount } = useSearchSlice();
  return (
    <div className="text-gray-400 text-center py-8">
      {!isSearching && resultsCount === 0 && searchedTerm.trim() ? (
        <p>No results found</p>
      ) : (
        <p>Enter a username above to search for GitHub users</p>
      )}
    </div>
  );
};
