
import React, { useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { X, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEndCall: () => void;
  onToggleMute: () => void;
  isMuted: boolean;
  isMercedesAgent: boolean;
  isRestaurantAgent: boolean;
  isRealEstateAgent?: boolean;
}

const CallDialog: React.FC<CallDialogProps> = ({
  open,
  onOpenChange,
  onEndCall,
  onToggleMute,
  isMuted,
  isMercedesAgent,
  isRestaurantAgent,
  isRealEstateAgent = false
}) => {
  // Add cleanup effect that ends the call when component unmounts
  useEffect(() => {
    return () => {
      if (open) {
        onEndCall();
      }
    };
  }, [open, onEndCall]);

  let agentName = "Alex Fisher";
  let agentRole = "Planter's Insurance";
  let avatarSrc = "/assets/images/d346b971-ac00-4e01-b998-88ba7938a22f.png";
  
  if (isMercedesAgent) {
    agentName = "Dave Frankel";
    agentRole = "Mercedes of Tacoma";
    avatarSrc = "/assets/images/1a963891-b5e5-4c4c-85fd-e5ec489343bd.png";
  } else if (isRestaurantAgent) {
    agentName = "Dominic";
    agentRole = "Slice House of Anaheim";
    avatarSrc = "/assets/images/9793533b-ce65-4073-babd-b90b6b5c99ef.png";
  } else if (isRealEstateAgent) {
    agentName = "Jeff Smith";
    agentRole = "Township Real Estate";
    avatarSrc = "/assets/images/2d521c8d-084d-4a87-8491-cb795033a1d6.png";
  }

  // If it's the real estate agent, use a different design
  if (isRealEstateAgent) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-white text-black border-gray-200 sm:max-w-md p-6 rounded-xl">
          <div className="flex flex-col space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">You are now Connected</h2>
              <button onClick={onEndCall} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-16 w-16 rounded-full border-2 border-white shadow-md">
                  <AvatarImage src={avatarSrc} alt={agentName} />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-1 left-1 flex items-center">
                  <div className="h-2.5 w-2.5 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold">{agentName}</h3>
                <p className="text-gray-500">{agentRole}</p>
              </div>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Call in progress</h3>
                <div className="flex items-center text-gray-700">
                  <Activity className="w-5 h-5 mr-2" />
                  <span>Live</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <p className="text-gray-600">Your microphone</p>
                </div>
                <div className="flex items-center">
                  <div className="flex space-x-0.5 mr-2">
                    <div className="h-2.5 w-1 bg-black rounded-full"></div>
                    {[...Array(4)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-2.5 w-1 rounded-full ${i < 2 ? 'bg-gray-400' : 'bg-gray-300'}`}
                      ></div>
                    ))}
                  </div>
                  <span className="text-gray-600">Active</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button 
                onClick={onEndCall}
                className="w-full py-3 px-4 bg-red-500 text-white rounded-md flex items-center justify-center space-x-2 hover:bg-red-600 transition-colors"
              >
                <X className="w-5 h-5 mr-2" />
                <span>End Call</span>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Default call dialog for other agents
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#222222] text-white border-gray-800">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={avatarSrc} alt={agentName} className="object-cover" />
            <AvatarFallback>{agentName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{agentName}</h3>
            <p className="text-sm text-gray-400">{agentRole}</p>
          </div>
        </div>
        
        <div className="bg-[#2a2a2a] p-4 rounded-lg mb-4">
          <p className="text-gray-300">Call in progress</p>
        </div>
        
        <div className="flex justify-center">
          <Button
            variant="destructive"
            className="w-full"
            onClick={onEndCall}
          >
            <X className="mr-2 h-4 w-4" />
            End Call
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CallDialog;
