
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { VoiceChatDialog } from "@/components/voice-chat/VoiceChatDialog";
import { initiateVapiCall, stopVapiCall, isVapiCallActive } from "@/services/vapiService";

interface VoiceChatControlsProps {
  source?: "home" | "voice-chat" | "voice-business";
}

export const VoiceChatControls = ({ source = "voice-chat" }: VoiceChatControlsProps) => {
  const { toast } = useToast();
  const [showVoiceChatDialog, setShowVoiceChatDialog] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dialogClosedManually = useRef(false);

  const ASSISTANT_ID = "ebb38ba5-321a-49e4-b860-708bc864327f";
  
  // Check for active call when component mounts
  useEffect(() => {
    if (isVapiCallActive()) {
      setIsCallActive(true);
    }
  }, []);

  const handleVoiceChatClick = () => {
    console.log("VoiceChatControls: Voice chat button clicked");
    dialogClosedManually.current = false;
    setShowVoiceChatDialog(true);
  };

  const handleCloseDialog = () => {
    console.log("VoiceChatControls: Dialog close requested");
    dialogClosedManually.current = true;
    if (isCallActive) {
      handleEndCall();
    }
    setShowVoiceChatDialog(false);
  };

  const handleStartCall = async () => {
    console.log("VoiceChatControls: Starting call");
    setIsSubmitting(true);
    try {
      const success = await initiateVapiCall(ASSISTANT_ID);
      if (success) {
        setIsCallActive(true);
        toast({
          title: "Call started successfully",
          description: "You're now connected to our AI voice agent.",
        });
      }
    } catch (error) {
      console.error("Failed to start call:", error);
      toast({
        title: "Failed to start call",
        description: error instanceof Error ? error.message : "Please check your microphone settings and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEndCall = async () => {
    console.log("VoiceChatControls: Ending call");
    try {
      await stopVapiCall();
      toast({
        title: "Call ended",
        description: "Thank you for trying our AI voice agent.",
      });
    } catch (error) {
      console.error("Error ending call:", error);
    } finally {
      setIsCallActive(false);
      if (!dialogClosedManually.current) {
        setShowVoiceChatDialog(false);
      }
    }
  };

  return (
    <>
      <VoiceChatDialog
        showDialog={showVoiceChatDialog}
        isCallActive={isCallActive}
        isSubmitting={isSubmitting}
        handleCloseDialog={handleCloseDialog}
        handleStartCall={handleStartCall}
        handleEndCall={handleEndCall}
        source={source}
      />
      {/* Export the click handler so parent components can trigger the dialog */}
      <button className="hidden" onClick={handleVoiceChatClick} id="voice-chat-trigger" />
    </>
  );
};
