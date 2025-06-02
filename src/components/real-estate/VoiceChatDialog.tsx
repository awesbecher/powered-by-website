// This component has been replaced by CallConfirmationDialog and CallInProgressDialog
// Please use those components instead
// This file can be safely deleted

import { Phone } from "lucide-react";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface VoiceChatDialogProps {
  isLoading: boolean;
  handleCall: () => void;
  handleEndCall: () => void;
  setIsOpen: (value: boolean) => void;
}

export const VoiceChatDialog = ({
  isLoading,
  handleCall,
  handleEndCall,
  setIsOpen
}: VoiceChatDialogProps) => {
  return (
    <DialogContent className="bg-[#222222] text-white border-gray-800 w-[95%] max-w-md mx-auto">
      <DialogHeader className="flex items-start space-x-4">
        <Avatar className="w-20 h-20">
          <AvatarImage
            src="/assets/images/2d521c8d-084d-4a87-8491-cb795033a1d6.png"
            alt="Jeff Smith from Township Real Estate"
            className="object-cover"
          />
        </Avatar>
        <div className="flex-1">
          <DialogTitle className="text-2xl font-bold text-white mb-2">
            {isLoading ? "Voice Chat in Progress" : "Start Voice Chat with Jeff Smith on the Township Real Estate team"}
          </DialogTitle>
          <p className="text-gray-300">
            {isLoading 
              ? "You are currently in a voice conversation with our AI Agent. You can continue browsing the site while keeping this dialog open."
              : "You'll be able to have a voice conversation with Jeff directly through your browser. Please ensure your microphone is enabled and your speaker volume is turned on appropriately."}
          </p>
        </div>
      </DialogHeader>
      <div className="flex flex-col space-y-4 pt-4">
        {!isLoading && (
          <p className="text-sm text-gray-300">
            By clicking "Start Voice Chat Now", you consent to having a voice conversation with Township Real Estate. You can end the conversation at any time.
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-2">
          {isLoading ? (
            <Button 
              onClick={handleEndCall}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold"
            >
              End Call
            </Button>
          ) : (
            <>
              <Button 
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="w-full border-gray-700 text-white hover:bg-gray-800 hover:text-white"
              >
                Cancel
              </Button>
              <Button 
                className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
                onClick={handleCall}
                disabled={isLoading}
              >
                {isLoading ? "Starting..." : "Start Voice Chat Now"}
              </Button>
            </>
          )}
        </div>
      </div>
    </DialogContent>
  );
};
