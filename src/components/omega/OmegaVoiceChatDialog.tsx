
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface OmegaVoiceChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStartChat: () => void;
}

const OmegaVoiceChatDialog: React.FC<OmegaVoiceChatDialogProps> = ({
  open,
  onOpenChange,
  onStartChat
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white text-black border-gray-200 rounded-lg p-6 max-w-md mx-auto">
        <DialogHeader className="flex items-start justify-between">
          <DialogTitle className="text-2xl font-bold text-black text-left">
            Start Voice Chat with Stella @ Omega Pediatrics
          </DialogTitle>
          <Button 
            variant="ghost" 
            className="h-8 w-8 p-0" 
            onClick={() => onOpenChange(false)}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        
        <div className="flex flex-col space-y-6 mt-4">
          <p className="text-gray-700 text-left">
            You'll be able to have a voice conversation with Stella, our AI Assistant directly 
            through your browser. Please ensure your microphone is enabled 
            and your speaker volume is turned on appropriately.
          </p>
          
          <p className="text-gray-700 text-left">
            By clicking "Start Voice Chat", you consent to having a voice 
            conversation with Omega Pediatrics. You can end the conversation at any time.
          </p>
          
          <div className="flex flex-row justify-end space-x-3 mt-4">
            <Button 
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-24"
            >
              Cancel
            </Button>
            <Button 
              className="bg-purple-500 hover:bg-purple-600 text-white w-36"
              onClick={onStartChat}
            >
              Start Voice Chat
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OmegaVoiceChatDialog;
