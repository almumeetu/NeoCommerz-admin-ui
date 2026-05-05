export const LoadingSpinner = () => (
  <div className="flex-1 bg-gray-50/50 min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-sm text-gray-500">Loading data...</p>
    </div>
  </div>
);
