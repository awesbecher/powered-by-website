
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface MercedesConsentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const MercedesConsentDialog: React.FC<MercedesConsentDialogProps> = ({ 
  open, 
  onOpenChange, 
  onConfirm, 
  isLoading 
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white text-black border-gray-200 sm:max-w-md p-6 rounded-xl">
        <DialogHeader className="flex flex-row items-start">
          <Avatar className="h-16 w-16 mr-4 border-2 border-[#9b87f5]">
            <AvatarImage 
              src="/lovable-uploads/1a963891-b5e5-4c4c-85fd-e5ec489343bd.png" 
              alt="Dave Frankel" 
              className="object-cover"
            />
            <AvatarFallback>DF</AvatarFallback>
          </Avatar>
          <div>
            <DialogTitle>
              Start Voice Chat with Dave Frankel at Mercedes of Tacoma
            </DialogTitle>
          </div>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <p className="text-sm text-gray-600">
            You'll be able to have a voice conversation with our staff directly through your browser. Please ensure your microphone is enabled and your speaker volume is turned on appropriately.
          </p>
          <p className="text-sm text-gray-600">
            By clicking "Start Voice Chat", you consent to having a voice conversation with Mercedes of Tacoma. You can end the conversation at any time.
          </p>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button 
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button 
            className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Connecting...' : 'Start Voice Chat'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MercedesConsentDialog;
