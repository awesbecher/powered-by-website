
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { initiateVapiCall } from "@/services/vapiService";

export function useInsuranceCall() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { toast } = useToast();

  const handleCall = async () => {
    setIsLoading(true);
    
    try {
      console.log("Starting Vapi call initialization");
      // Initiate the call using the Vapi service
      await initiateVapiCall();
      
      setTimeout(() => {
        setIsLoading(false);
        setIsCallActive(true);
        // Removed toast notification when call starts, as requested
        console.log("Call is now active");
      }, 1000);
    } catch (error) {
      console.error('Failed to start call:', error);
      setIsLoading(false);
      toast({
        title: "Call failed to connect",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  const handleEndCall = () => {
    console.log("Ending call and cleaning up Vapi resources");
    
    // Clean up any Vapi elements that might be on the page
    const script = document.querySelector('script[src="https://cdn.vapi.ai/messenger.js"]');
    if (script) {
      script.remove();
      console.log("Removed Vapi script");
    }
    
    const vapiRoot = document.getElementById('vapi-root');
    if (vapiRoot) {
      while (vapiRoot.firstChild) {
        vapiRoot.removeChild(vapiRoot.firstChild);
      }
      console.log("Cleared Vapi root element");
    }
    
    // Try to tell Vapi to end the call if possible
    try {
      if ((window as any).vapi && typeof (window as any).vapi.endCall === 'function') {
        (window as any).vapi.endCall();
        console.log("Called vapi.endCall()");
      }
    } catch (err) {
      console.error("Error calling vapi.endCall():", err);
    }
    
    toast({
      title: "Call ended",
      description: "Your insurance consultation has ended"
    });
    
    setIsCallActive(false);
  };

  const toggleMute = () => {
    // Try to mute/unmute the Vapi call if it's available
    try {
      if ((window as any).vapi && typeof (window as any).vapi.toggleMute === 'function') {
        (window as any).vapi.toggleMute();
        const newMuteState = !isMuted;
        setIsMuted(newMuteState);
        
        toast({
          title: newMuteState ? "Microphone muted" : "Microphone unmuted",
          description: newMuteState ? "You are now muted" : "You can now speak",
        });
      } else {
        setIsMuted(prev => !prev);
        toast({
          title: isMuted ? "Microphone unmuted" : "Microphone muted",
          description: isMuted ? "You can now speak" : "You are now muted",
        });
      }
    } catch (error) {
      console.error('Error toggling mute:', error);
      setIsMuted(prev => !prev);
    }
    
    console.log(`Microphone ${isMuted ? 'unmuted' : 'muted'}`);
  };

  return {
    isCallActive,
    isLoading,
    isMuted,
    handleCall,
    handleEndCall,
    toggleMute
  };
}
