const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div
        className="w-16 h-16 border-4 border-t-4
       border-t-blue-500 border-blue-200 rounded-full animate-spin"
      ></div>
    </div>
  );
};
export default LoadingSpinner;
