
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

  // Add debug logs to verify the component is working
  useEffect(() => {
    console.log("GlobalVoiceChatDialog: Component mounted, listening for events");
    return () => console.log("GlobalVoiceChatDialog: Component unmounted");
  }, []);

  return (
    <>
      {/* Debug button to manually test dialog - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <button 
          onClick={() => setShowDialog(true)}
          className="fixed bottom-4 right-4 bg-purple-600 text-white p-2 rounded-md z-50 text-xs"
          style={{ display: 'none' }}
        >
          Test Dialog
        </button>
      )}
      <VapiCallDialog open={showDialog} onOpenChange={setShowDialog} />
    </>
  );
};
