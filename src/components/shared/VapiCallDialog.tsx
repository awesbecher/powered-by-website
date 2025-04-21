
import React, { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Phone, PhoneOff } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const VAPI_API_KEY = 'a212f18f-9d02-4703-914f-ac89661262c5';
const VAPI_ASSISTANT_ID = 'ebb38ba5-321a-49e4-b860-708bc864327f';
const VAPI_URL = `https://vapi.ai?demo=true&shareKey=${VAPI_API_KEY}&assistantId=${VAPI_ASSISTANT_ID}`;

interface VapiCallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const VapiCallDialog = ({ open, onOpenChange }: VapiCallDialogProps) => {
  const [stage, setStage] = useState<'confirmation' | 'inCall' | 'closed'>('confirmation');
  const [vapiWindow, setVapiWindow] = useState<Window | null>(null);
  const navigate = useNavigate();

  // Opens the Vapi popup with correct size and position
  const openVapiWindow = useCallback(() => {
    const width = 400;
    const height = 600;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    return window.open(
      VAPI_URL,
      'VapiAICall',
      `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes,status=yes`
    );
  }, []);

  // Start call handler: open popup and switch to inCall stage
  const handleStartCall = () => {
    const newWindow = openVapiWindow();
    if (newWindow) {
      setVapiWindow(newWindow);
      setStage('inCall');
    } else {
      alert('Pop-up blocked! Please allow pop-ups for this site to start the call.');
    }
  };

  // End call handler closes popup if open and closes dialog
  const handleEndCall = () => {
    if (vapiWindow && !vapiWindow.closed) {
      vapiWindow.close();
    }
    setStage('closed');
    onOpenChange(false);
  };

  // Close icon clicked (for inCall dialog)
  const handleCloseClick = () => {
    handleEndCall();
  };

  // When user closes dialog via onOpenChange (click outside or escape)
  const handleDialogOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      // If dialog closed manually, end call and close popup
      handleEndCall();
    }
  };

  // Monitor if the popup window is manually closed by the user to close dialog
  useEffect(() => {
    const timer = setInterval(() => {
      if (vapiWindow && vapiWindow.closed) {
        setStage('closed');
        onOpenChange(false);
      }
    }, 500);
    return () => clearInterval(timer);
  }, [vapiWindow, onOpenChange]);

  // Reset stage when dialog opens again
  useEffect(() => {
    if (open) {
      setStage('confirmation');
    }
  }, [open]);

  if (!open || stage === 'closed') return null;

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange} modal>
      <DialogContent className="bg-[#222222] text-white border-gray-800 sm:max-w-md">
        {stage === 'confirmation' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Talk to an AI Agent</DialogTitle>
              <DialogDescription className="mt-2 text-gray-400 text-base">
                You are about to start a voice conversation with an AI agent. Please ensure your microphone and speakers are enabled.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-4">
              <p className="text-gray-300 text-sm">
                By clicking &quot;Start Voice Chat&quot;, you consent to having a voice conversation with our AI agent. You can end the conversation at any time.
              </p>

              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => onOpenChange(false)} className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  Cancel
                </Button>
                <Button onClick={handleStartCall} className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white">
                  <Phone className="mr-2 h-4 w-4" />
                  Start Voice Chat
                </Button>
              </div>
            </div>
          </>
        )}

        {stage === 'inCall' && (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Call in Progress</h2>
              <button
                aria-label="End call and close"
                onClick={handleCloseClick}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mt-6 p-4 bg-gray-800 rounded-lg flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">You are connected to our AI voice agent.</span>
                <span className="text-green-500 font-semibold">Live</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Use your microphone and speakers to talk.</span>
              </div>
              <Button
                variant="destructive"
                onClick={handleEndCall}
                className="mt-6 w-full"
              >
                <PhoneOff className="mr-2" />
                End Call
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};


