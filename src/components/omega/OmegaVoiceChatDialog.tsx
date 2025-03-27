
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { initiateVapiCall } from "@/services/vapiService";
import { useToast } from "@/hooks/use-toast";

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
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = () => {
    onOpenChange(false);
    navigate("/omega-voice1");
  };

  const handleStartChat = async () => {
    setIsLoading(true);
    try {
      // Use Stella's Assistant ID from Vapi
      await initiateVapiCall("a212f18f-9d02-4703-914f-ac89661262c5");
      onStartChat();
      toast({
        title: "Voice Chat Connected",
        description: "You are now speaking with Stella, Omega Pediatrics' AI Assistant."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: error instanceof Error ? error.message : "Failed to connect to voice service. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white text-black border-gray-200 rounded-lg p-6 max-w-md mx-auto" closeButton={false}>
        <DialogHeader className="flex items-start">
          <DialogTitle className="text-2xl font-bold text-black text-left">
            Start Voice Chat with Stella @ Omega Pediatrics
          </DialogTitle>
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
              onClick={handleCancel}
              className="w-24"
            >
              Cancel
            </Button>
            <Button 
              className="bg-purple-500 hover:bg-purple-600 text-white w-36"
              onClick={handleStartChat}
              disabled={isLoading}
            >
              {isLoading ? "Connecting..." : "Start Voice Chat"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OmegaVoiceChatDialog;
