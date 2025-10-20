export const RepositoryListLoadingState = () => {
  return (
    <div className="flex items-center justify-center py-8  flex-col gap-4">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="bg-gray-700 rounded-md p-3 hover:bg-gray-600 transition-colors h-20 w-full animate-pulse"
        />
      ))}
    </div>
  );
};
