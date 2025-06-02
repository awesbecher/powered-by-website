import React from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Phone } from "lucide-react";

interface CallInProgressProps {
  isMuted: boolean;
  onMuteToggle: () => void;
  onRestart: () => void;
}

export const CallInProgress: React.FC<CallInProgressProps> = ({
  isMuted,
  onMuteToggle,
  onRestart,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] bg-gray-900/95">
      <div className="flex flex-col items-center space-y-8">
        <div className="w-24 h-24 rounded-full bg-blue-500/20 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center">
            <Phone className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white mb-2">Call in Progress</h3>
          <p className="text-gray-400">Speaking with AI Assistant</p>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            onClick={onMuteToggle}
            variant="outline"
            className={`rounded-full p-3 ${
              isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {isMuted ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
          </Button>
          
          <Button
            onClick={onRestart}
            variant="destructive"
            className="rounded-full p-3 bg-red-500 hover:bg-red-600"
          >
            <Phone className="w-6 h-6 text-white rotate-135" />
          </Button>
        </div>
      </div>
    </div>
  );
};
