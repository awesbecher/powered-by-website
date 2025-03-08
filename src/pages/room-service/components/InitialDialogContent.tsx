
import React from "react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface InitialDialogContentProps {
  setIsDialogOpen: (open: boolean) => void;
  handleStartCall: () => Promise<void>;
  isProcessing: boolean;
}

export const InitialDialogContent: React.FC<InitialDialogContentProps> = ({
  setIsDialogOpen,
  handleStartCall,
  isProcessing,
}) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          Start Voice Chat with In-Room Dining Team
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-4 pt-2">
        <p className="text-sm text-gray-700">
          You'll be able to have a voice conversation with our staff directly through your browser. Please ensure your microphone is enabled and your speaker volume is turned on appropriately.
        </p>
        <p className="text-sm text-gray-700">
          By clicking "Start Voice Chat", you consent to having a voice conversation with Grandview. You can end the conversation at any time.
        </p>
      </div>
      <div className="flex justify-end space-x-2 mt-4">
        <Button
          variant="secondary"
          onClick={() => setIsDialogOpen(false)}
          disabled={isProcessing}
        >
          Cancel
        </Button>
        <Button
          onClick={handleStartCall}
          className="bg-accent hover:bg-accent/90"
          disabled={isProcessing}
        >
          {isProcessing ? 'Connecting...' : 'Start Voice Chat'}
        </Button>
      </div>
    </>
  );
};
