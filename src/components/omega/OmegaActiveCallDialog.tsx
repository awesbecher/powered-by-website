
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Activity, Mic, MicOff, X } from "lucide-react";
import { stopVapiCall } from "@/services/vapiService";
import { useToast } from "@/hooks/use-toast";

interface OmegaActiveCallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEndCall: () => void;
}

const OmegaActiveCallDialog: React.FC<OmegaActiveCallDialogProps> = ({
  open,
  onOpenChange,
  onEndCall
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const { toast } = useToast();

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    // In a real implementation, this would toggle the microphone
    toast({
      title: isMuted ? "Microphone Unmuted" : "Microphone Muted",
      description: isMuted ? "You can now be heard again." : "You have been muted."
    });
  };

  const handleEndCall = () => {
    try {
      stopVapiCall();
      onEndCall();
    } catch (error) {
      console.error("Error ending call:", error);
      toast({
        variant: "destructive",
        title: "Error Ending Call",
        description: "There was a problem ending the call. Please try again."
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black text-white border-gray-800 sm:max-w-md p-6 rounded-xl" closeButton={false}>
        <div className="flex flex-col space-y-6">
          <h2 className="text-4xl font-bold text-white mb-2">You are now Connected</h2>
          
          <div className="flex items-center">
            <div className="relative">
              <Avatar className="h-20 w-20 rounded-full">
                <AvatarImage 
                  src="/lovable-uploads/75c71530-5de7-494f-b86a-5033f9e79188.png" 
                  alt="Stella from Omega Pediatrics" 
                  className="object-cover"
                />
                <AvatarFallback>SP</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-1 left-1">
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-3xl font-bold text-white">Stella</h3>
              <p className="text-gray-400">Omega Pediatrics</p>
            </div>
          </div>
          
          <div className="bg-[#1e2a3b] p-4 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Call in progress</h3>
              <div className="flex items-center text-gray-300">
                <Activity className="w-5 h-5 mr-2" />
                <span>Live</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <p className="text-gray-400">Your microphone</p>
              </div>
              <div className="flex items-center">
                <div className="flex space-x-0.5 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-3 w-1 bg-white rounded-full ${i > 0 ? 'opacity-' + (100 - i * 20) : ''}`}
                    ></div>
                  ))}
                </div>
                <span className="text-gray-400">Active</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button 
              onClick={handleToggleMute}
              className="flex-1 py-4 px-6 bg-[#1e2a3b] rounded-md flex items-center justify-center space-x-2 hover:bg-gray-900 transition-colors text-white"
            >
              {isMuted ? <MicOff className="w-5 h-5 mr-2" /> : <Mic className="w-5 h-5 mr-2" />}
              <span>{isMuted ? "Unmute" : "Mute"}</span>
            </button>
            
            <button 
              onClick={handleEndCall}
              className="flex-1 py-4 px-6 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center justify-center space-x-2 transition-colors"
            >
              <X className="w-5 h-5 mr-2" />
              <span>End Call</span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OmegaActiveCallDialog;
