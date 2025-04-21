
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Bot, X, Phone, PhoneOff, Mic, MicOff, Activity } from 'lucide-react';
import { ChatInterface } from '@/components/custom-gpt/ChatInterface';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { initiateVapiCall } from '@/services/vapiService';

export const GlobalVoiceChatDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  const vapiWindowRef = useRef<Window | null>(null);

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
      // Instead of opening Vapi in a popup, we'll show our custom interface
      // We'll still call initiateVapiCall but we'll do it in a hidden iframe later
      // For now, let's simulate a call connection
      setTimeout(() => {
        setIsCallActive(true);
        setConfirmDialogOpen(false);
        toast({
          title: "Call started",
          description: "You are now connected to our AI voice agent.",
        });
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error("Error starting call:", error);
      toast({
        title: "Error",
        description: "Failed to start call. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
    toast({
      title: isMuted ? "Microphone unmuted" : "Microphone muted",
      description: isMuted ? "You can now be heard" : "You have been muted",
    });
  };

  const handleEndCall = async () => {
    try {
      // Close Vapi window if it exists
      if (vapiWindowRef.current && !vapiWindowRef.current.closed) {
        vapiWindowRef.current.close();
      }
      
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
            <DialogTitle className="text-2xl">Start Voice Chat</DialogTitle>
            <DialogDescription className="text-lg text-gray-300 mt-2">
              You'll be able to have a voice conversation with our AI assistant directly through your browser. 
              Please ensure your microphone is enabled and your speaker volume is turned on appropriately.
            </DialogDescription>
          </DialogHeader>
          
          <p className="text-sm text-gray-400 mb-4">
            By clicking "Start Voice Chat", you consent to having a voice conversation with our AI agent. 
            You can end the conversation at any time.
          </p>
          
          <div className="flex justify-end gap-4">
            <Button
              onClick={handleCloseConfirmDialog}
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleStartCall}
              disabled={isSubmitting}
              className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
            >
              {isSubmitting ? "Connecting..." : (
                <>
                  <Phone className="mr-2 h-4 w-4" />
                  Start Voice Chat
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Active call dialog - Powered_by branded interface
  if (isCallActive) {
    return (
      <Dialog open={isCallActive} onOpenChange={(open) => !open && handleEndCall()}>
        <DialogContent closeButton={false} className="bg-black text-white border-gray-800 sm:max-w-md p-6 rounded-xl">
          <div className="flex flex-col space-y-6">
            <h2 className="text-4xl font-bold text-white mb-2">You are now Connected</h2>
            
            <div className="flex items-center">
              <div className="relative">
                <Avatar className="h-20 w-20 rounded-full">
                  <AvatarImage 
                    src="/lovable-uploads/bd9e9055-ba23-4fcc-9c2a-4fda4b9dd627.png" 
                    alt="Michael from Powered_by Solutions" 
                    className="object-cover"
                  />
                  <AvatarFallback>MB</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-1 left-1">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-3xl font-bold text-white">Michael</h3>
                <p className="text-gray-400">Powered_by Solutions</p>
              </div>
            </div>
            
            <div className="bg-[#1e2a3b] p-4 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Call in progress</h3>
                <div className="flex items-center text-gray-300">
                  <Activity className="w-5 h-5 mr-2" />
                  <span>Live</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <p className="text-gray-400">Your microphone</p>
                </div>
                <div className="flex items-center">
                  <div className="flex space-x-0.5 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className="h-3 w-1 bg-white rounded-full"
                      ></div>
                    ))}
                  </div>
                  <span className="text-gray-400">Active</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Button 
                onClick={toggleMute}
                variant="outline"
                className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                {isMuted ? <MicOff className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
                {isMuted ? "Unmute" : "Mute"}
              </Button>
              
              <Button 
                onClick={handleEndCall}
                variant="destructive"
                className="flex-1"
              >
                <X className="mr-2 h-4 w-4" />
                End Call
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
};
