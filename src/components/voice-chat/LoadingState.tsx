import React, { useEffect } from 'react';

interface LoadingStateProps {
  onComplete?: () => void;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] bg-gray-900">
      <div className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-white text-lg">Connecting to AI Agent...</p>
    </div>
  );
};
