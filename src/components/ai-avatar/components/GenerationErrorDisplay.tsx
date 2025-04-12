
import React from 'react';
import { AlertCircle } from "lucide-react";

interface GenerationErrorDisplayProps {
  error: string;
  errorDetails: any | null;
}

const GenerationErrorDisplay = ({ error, errorDetails }: GenerationErrorDisplayProps) => {
  if (!error) return null;
  
  return (
    <div className="bg-red-900/20 border border-red-500/50 p-3 rounded-md mb-4">
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 text-red-400 mr-2 mt-0.5" />
        <div>
          <p className="text-red-300 text-sm font-medium">{error}</p>
          {errorDetails && (
            <details className="mt-2">
              <summary className="text-xs text-red-400 cursor-pointer">View technical details</summary>
              <pre className="mt-2 whitespace-pre-wrap text-xs text-red-300 bg-red-950/30 p-2 rounded">
                {JSON.stringify(errorDetails, null, 2)}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerationErrorDisplay;
