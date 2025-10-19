import { useSearchSlice } from '../../store';

export const UserListEmptyState = () => {
  const { isSearching } = useSearchSlice();
  return (
    !isSearching && (
      <div className="text-gray-400 text-center py-8">
        <p>Enter a username above to search for GitHub users</p>
      </div>
    )
  );
};
