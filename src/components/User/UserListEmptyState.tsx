import { useSearchSlice } from '../../store';

export const UserListEmptyState: React.FC<{}> = () => {
  const { searchTerm, isSearching } = useSearchSlice();
  return isSearching || !searchTerm.trim() ? (
    <div className="text-gray-400 text-center py-8">
      <p>Enter a username above to search for GitHub users</p>
    </div>
  ) : (
    <div className="text-gray-400 text-center py-8">
      <p>No users found for "{searchTerm}"</p>
    </div>
  );
};
