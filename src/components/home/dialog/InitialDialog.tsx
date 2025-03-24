
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

interface InitialDialogProps {
  dialogContent: {
    title: string;
    description: string;
    buttonText: string;
    consent: string;
  };
  handleCloseDialog: () => void;
  handleStartCall: () => void;
  isSubmitting: boolean;
}

export const InitialDialog = ({
  dialogContent,
  handleCloseDialog,
  handleStartCall,
  isSubmitting
}: InitialDialogProps) => {
  const navigate = useNavigate();
  
  const handleCancel = () => {
    handleCloseDialog();
    navigate('/voice-chat');
  };

  return (
    <DialogContent className="bg-[#222222] text-white border-gray-800 sm:max-w-md">
      <Avatar className="w-32 h-32 mx-auto mb-4">
        <AvatarImage
          src="/lovable-uploads/bd9e9055-ba23-4fcc-9c2a-4fda4b9dd627.png"
          alt="Michael, AI Voice Agent @ Powered_by Agency"
          className="object-cover"
        />
        <AvatarFallback>MA</AvatarFallback>
      </Avatar>
      
      <DialogTitle className="text-3xl font-bold text-white text-center mb-2">
        Start Voice Chat with Michael @ Powered_By
      </DialogTitle>
      
      <DialogDescription className="text-gray-300 text-lg text-center mb-8">
        You'll be able to have a voice conversation with Michael (our AI voice agent) directly through your browser. Please ensure your microphone is enabled and your speaker volume is turned on appropriately.
      </DialogDescription>
      
      <p className="text-base text-gray-300 mb-6">
        By clicking "Start Voice Chat", you consent to having a voice conversation with Powered_by's AI agent. You can end the conversation at any time.
      </p>
      
      <p className="text-xs text-gray-400 mb-4 text-center">
        By using Powered_by you agree to our <a href="/terms-of-service" className="text-purple-400 hover:text-purple-300 underline">Terms of Service</a>, <a href="/privacy-statement" className="text-purple-400 hover:text-purple-300 underline">Privacy</a>, and Security policies and practices.
      </p>
      
      <div className="flex gap-4">
        <Button 
          onClick={handleCancel}
          className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-6"
        >
          Cancel
        </Button>
        <Button 
          onClick={handleStartCall}
          disabled={isSubmitting}
          className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white text-lg py-6"
        >
          {isSubmitting ? "Starting..." : "Start Voice Chat Now"}
        </Button>
      </div>
    </DialogContent>
  );
};
