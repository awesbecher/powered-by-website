
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export type AgentType = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

export function useAssetTest() {
  const [showConsentDialog, setShowConsentDialog] = useState(false);
  const [showMercedesDialog, setShowMercedesDialog] = useState(false);
  const [showRestaurantDialog, setShowRestaurantDialog] = useState(false);
  const [showRealEstateDialog, setShowRealEstateDialog] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const { toast } = useToast();

  const agentTypes: AgentType[] = [
    {
      id: "mercedes",
      name: "Mercedes Dealership",
      description: "Virtual sales agent for Mercedes-Benz",
      icon: "car"
    },
    {
      id: "restaurant",
      name: "Restaurant Host",
      description: "Virtual host for restaurant bookings",
      icon: "utensils"
    },
    {
      id: "realestate",
      name: "Real Estate Agent",
      description: "Virtual agent for property inquiries",
      icon: "home"
    }
  ];

  const isMercedesAgent = selectedAgent === "mercedes";
  const isRestaurantAgent = selectedAgent === "restaurant";
  const isRealEstateAgent = selectedAgent === "realestate";

  const handleAgentSelect = (agentId: string) => {
    setSelectedAgent(agentId);
  };

  const handleMicClick = () => {
    setShowConsentDialog(true);
  };

  const handleCall = () => {
    setShowConsentDialog(false);
    setIsLoading(true);
    
    if (isMercedesAgent) {
      setShowMercedesDialog(true);
    } else if (isRestaurantAgent) {
      setShowRestaurantDialog(true);
    } else if (isRealEstateAgent) {
      setShowRealEstateDialog(true);
    }
    
    setTimeout(() => {
      setIsLoading(false);
      setIsCallActive(true);
      toast({
        title: "Call started",
        description: "You are now connected to the AI agent",
      });
    }, 2000);
  };

  const handleMercedesCall = () => handleCall();
  const handleRestaurantCall = () => handleCall();
  const handleRealEstateCall = () => handleCall();

  const handleEndCall = () => {
    setIsCallActive(false);
    setShowMercedesDialog(false);
    setShowRestaurantDialog(false);
    setShowRealEstateDialog(false);
    toast({
      title: "Call ended",
      description: "Your call with the AI agent has ended",
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
    agentTypes,
    isCallActive,
    showConsentDialog,
    setShowConsentDialog,
    showMercedesDialog,
    setShowMercedesDialog,
    showRestaurantDialog,
    setShowRestaurantDialog,
    showRealEstateDialog,
    setShowRealEstateDialog,
    isMuted,
    isLoading,
    isMercedesAgent,
    isRestaurantAgent,
    isRealEstateAgent,
    selectedAgent,
    handleAgentSelect,
    handleMicClick,
    handleCall,
    handleMercedesCall,
    handleRestaurantCall,
    handleRealEstateCall,
    handleEndCall,
    toggleMute
  };
}
