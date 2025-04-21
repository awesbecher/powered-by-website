
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

    // Check Vapi status on mount and periodically
    const checkStatus = () => {
      const status = vapiIntegration.checkVapiStatus();
      console.log("Vapi integration status:", status);
    };
    
    checkStatus();
    const statusInterval = setInterval(checkStatus, 10000); // Check every 10 seconds

    return () => {
      document.removeEventListener('open-voice-dialog', handleOpenVoiceDialog);
      document.removeEventListener('vapi-error', handleVapiError);
      clearInterval(statusInterval);
      console.log("GlobalVoiceChatDialog: Event listeners removed");
    };
  }, [vapiIntegration]);

  // Add debug logs to verify the component is working
  useEffect(() => {
    console.log("GlobalVoiceChatDialog: Component mounted, listening for events");
    console.log("GlobalVoiceChatDialog: Current dialog state:", showDialog);
    
    return () => console.log("GlobalVoiceChatDialog: Component unmounted");
  }, [showDialog]);

  const handleDialogOpenChange = (open: boolean) => {
    console.log("GlobalVoiceChatDialog: Dialog open state changed to:", open);
    setShowDialog(open);
  };

  return (
    <VapiCallDialog open={showDialog} onOpenChange={handleDialogOpenChange} />
  );
};
