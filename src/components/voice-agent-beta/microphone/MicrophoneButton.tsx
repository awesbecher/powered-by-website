
import React from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";

interface MicrophoneButtonProps {
  isRecording: boolean;
  isProcessing: boolean;
  isSpeaking: boolean;
  recordingTime: number;
  toggleRecording: () => void;
}

export const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({
  isRecording,
  isProcessing,
  isSpeaking,
  recordingTime,
  toggleRecording
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Button
        onClick={toggleRecording}
        disabled={isProcessing || isSpeaking}
        className={`w-20 h-20 rounded-full ${
          isRecording
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-[#9b87f5] hover:bg-[#8a75e3]'
        } flex items-center justify-center transition-all duration-300`}
      >
        {isRecording ? (
          <MicOff className="h-8 w-8 text-white" />
        ) : (
          <Mic className="h-8 w-8 text-white" />
        )}
      </Button>
      <p className="mt-4 text-white text-center">
        {isRecording 
          ? `Recording... ${recordingTime}s` 
          : isProcessing
            ? "Processing your request"
            : isSpeaking
              ? "AI is speaking"
              : "Tap to start speaking"}
      </p>
    </div>
  );
};
