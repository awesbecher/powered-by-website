
import React from 'react';
import { Loader2 } from "lucide-react";

interface StatusIndicatorProps {
  processingStage: 'idle' | 'recording' | 'transcribing' | 'searching' | 'generating' | 'speaking';
  isRecording: boolean;
  isProcessing: boolean;
  isSpeaking: boolean;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  processingStage,
  isRecording,
  isProcessing,
  isSpeaking
}) => {
  // Get status text based on current processing stage
  const getStatusText = () => {
    switch (processingStage) {
      case 'recording': return "Listening";
      case 'transcribing': return "Transcribing audio";
      case 'searching': return "Searching knowledge base";
      case 'generating': return "Generating response";
      case 'speaking': return "Speaking";
      default: return "Ready";
    }
  };
  
  // Get status icon based on current processing stage
  const getStatusIcon = () => {
    if (isRecording) {
      return <span className="ml-2 h-2 w-2 bg-green-400 rounded-full animate-pulse"></span>;
    }
    
    if (isProcessing) {
      return <Loader2 className="ml-2 h-4 w-4 animate-spin" />;
    }
    
    if (isSpeaking) {
      return <span className="ml-2 h-2 w-2 bg-blue-400 rounded-full animate-pulse"></span>;
    }
    
    return null;
  };
  
  return (
    <div className="px-4 py-2 rounded-full bg-gray-700 text-white flex items-center">
      <span className="mr-2">Status:</span>
      <span className={`
        ${processingStage === 'recording' ? 'text-green-400' : ''}
        ${processingStage === 'transcribing' || processingStage === 'searching' || processingStage === 'generating' ? 'text-yellow-400' : ''}
        ${processingStage === 'speaking' ? 'text-blue-400' : ''}
        ${processingStage === 'idle' ? 'text-gray-400' : ''}
        flex items-center
      `}>
        {getStatusText()} {getStatusIcon()}
      </span>
    </div>
  );
};
