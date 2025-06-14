
import { Dialog } from "@/components/ui/dialog";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { InitialDialog } from "./dialog/InitialDialog";
import { ActiveCallDialog } from "./dialog/ActiveCallDialog";
import { getDialogContent } from "./dialog/DialogContentProvider";

interface VoiceChatDialogProps {
  showDialog: boolean;
  isCallActive: boolean;
  isSubmitting: boolean;
  handleCloseDialog: () => void;
  handleStartCall: () => void;
  handleEndCall: () => void;
  source?: 'voice-chat' | 'voice-business' | 'home';
}

export const VoiceChatDialog = ({
  showDialog,
  isCallActive,
  isSubmitting,
  handleCloseDialog,
  handleStartCall,
  handleEndCall,
  source = 'home',
}: VoiceChatDialogProps) => {
  const navigate = useNavigate();
  const isUnmountingRef = useRef(false);
  
  // Cleanup effect to prevent memory leaks
  useEffect(() => {
    return () => {
      isUnmountingRef.current = true;
    };
  }, []);
  
  const handleEndCallAndRedirect = () => {
    handleEndCall();
    if (!isUnmountingRef.current) {
      navigate('/contact');
    }
  };

  const dialogContent = getDialogContent(source);

  // Initial dialog before call starts
  if (!isCallActive) {
    return (
      <Dialog open={showDialog} onOpenChange={handleCloseDialog}>
        <InitialDialog 
          dialogContent={dialogContent}
          handleCloseDialog={handleCloseDialog}
          handleStartCall={handleStartCall}
          isSubmitting={isSubmitting}
        />
      </Dialog>
    );
  }

  // Active call dialog
  return (
    <Dialog 
      open={showDialog} 
      onOpenChange={(open) => !open && handleEndCallAndRedirect()}
    >
      <ActiveCallDialog 
        handleEndCall={handleEndCall} 
        isUnmountingRef={isUnmountingRef}
      />
    </Dialog>
  );
};
