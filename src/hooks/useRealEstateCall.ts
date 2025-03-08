
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { getVapiInstance } from "@/services/vapiService";

export const useRealEstateCall = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCall = async () => {
    setIsLoading(true);
    try {
      const vapi = getVapiInstance();
      await vapi.start("f8131f3d-58aa-4c81-a79e-1bf758803775");
      
      setIsCallActive(true);
      
      vapi.on("call-end", () => {
        setIsLoading(false);
        setIsCallActive(false);
        navigate('/demo');
      });

      toast({
        title: "Call initiated",
        description: "Our AI agent is connecting with you."
      });
    } catch (error) {
      console.error('Error initiating call:', error);
      setIsLoading(false);
      setIsCallActive(false);
      toast({
        variant: "destructive",
        title: "Failed to initiate call",
        description: error instanceof Error ? error.message : "Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndCall = () => {
    try {
      const vapi = getVapiInstance();
      vapi.stop();
      setIsCallActive(false);
      navigate('/demo');
    } catch (error) {
      console.error('Error ending call:', error);
      toast({
        variant: "destructive",
        title: "Failed to end call",
        description: error instanceof Error ? error.message : "Please try again later."
      });
    }
  };

  const toggleMute = () => {
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
