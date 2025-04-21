
import { useState, useEffect } from "react";
import { VapiCallDialog } from "./VapiCallDialog";

export const GlobalVoiceChatDialog = () => {
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    // Listen for the custom event to open the voice dialog
    const handleOpenVoiceDialog = () => {
      console.log("GlobalVoiceChatDialog: open-voice-dialog event received");
      setShowDialog(true);
    };

    document.addEventListener('open-voice-dialog', handleOpenVoiceDialog);

    return () => {
      document.removeEventListener('open-voice-dialog', handleOpenVoiceDialog);
    };
  }, []);

  return <VapiCallDialog open={showDialog} onOpenChange={setShowDialog} />;
};
