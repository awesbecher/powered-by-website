
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function useInsuranceCall() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { toast } = useToast();

  const handleCall = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setIsCallActive(true);
      toast({
        title: "Insurance consultation started",
        description: "You are now connected to our AI insurance agent"
      });
    }, 2000);
  };

  const handleEndCall = () => {
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
