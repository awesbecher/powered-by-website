
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Pizza } from "lucide-react";

interface RestaurantConsentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const RestaurantConsentDialog: React.FC<RestaurantConsentDialogProps> = ({ 
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
              src="/assets/images/9793533b-ce65-4073-babd-b90b6b5c99ef.png"
              alt="Dominic"
              className="object-cover"
            />
            <AvatarFallback>DO</AvatarFallback>
          </Avatar>
          <DialogTitle className="flex items-center">
            Start Voice Chat with Dominic at Slice House of Anaheim 
            <Pizza className="ml-2 w-5 h-5 text-[#9b87f5]" />
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4 pt-4">
          <p className="text-gray-300">
            You'll be able to have a voice conversation with Dominic directly through your browser. Please ensure your microphone is enabled and your speaker volume is turned on appropriately.
          </p>
          <p className="text-gray-300 text-sm">
            By clicking "Start Voice Chat", you consent to having a voice conversation with the Slice House of Anaheim team. You can end the conversation at any time.
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

export default RestaurantConsentDialog;
