
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ConsentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const ConsentDialog: React.FC<ConsentDialogProps> = ({ 
  open, 
  onOpenChange, 
  onConfirm, 
  isLoading 
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#222222] text-white border-gray-800">
        <DialogHeader className="flex flex-row items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage 
              src="/assets/images/156d245d-e750-4ef3-8995-a7ae211eeeee.png"
              alt="Alex Fisher"
              className="object-cover"
            />
            <AvatarFallback>AF</AvatarFallback>
          </Avatar>
          <DialogTitle>Start Voice Chat with Alex Fisher on the Planter's Insurance Team</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4 pt-4">
          <p className="text-gray-300">
            You'll be able to have a voice conversation with Alex directly through your browser. Please ensure your microphone is enabled and your speaker volume is turned on appropriately.
          </p>
          <p className="text-gray-300 text-sm">
            By clicking "Start Voice Chat", you consent to having a voice conversation with the Planter's Insurance team. You can end the conversation at any time.
          </p>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              Cancel
            </Button>
            <Button 
              className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? "Initiating call..." : "Start Voice Chat"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConsentDialog;
