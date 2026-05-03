const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-4">
      <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-slate-500 font-medium">Loading listing...</p>
    </div>
  );
};

export default LoadingState;
