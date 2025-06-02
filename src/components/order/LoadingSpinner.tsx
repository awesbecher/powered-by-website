
export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      <p className="text-center text-sm text-gray-600">
        Please answer your phone when it rings...
      </p>
    </div>
  );
};
