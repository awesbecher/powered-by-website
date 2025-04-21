
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
      // Initiate the call using the Vapi service
      await initiateVapiCall();
      
      setTimeout(() => {
        setIsLoading(false);
        setIsCallActive(true);
        toast({
          title: "Insurance consultation started",
          description: "You are now connected to our AI insurance agent"
        });
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
    // Remove any hidden Vapi iframes
    const vapiFrames = document.querySelectorAll('iframe[src*="vapi.ai"]');
    vapiFrames.forEach(frame => {
      frame.remove();
    });
    
    setIsCallActive(false);
    toast({
      title: "Call ended",
      description: "Your insurance consultation has ended"
    });
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
    toast({
      title: isMuted ? "Microphone unmuted" : "Microphone muted",
      description: isMuted ? "You can now speak" : "You are now muted",
    });
    
    // Send mute command to Vapi if we had a way to do that
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
