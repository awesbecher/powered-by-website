
import React from 'react';
import { AlertCircle } from "lucide-react";

interface ConversationDisplayProps {
  transcript: string;
  response: string;
  error: string | null;
}

export const ConversationDisplay: React.FC<ConversationDisplayProps> = ({
  transcript,
  response,
  error
}) => {
  return (
    <div className="flex-1">
      {transcript && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold uppercase text-gray-400 mb-2">You said:</h3>
          <div className="bg-gray-700/50 p-3 rounded text-white">{transcript}</div>
        </div>
      )}
      
      {response && (
        <div>
          <h3 className="text-sm font-semibold uppercase text-gray-400 mb-2">AI Response:</h3>
          <div className="bg-purple-900/30 p-3 rounded text-white">{response}</div>
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded text-white flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">We are experiencing a technical fault with this service.</p>
            <p className="text-sm opacity-80">Please attempt your conversation again.</p>
          </div>
        </div>
      )}
    </div>
  );
};
