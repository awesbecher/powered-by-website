
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { X, Mic, MicOff } from "lucide-react";
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
  let agentName = "Alex Fisher";
  let agentRole = "Planter's Insurance";
  let avatarSrc = "/lovable-uploads/156d245d-e750-4ef3-8995-a7ae211eeeee.png";
  
  if (isMercedesAgent) {
    agentName = "Dave Frankel";
    agentRole = "Mercedes of Tacoma";
    avatarSrc = "/lovable-uploads/f6cd5c39-f85a-4586-9140-cd8e12d9b947.png";
  } else if (isRestaurantAgent) {
    agentName = "Dominic";
    agentRole = "Slice House of Anaheim";
    avatarSrc = "/lovable-uploads/9793533b-ce65-4073-babd-b90b6b5c99ef.png";
  } else if (isRealEstateAgent) {
    agentName = "Jeff Smith";
    agentRole = "Township Real Estate";
    avatarSrc = "/lovable-uploads/2d521c8d-084d-4a87-8491-cb795033a1d6.png";
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#222222] text-white border-gray-800">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={avatarSrc} alt={agentName} />
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
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            onClick={onToggleMute}
          >
            {isMuted ? <MicOff className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
            {isMuted ? "Unmute" : "Mute"}
          </Button>
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
