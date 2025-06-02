
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface VoiceChatDialogProps {
  showDialog: boolean;
  isCallActive: boolean;
  isSubmitting: boolean;
  handleCloseDialog: () => void;
  handleStartCall: () => void;
  handleEndCall: () => void;
  goToRealEstateSite: () => void;
}

export const VoiceChatDialog = ({
  showDialog,
  isCallActive,
  isSubmitting,
  handleCloseDialog,
  handleStartCall,
  handleEndCall,
  goToRealEstateSite
}: VoiceChatDialogProps) => {
  return (
    <Dialog open={showDialog} onOpenChange={handleCloseDialog}>
      <DialogContent className="bg-[#222222] text-white border-gray-800 sm:max-w-md">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-32 h-32 mx-auto mb-4">
            <AvatarImage
              src="/assets/images/bd9e9055-ba23-4fcc-9c2a-4fda4b9dd627.png"
              alt="AI Receptionist @ Powered_by Agency"
              className="object-cover"
            />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          
          <h2 className="text-3xl font-bold text-white text-center">
            Start Voice Chat with AI Receptionist
          </h2>
          
          <p className="text-gray-300 text-lg text-center">
            You'll be able to have a voice conversation with our AI receptionist directly through your browser. Please ensure your microphone is enabled and your speaker volume is turned on appropriately.
          </p>
          
          <p className="text-base text-gray-300">
            By clicking "Start Voice Chat", you consent to having a voice conversation with Powered_by's AI agent. You can end the conversation at any time.
          </p>
          
          {isCallActive ? (
            <div className="flex flex-col w-full space-y-4">
              <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
                  <span>Call Active</span>
                </div>
                <span>Voice Chat in Progress</span>
              </div>
              
              <Button 
                onClick={handleEndCall}
                className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-6"
              >
                End Call
              </Button>
            </div>
          ) : (
            <div className="flex gap-4 w-full">
              <Button 
                onClick={handleCloseDialog}
                className="w-full bg-gray-700 hover:bg-gray-800 text-white text-lg py-6"
              >
                Cancel
              </Button>
              <Button 
                onClick={goToRealEstateSite}
                className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white text-lg py-6"
              >
                Try Demo Now
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
