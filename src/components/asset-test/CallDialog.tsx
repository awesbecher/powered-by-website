
import React from "react";
import { X, Mic, MicOff, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface CallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEndCall: () => void;
  onToggleMute: () => void;
  isMuted: boolean;
}

const CallDialog: React.FC<CallDialogProps> = ({ 
  open, 
  onOpenChange, 
  onEndCall, 
  onToggleMute, 
  isMuted 
}) => {
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
              src="/lovable-uploads/156d245d-e750-4ef3-8995-a7ae211eeeee.png"
              alt="Alex Fisher"
            />
            <AvatarFallback>AF</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-2xl font-bold">Alex Fisher</h3>
            <p className="text-gray-500">Planter's Insurance</p>
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
          <Button 
            variant="outline"
            onClick={onToggleMute}
            className="flex items-center justify-center py-6"
          >
            {isMuted ? <MicOff className="mr-2" /> : <Mic className="mr-2" />}
            {isMuted ? "Unmute" : "Mute"}
          </Button>
          
          <Button 
            variant="destructive"
            onClick={onEndCall}
            className="flex items-center justify-center py-6"
          >
            <X className="mr-2" />
            End Call
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CallDialog;
