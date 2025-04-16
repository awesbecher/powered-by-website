
import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface VoiceChatDialogProps {
  isCallActive: boolean;
  isProcessing: boolean;
  onStartCall: () => void;
  onEndCall: () => void;
  onClose: () => void;
}

export const VoiceChatDialog = ({
  isCallActive,
  isProcessing,
  onStartCall,
  onEndCall,
  onClose,
}: VoiceChatDialogProps) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">AI Voice Demo</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="w-32 h-32">
          <AvatarImage
            src="/lovable-uploads/bd9e9055-ba23-4fcc-9c2a-4fda4b9dd627.png"
            alt="AI Voice Agent"
            className="object-cover"
          />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        
        <h3 className="text-2xl font-bold text-white text-center">
          Voice Chat with Michael
        </h3>
        
        <p className="text-gray-300 text-center">
          You'll be able to have a voice conversation with our AI agent directly through your browser.
        </p>
        
        {isCallActive ? (
          <div className="flex flex-col w-full space-y-4">
            <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
                <span>Call Active</span>
              </div>
              <span className="text-sm text-gray-400">00:00</span>
            </div>
            
            <Button 
              onClick={onEndCall}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-6"
            >
              End Call
            </Button>
          </div>
        ) : (
          <Button 
            onClick={onStartCall}
            disabled={isProcessing}
            className="w-full bg-[#6342ff] hover:bg-[#5233e0] text-white text-lg py-6"
          >
            {isProcessing ? "Connecting..." : "Start Voice Chat"}
          </Button>
        )}
        
        <p className="text-xs text-gray-400 text-center">
          By starting this demo, you consent to having a voice conversation with our AI agent.
        </p>
      </div>
    </>
  );
};
