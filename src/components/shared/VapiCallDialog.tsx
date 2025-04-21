
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PhoneOff, Activity, Phone, Mic } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { initiateVapiCall } from "@/services/vapiService";

interface VapiCallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const VapiCallDialog = ({ open, onOpenChange }: VapiCallDialogProps) => {
  const [stage, setStage] = useState<'confirmation' | 'inCall' | 'closed'>('confirmation');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Start call handler
  const handleStartCall = async () => {
    setIsLoading(true);
    
    try {
      console.log("VapiCallDialog: Starting call initialization");
      await initiateVapiCall();
      
      setStage('inCall');
      setIsLoading(false);
      console.log("VapiCallDialog: Moved to inCall stage, call should now be active");
    } catch (error) {
      console.error("VapiCallDialog: Error starting call:", error);
      toast({
        variant: "destructive",
        title: "Call failed",
        description: error instanceof Error ? error.message : "Failed to connect. Please check your microphone permissions and try again."
      });
      setIsLoading(false);
    }
  };

  // End call handler
  const handleEndCall = () => {
    console.log("VapiCallDialog: Ending call");
    setStage('closed');
    onOpenChange(false);
    toast({
      title: "Call ended",
      description: "Thank you for using our AI voice agent."
    });
    
    // Clean up Vapi elements if they exist
    const script = document.querySelector('script[src*="vapi.ai"]');
    if (script) {
      script.remove();
      console.log("VapiCallDialog: Removed Vapi script");
    }
    
    const vapiRoot = document.getElementById('vapi-root');
    if (vapiRoot) {
      while (vapiRoot.firstChild) {
        vapiRoot.removeChild(vapiRoot.firstChild);
      }
      console.log("VapiCallDialog: Cleared Vapi root element");
    }
    
    // Try to tell Vapi to end the call if possible
    try {
      if ((window as any).vapi && typeof (window as any).vapi.endCall === 'function') {
        (window as any).vapi.endCall();
        console.log("VapiCallDialog: Called vapi.endCall()");
      }
    } catch (err) {
      console.error("VapiCallDialog: Error calling vapi.endCall():", err);
    }
    
    navigate(-1); // Go back to previous page
  };

  // When user closes dialog via onOpenChange (click outside or escape)
  const handleDialogOpenChange = (isOpen: boolean) => {
    console.log("VapiCallDialog: Dialog open change to", isOpen);
    if (!isOpen) {
      handleEndCall();
    }
  };

  // Reset stage when dialog opens again
  React.useEffect(() => {
    if (open) {
      console.log("VapiCallDialog: Dialog opened, setting stage to confirmation");
      setStage('confirmation');
      setIsLoading(false);
    }
  }, [open]);

  // Add debug logging
  useEffect(() => {
    console.log("VapiCallDialog: Dialog open state:", open, "Stage:", stage, "Loading:", isLoading);
  }, [open, stage, isLoading]);

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
                <Button 
                  variant="destructive" 
                  onClick={() => onOpenChange(false)} 
                  className="bg-red-600 text-white hover:bg-red-700"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleStartCall} 
                  className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-4 w-4" />
                      Start Voice Chat
                    </>
                  )}
                </Button>
              </div>
            </div>
          </>
        )}

        {stage === 'inCall' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Call in Progress</h2>
            </div>

            <div className="flex items-center space-x-4 mt-4">
              <div className="relative">
                <Avatar className="h-20 w-20 rounded-full border-2 border-[#9b87f5]/30">
                  <AvatarImage 
                    src="/lovable-uploads/bd9e9055-ba23-4fcc-9c2a-4fda4b9dd627.png" 
                    alt="Michael from Powered_by Solutions" 
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-[#1e1e2d] text-[#9b87f5]">MB</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-1 right-1">
                  <div className="h-3 w-3 bg-green-500 rounded-full ring-2 ring-black animate-pulse"></div>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-white">Michael</h3>
                <p className="text-gray-400">
                  <span className="bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md text-sm">Powered_by</span> Solutions
                </p>
              </div>
            </div>
            
            <div className="bg-[#1a1a2e] p-4 rounded-xl border border-[#9b87f5]/10 mt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">You are connected</h3>
                <div className="flex items-center text-[#9b87f5]">
                  <Activity className="w-5 h-5 mr-2" />
                  <span className="font-medium">Live</span>
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
                        className={`h-3 w-1 bg-[#9b87f5] rounded-full animate-pulse`}
                        style={{ animationDelay: `${i * 0.15}s` }}
                      ></div>
                    ))}
                  </div>
                  <span className="text-gray-400">Active</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button 
                onClick={handleEndCall}
                className="w-full py-6 text-xl bg-red-600 text-white hover:bg-red-700"
              >
                <PhoneOff className="mr-2 h-5 w-5" />
                End Voice Chat
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
