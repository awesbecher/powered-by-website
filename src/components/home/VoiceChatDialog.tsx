
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface VoiceChatDialogProps {
  showDialog: boolean;
  isCallActive: boolean;
  isSubmitting: boolean;
  handleCloseDialog: () => void;
  handleStartCall: () => void;
  handleEndCall: () => void;
}

export const VoiceChatDialog = ({
  showDialog,
  isCallActive,
  isSubmitting,
  handleCloseDialog,
  handleStartCall,
  handleEndCall,
}: VoiceChatDialogProps) => {
  return (
    <Dialog open={showDialog} onOpenChange={handleCloseDialog}>
      <DialogContent className="bg-[#222222] text-white border-gray-800">
        <DialogHeader className="flex items-start space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage
              src="/lovable-uploads/d2c09a06-b1ad-4f03-bcc5-6ea523b06f41.png"
              alt="Michael from Powered_by Solutions"
              className="object-cover"
            />
          </Avatar>
          <div className="flex-1">
            <DialogTitle className="text-2xl font-bold text-white mb-2">
              {isCallActive ? "Voice Chat in Progress" : "Start Voice Chat with Michael on the Powered_by Solutions Design Team"}
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              {isCallActive 
                ? "You are currently in a voice conversation with our AI Agent. You can continue browsing the site while keeping this dialog open."
                : "You'll be able to have a voice conversation with Michael directly through your browser. Please ensure your microphone is enabled and your speaker volume is turned on appropriately."}
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="flex flex-col space-y-4 pt-4">
          {!isCallActive && (
            <p className="text-sm text-gray-300">
              By clicking "Start Voice Chat", you consent to having a voice conversation with Powered_by's Design Team. You can end the conversation at any time.
            </p>
          )}
          <div className="flex gap-2">
            {isCallActive ? (
              <Button 
                onClick={handleEndCall}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                End Call
              </Button>
            ) : (
              <>
                <Button 
                  variant="outline"
                  onClick={() => handleCloseDialog()}
                  className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleStartCall}
                  disabled={isSubmitting}
                  className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
                >
                  {isSubmitting ? "Starting..." : "Start Voice Chat"}
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
