
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { VoiceChatDialog } from "@/components/home/VoiceChatDialog";
import { initiateVapiCall, stopVapiCall, getVapiInstance } from "@/services/vapiService";
import { useToast } from "@/hooks/use-toast";

export const GlobalVoiceChatDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Listen for custom event from navbar button
    const handleOpenDialog = () => setShowDialog(true);
    document.addEventListener('open-voice-dialog', handleOpenDialog);
    
    // End call when navigating to a different route
    return () => {
      document.removeEventListener('open-voice-dialog', handleOpenDialog);
      if (isCallActive) {
        handleEndCall();
      }
    };
  }, [isCallActive, location.pathname]);

  const handleStartCall = async () => {
    setIsSubmitting(true);
    try {
      const vapi = getVapiInstance();
      await vapi.start("c7acc482-bee2-40a3-85d1-a192ce2a6685");
      setIsCallActive(true);
      
      vapi.on("call-end", () => {
        setIsCallActive(false);
        setShowDialog(false);
        navigate('/');
      });

      toast({
        title: "Voice Chat Started",
        description: "You can now speak with our AI Agent through your browser.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to start voice chat. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEndCall = () => {
    stopVapiCall();
    setIsCallActive(false);
    setShowDialog(false);
    navigate('/');
    toast({
      title: "Call Ended",
      description: "Your conversation with the AI Agent has ended.",
    });
  };

  const handleCloseDialog = () => {
    if (isCallActive) {
      handleEndCall();
    }
    setShowDialog(false);
  };

  return (
    <VoiceChatDialog 
      showDialog={showDialog}
      isCallActive={isCallActive}
      isSubmitting={isSubmitting}
      handleCloseDialog={handleCloseDialog}
      handleStartCall={handleStartCall}
      handleEndCall={handleEndCall}
      source="home"
    />
  );
};
