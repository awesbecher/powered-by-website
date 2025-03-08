
import React from "react";
import { X, Mic, MicOff, Activity } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ActiveCallContent } from "./ActiveCallContent";
import { InitialDialogContent } from "./InitialDialogContent";

interface RoomServiceDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  isCallActive: boolean;
  isProcessing: boolean;
  isMuted: boolean;
  handleStartCall: () => Promise<void>;
  handleEndCall: () => void;
  toggleMute: () => void;
}

export const RoomServiceDialog: React.FC<RoomServiceDialogProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  isCallActive,
  isProcessing,
  isMuted,
  handleStartCall,
  handleEndCall,
  toggleMute,
}) => {
  return (
    <Dialog open={isDialogOpen || isCallActive} onOpenChange={(open) => {
      // Prevent dialog from closing if call is active
      if (isCallActive && !open) {
        return;
      }
      setIsDialogOpen(open);
    }}>
      <DialogContent className="bg-white text-black border-gray-200 sm:max-w-md p-6 rounded-xl">
        {isCallActive ? (
          <ActiveCallContent 
            handleEndCall={handleEndCall} 
            isMuted={isMuted} 
            toggleMute={toggleMute} 
          />
        ) : (
          <InitialDialogContent 
            setIsDialogOpen={setIsDialogOpen} 
            handleStartCall={handleStartCall} 
            isProcessing={isProcessing} 
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
