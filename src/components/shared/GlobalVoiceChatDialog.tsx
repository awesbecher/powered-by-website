
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { VoiceChatDialog } from "@/components/home/VoiceChatDialog";
import { initiateVapiCall, stopVapiCall, getVapiInstance } from "@/services/vapiService";
import { useToast } from "@/hooks/use-toast";

export const GlobalVoiceChatDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const isClosingDialogRef = useRef(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // The assistant ID we want to use - verified this is correct
  const ASSISTANT_ID = "ebb38ba5-321a-49e4-b860-708bc864327f";

  useEffect(() => {
    // Listen for custom event from navbar button
    const handleOpenDialog = () => {
      console.log("Open voice dialog event received");
      setShowDialog(true);
    };
    
    // Add the event listener
    document.addEventListener('open-voice-dialog', handleOpenDialog);
    
    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener('open-voice-dialog', handleOpenDialog);
    };
  }, []);

  const handleStartCall = async () => {
    console.log("Starting voice call with assistant:", ASSISTANT_ID);
    setIsSubmitting(true);
    try {
      // Force HTTPS check to ensure we're in a secure context
      if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
        throw new Error('Voice chat requires a secure connection (HTTPS). Please ensure you\'re accessing the site via HTTPS.');
      }

      // Check microphone permissions explicitly
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Stop the stream immediately after getting permission
        stream.getTracks().forEach(track => track.stop());
      } catch (micError) {
        console.error('Microphone access error:', micError);
        throw new Error('Microphone access was denied. Please enable microphone permissions in your browser settings.');
      }
      
      const success = await initiateVapiCall(ASSISTANT_ID);
      if (success) {
        setIsCallActive(true);
        
        const vapi = getVapiInstance();
        vapi.on("call-start", () => {
          console.log("Vapi call has officially started");
        });
        
        vapi.on("call-end", () => {
          // Only handle automatic call-end events from the service
          // when the dialog is not being manually closed
          if (!isClosingDialogRef.current) {
            console.log("Call ended automatically by service");
            setIsCallActive(false);
            setShowDialog(false);
          }
        });

        vapi.on("error", (error) => {
          console.error("Vapi error event received:", error);
          toast({
            variant: "destructive",
            title: "Voice Chat Error",
            description: "There was an error with the voice chat. Please try again.",
          });
        });

        toast({
          title: "Voice Chat Started",
          description: "You can now speak with our AI Agent through your browser.",
        });
      }
    } catch (error) {
      console.error("Error starting voice call:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to start voice chat. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEndCall = () => {
    console.log("Ending voice call");
    // Set flag to indicate we're manually closing the dialog
    isClosingDialogRef.current = true;
    
    stopVapiCall();
    setIsCallActive(false);
    setShowDialog(false);
    
    // Reset the flag after a short timeout
    setTimeout(() => {
      isClosingDialogRef.current = false;
    }, 100);
    
    toast({
      title: "Call Ended",
      description: "Your conversation with the AI Agent has ended.",
    });
  };

  const handleCloseDialog = () => {
    console.log("Closing voice dialog");
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
