
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface CallConsentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const CallConsentDialog: React.FC<CallConsentDialogProps> = ({
  isOpen,
  onOpenChange,
  onConfirm,
  isLoading
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#222222] text-white border-gray-800 sm:max-w-md">
        <div className="flex items-start space-x-4 mb-4">
          <Avatar className="w-20 h-20">
            <AvatarImage 
              src="/lovable-uploads/0d1c3dc0-7aad-4ddd-8b25-1edf45232f70.png"
              alt="Christina Bell"
              className="rounded-lg object-cover"
            />
            <AvatarFallback className="rounded-lg">CB</AvatarFallback>
          </Avatar>
          <DialogHeader className="flex-1">
            <DialogTitle>Start Voice Chat with Christina Bell on RightBloom's Sales Team</DialogTitle>
          </DialogHeader>
        </div>
        <div className="flex flex-col space-y-4 pt-4">
          <p className="text-gray-300">
            You'll be able to have a voice conversation with Christina directly through your browser. Please ensure your microphone is enabled and your speaker volume is turned on appropriately.
          </p>
          <p className="text-gray-300 text-sm">
            By clicking "Start Voice Chat", you consent to having a voice conversation with RightBloom's sales team. You can end the conversation at any time.
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
              className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors"
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

export default CallConsentDialog;
