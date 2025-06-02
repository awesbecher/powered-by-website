
import React from 'react';
import { AlertTriangle } from "lucide-react";

interface ErrorDisplayProps {
  error: string | null;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  if (!error) return null;
  
  return (
    <div className="bg-red-900/20 border border-red-500/50 p-3 rounded-md mb-4 flex items-start gap-2">
      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
      <p className="text-red-300 text-sm">{error}</p>
    </div>
  );
};

export default ErrorDisplay;
