export const UserListErrorState: React.FC<{ error: string }> = ({ error }) => {
  return (
    <div className="text-red-400 text-center py-8">
      <p>Error: {error}</p>
    </div>
  );
};
