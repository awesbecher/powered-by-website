
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { initiateVapiCall, stopVapiCall } from "@/services/vapiService";

export const useInsuranceCall = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleEndCall = async () => {
    try {
      await stopVapiCall();
      setIsCallActive(false);
      navigate('/demo');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to end call",
        description: error.message || "Please try again later."
      });
    }
  };

  const handleCall = async () => {
    setIsLoading(true);
    try {
      await initiateVapiCall("df42b616-337e-4877-8e9b-44fb0b5a0225");
      setIsCallActive(true);
      toast({
        title: "Call initiated",
        description: "You are now connected to Alex Fisher from Planter's Insurance."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to initiate call",
        description: error.message || "Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMute = () => {
    // In a real implementation, this would interact with the Vapi SDK to mute/unmute
    setIsMuted(!isMuted);
  };

  return {
    isLoading,
    isCallActive,
    isMuted,
    handleCall,
    handleEndCall,
    toggleMute
  };
};
