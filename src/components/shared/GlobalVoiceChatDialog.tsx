import { useState, useEffect } from "react";
import { VapiCallDialog } from "./VapiCallDialog";
import { useVapiIntegration } from "@/hooks/useVapiIntegration";

export const GlobalVoiceChatDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const vapiIntegration = useVapiIntegration();

  useEffect(() => {
    // Listen for the custom event to open the voice dialog
    const handleOpenVoiceDialog = () => {
      console.log("GlobalVoiceChatDialog: open-voice-dialog event received");
      setShowDialog(true);
    };
    
    // Listen for Vapi errors
    const handleVapiError = (event: any) => {
      console.error("GlobalVoiceChatDialog: Vapi error received:", event.detail);
    };

    document.addEventListener('open-voice-dialog', handleOpenVoiceDialog);
    document.addEventListener('vapi-error', handleVapiError);
    console.log("GlobalVoiceChatDialog: Event listeners added for 'open-voice-dialog' and 'vapi-error'");

    return () => {
      document.removeEventListener('open-voice-dialog', handleOpenVoiceDialog);
      document.removeEventListener('vapi-error', handleVapiError);
      console.log("GlobalVoiceChatDialog: Event listeners removed");
    };
  }, []);

  useEffect(() => {
    console.log("GlobalVoiceChatDialog: Component mounted, listening for events");
    return () => console.log("GlobalVoiceChatDialog: Component unmounted");
  }, []);

  const handleDialogOpenChange = (open: boolean) => {
    console.log("GlobalVoiceChatDialog: Dialog open state changed to:", open);
    setShowDialog(open);
  };

  return (
    <VapiCallDialog open={showDialog} onOpenChange={handleDialogOpenChange} />
  );
};
