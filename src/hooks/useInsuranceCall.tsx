import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { initiateVapiCall } from "@/services/vapiService";

export function useInsuranceCall() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { toast } = useToast();

  // Listen for Vapi related events to better sync the UI state
  useEffect(() => {
    const handleVapiStarted = () => {
      console.log("Vapi conversation started - updating UI");
      setIsCallActive(true);
      setIsLoading(false);
    };

    const handleVapiEnded = () => {
      console.log("Vapi conversation ended - updating UI");
      setIsCallActive(false);
    };
    
    // Custom event listeners
    document.addEventListener('vapi-conversation-started', handleVapiStarted);
    document.addEventListener('vapi-conversation-ended', handleVapiEnded);
    
    return () => {
      document.removeEventListener('vapi-conversation-started', handleVapiStarted);
      document.removeEventListener('vapi-conversation-ended', handleVapiEnded);
    };
  }, []);

  const handleCall = async () => {
    setIsLoading(true);
    
    try {
      console.log("Starting Vapi call initialization");
      
      // First check for microphone permission
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Stop the stream immediately - we're just checking permissions
        stream.getTracks().forEach(track => track.stop());
        console.log('Microphone permission granted');
      } catch (micError) {
        console.error('Microphone permission denied:', micError);
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Microphone access required",
          description: "Please allow microphone access to use the voice agent."
        });
        return;
      }
      
      // Initiate the call using the Vapi service with the insurance-specific assistant ID
      await initiateVapiCall('insurance');
      
      // Use a timeout to give Vapi time to initialize
      setTimeout(() => {
        setIsLoading(false);
        setIsCallActive(true);
        
        // Check if Vapi elements are present in the DOM
        const vapiRoot = document.getElementById('vapi-root');
        if (vapiRoot && vapiRoot.childElementCount > 0) {
          console.log("Vapi elements found in DOM, call should be active");
        } else {
          console.warn("No Vapi elements found in DOM, connection might have failed");
          
          // We'll still set call as active for now since the script might be initializing
          console.log("Setting call active anyway in case of delayed initialization");
        }
      }, 2000);
    } catch (error) {
      console.error('Failed to start call:', error);
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Call failed to connect",
        description: error instanceof Error ? error.message : "Please check your microphone permissions and try again"
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
