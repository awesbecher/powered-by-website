
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AgentType } from "@/components/asset-test/types";
import { defaultAgents } from "@/components/asset-test/agentsData";

export function useAssetTest() {
  const [showConsentDialog, setShowConsentDialog] = useState(false);
  const [showMercedesDialog, setShowMercedesDialog] = useState(false);
  const [showRestaurantDialog, setShowRestaurantDialog] = useState(false);
  const [showRealEstateDialog, setShowRealEstateDialog] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<AgentType>(defaultAgents[0]);
  const { toast } = useToast();

  const agentTypes = defaultAgents;

  const isMercedesAgent = selectedAgent.id === "auto-dealership";
  const isRestaurantAgent = selectedAgent.id === "restaurant-order";
  const isRealEstateAgent = selectedAgent.id === "real-estate";

  const handleAgentSelect = (agentId: string) => {
    const newAgents = agentTypes.map(agent => ({
      ...agent,
      isSelected: agent.id === agentId
    }));
    
    const selectedAgent = newAgents.find(agent => agent.id === agentId) || newAgents[0];
    setSelectedAgent(selectedAgent);
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
