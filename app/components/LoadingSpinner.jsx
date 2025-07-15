export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center">
      <div className="relative">
        {/* Main spinner */}
        <div className="w-8 h-8 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin"></div>
        
        {/* Inner pulse effect */}
        <div className="absolute inset-0 w-8 h-8 border-4 border-transparent border-t-purple-400 dark:border-t-purple-300 rounded-full animate-spin opacity-60" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        
        {/* Outer glow */}
        <div className="absolute inset-0 w-8 h-8 bg-purple-500/20 dark:bg-purple-400/20 rounded-full animate-pulse-slow blur-sm"></div>
      </div>
    </div>
  );
}