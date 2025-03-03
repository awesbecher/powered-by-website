
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface RealEstateConsentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const RealEstateConsentDialog: React.FC<RealEstateConsentDialogProps> = ({ 
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
              src="/lovable-uploads/2d521c8d-084d-4a87-8491-cb795033a1d6.png"
              alt="Jeff Smith"
              className="object-cover"
            />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <DialogTitle>Start Voice Chat with Jeff Smith on the Township Real Estate team</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4 pt-4">
          <p className="text-gray-300">
            You'll be able to have a voice conversation with Jeff directly through your browser. Please ensure your microphone is enabled and your speaker volume is turned on appropriately.
          </p>
          <p className="text-gray-300 text-sm">
            By clicking "Start Voice Chat", you consent to having a voice conversation with Township Real Estate. You can end the conversation at any time.
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

export default RealEstateConsentDialog;
