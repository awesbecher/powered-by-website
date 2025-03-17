
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { VoiceChatDialog } from "@/components/voice-chat/VoiceChatDialog";
import { initiateVapiCall, stopVapiCall } from "@/services/vapiService";

interface VoiceChatControlsProps {
  source?: "home" | "voice-chat" | "voice-business";
}

export const VoiceChatControls = ({ source = "voice-chat" }: VoiceChatControlsProps) => {
  const { toast } = useToast();
  const [showVoiceChatDialog, setShowVoiceChatDialog] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ASSISTANT_ID = "c7acc482-bee2-40a3-85d1-a192ce2a6685";

  const handleVoiceChatClick = () => {
    setShowVoiceChatDialog(true);
  };

  const handleCloseDialog = () => {
    if (isCallActive) {
      handleEndCall();
    }
    setShowVoiceChatDialog(false);
  };

  const handleStartCall = async () => {
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
      setShowVoiceChatDialog(false);
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
