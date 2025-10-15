import useGlobalStore from '../../store/useGlobalStore';

export const UserListEmptyState: React.FC<{ loading: boolean }> = ({ loading }) => {
  const { searchTerm } = useGlobalStore();
  return loading ? (
    <div className="text-gray-400 text-center py-8">
      <p>Enter a username above to search for GitHub users</p>
    </div>
  ) : (
    <div className="text-gray-400 text-center py-8">
      <p>No users found for "{searchTerm}"</p>
    </div>
  );
};
