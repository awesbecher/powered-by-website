import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Bot, X, Phone, PhoneOff } from 'lucide-react';
import { ChatInterface } from '@/components/custom-gpt/ChatInterface';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import * as DialogPrimitive from "@radix-ui/react-dialog";

export const GlobalVoiceChatDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Custom event listener to allow other components to open the chat
    const handleOpenEvent = () => {
      console.log("GlobalVoiceChatDialog: Received open-voice-dialog event");
      setConfirmDialogOpen(true);
    };
    
    document.addEventListener('open-voice-dialog', handleOpenEvent);

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'v' && event.ctrlKey) {
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('open-voice-dialog', handleOpenEvent);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  // We want to render the button on all pages except /chat
  // to maintain backward compatibility
  const shouldShowButton = location.pathname !== '/chat';
  
  // If the dialog is not open and we're on the /chat route, don't render anything
  if (!isOpen && !confirmDialogOpen && !isCallActive && location.pathname === '/chat') {
    return null;
  }

  const handleStartCall = async () => {
    setIsSubmitting(true);
    try {
      // TODO: Implement new call functionality
      setIsCallActive(true);
      setConfirmDialogOpen(false);
      toast({
        title: "Call started",
        description: "You are now connected.",
      });
    } catch (error) {
      console.error("Error starting call:", error);
      toast({
        title: "Error",
        description: "Failed to start call. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEndCall = async () => {
    try {
      // TODO: Implement call ending functionality
      setIsCallActive(false);
      toast({
        title: "Call ended",
        description: "The call has been ended.",
      });
    } catch (error) {
      console.error("Error ending call:", error);
      toast({
        title: "Error",
        description: "Failed to end call. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

  // Button to open dialog
  if (!isOpen && !confirmDialogOpen && !isCallActive) {
    return shouldShowButton ? (
      <button
        onClick={() => setConfirmDialogOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-[#8B5CF6] p-4 rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2"
        aria-label="Open AI Assistant"
      >
        <Phone className="h-6 w-6 text-white" />
      </button>
    ) : null;
  }

  // Main chat interface
  if (isOpen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="relative w-full max-w-lg">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close AI Assistant"
          >
            <X className="h-5 w-5" />
          </button>
          <ChatInterface />
        </div>
      </div>
    );
  }

  // Confirmation dialog
  if (confirmDialogOpen) {
    return (
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent closeButton={false} className="bg-[#222222] text-white border-gray-800 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Start Voice Chat</DialogTitle>
            <DialogDescription>
              {isCallActive
                ? 'Your call is currently active. Click the button below to end the call.'
                : 'Click the button below to start a voice chat.'}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            {isCallActive ? (
              <Button
                onClick={handleEndCall}
                className="w-32 bg-destructive hover:bg-destructive/90 text-white"
              >
                <PhoneOff className="mr-2 h-4 w-4" />
                End Call
              </Button>
            ) : (
              <Button
                onClick={handleStartCall}
                disabled={isSubmitting}
                className="w-32 bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
              >
                {isSubmitting ? "Connecting..." : (
                  <>
                    <Phone className="mr-2 h-4 w-4" />
                    Start Call
                  </>
                )}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Active call dialog
  if (isCallActive) {
    return (
      <Dialog open={isCallActive} onOpenChange={(open) => !open && handleEndCall()}>
        <DialogContent closeButton={false} className="bg-black text-white border-gray-800 sm:max-w-md">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">You are now Connected</h2>
            
            <div className="bg-[#1e2a3b] p-4 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Call in progress</h3>
                <div className="flex items-center text-gray-300">
                  <span>Live</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <p className="text-gray-400">Your microphone</p>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-400">Active</span>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleEndCall}
              className="w-full bg-destructive hover:bg-destructive/90 text-white"
            >
              End Call
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
};
