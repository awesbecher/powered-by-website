
import React from "react";
import { X, Mic, MicOff, Activity } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface CallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEndCall: () => void;
  onToggleMute: () => void;
  isMuted: boolean;
  isMercedesAgent?: boolean;
  isRestaurantAgent?: boolean;
}

const CallDialog: React.FC<CallDialogProps> = ({ 
  open, 
  onOpenChange, 
  onEndCall, 
  onToggleMute, 
  isMuted,
  isMercedesAgent = false,
  isRestaurantAgent = false
}) => {
  // Determine which agent is active
  const getAgentName = () => {
    if (isMercedesAgent) return 'Dave Frankel';
    if (isRestaurantAgent) return 'Dominic';
    return 'Alex Fisher';
  };

  const getCompanyName = () => {
    if (isMercedesAgent) return 'Mercedes of Tacoma';
    if (isRestaurantAgent) return 'Slice House of Anaheim';
    return 'Planter\'s Insurance';
  };

  const getAvatarImage = () => {
    if (isMercedesAgent) {
      return "/lovable-uploads/f5d0a1ac-953b-4d29-8a63-83813f74efe2.png";
    }
    if (isRestaurantAgent) {
      return "/lovable-uploads/9793533b-ce65-4073-babd-b90b6b5c99ef.png";
    }
    return "/lovable-uploads/156d245d-e750-4ef3-8995-a7ae211eeeee.png";
  };

  const getAvatarFallback = () => {
    if (isMercedesAgent) return 'DF';
    if (isRestaurantAgent) return 'DO';
    return 'AF';
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onEndCall()}>
      <DialogContent className="bg-white text-black border-gray-200 sm:max-w-md p-6 rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">You are now Connected</h2>
          <button onClick={onEndCall} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex items-center mb-6">
          <Avatar className="h-16 w-16 mr-4">
            <AvatarImage 
              src={getAvatarImage()}
              alt={getAgentName()}
            />
            <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-2xl font-bold">{getAgentName()}</h3>
            <p className="text-gray-500">{getCompanyName()}</p>
          </div>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold">Call in progress</h3>
            <div className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              <span>Live</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Your microphone</p>
            <div className="flex items-center">
              <div className="flex space-x-1 mr-2">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-4 w-1 rounded-full ${i === 0 ? 'bg-black' : i < 3 ? 'bg-gray-400' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-gray-600">Active</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={onToggleMute}
            className="flex items-center justify-center py-6 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
          >
            {isMuted ? <MicOff className="mr-2" /> : <Mic className="mr-2" />}
            {isMuted ? "Unmute" : "Mute"}
          </button>
          
          <button 
            onClick={onEndCall}
            className="flex items-center justify-center py-6 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            <X className="mr-2" />
            End Call
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CallDialog;
