
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { initiateVapiCall, stopVapiCall } from "@/services/vapiService";
import { AgentType } from "@/components/asset-test/types";
import { defaultAgents } from "@/components/asset-test/agentsData";

export const useAssetTest = () => {
  const [agentTypes, setAgentTypes] = useState<AgentType[]>(defaultAgents);
  const [isCallActive, setIsCallActive] = useState(false);
  const [showConsentDialog, setShowConsentDialog] = useState(false);
  const [showMercedesDialog, setShowMercedesDialog] = useState(false);
  const [showRestaurantDialog, setShowRestaurantDialog] = useState(false);
  const [showRealEstateDialog, setShowRealEstateDialog] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMercedesAgent, setIsMercedesAgent] = useState(false);
  const [isRestaurantAgent, setIsRestaurantAgent] = useState(false);
  const [isRealEstateAgent, setIsRealEstateAgent] = useState(false);
  const { toast } = useToast();

  const handleAgentSelect = (selectedId: string) => {
    setAgentTypes(prevTypes => 
      prevTypes.map(agent => ({
        ...agent,
        isSelected: agent.id === selectedId
      }))
    );
    
    setIsMercedesAgent(selectedId === "auto-dealership");
    setIsRestaurantAgent(selectedId === "restaurant-order");
    setIsRealEstateAgent(selectedId === "real-estate");
  };

  const handleMicClick = () => {
    const selectedAgent = agentTypes.find(agent => agent.isSelected);
    
    if (selectedAgent?.id === "insurance-quote") {
      setShowConsentDialog(true);
    } else if (selectedAgent?.id === "auto-dealership") {
      setShowMercedesDialog(true);
    } else if (selectedAgent?.id === "restaurant-order") {
      setShowRestaurantDialog(true);
    } else if (selectedAgent?.id === "real-estate") {
      setShowRealEstateDialog(true);
    } else {
      setIsCallActive(!isCallActive);
    }
  };

  const handleCall = async () => {
    setIsLoading(true);
    try {
      const selectedAgent = agentTypes.find(agent => agent.isSelected);
      if (selectedAgent && selectedAgent.assistantId) {
        await initiateVapiCall(selectedAgent.assistantId);
        setIsCallActive(true);
        setShowConsentDialog(false);
        toast({
          title: "Call initiated",
          description: `You are now connected to Alex Fisher from Planter's Insurance.`
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to initiate call",
        description: error instanceof Error ? error.message : "Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMercedesCall = async () => {
    setIsLoading(true);
    try {
      const selectedAgent = agentTypes.find(agent => agent.isSelected);
      if (selectedAgent) {
        await initiateVapiCall("6c02f892-3082-4c68-a3ee-92ca86444331");
        setIsCallActive(true);
        setShowMercedesDialog(false);
        toast({
          title: "Call initiated",
          description: `You are now connected to Dave Frankel from Mercedes of Tacoma.`
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to initiate call",
        description: error instanceof Error ? error.message : "Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestaurantCall = async () => {
    setIsLoading(true);
    try {
      const selectedAgent = agentTypes.find(agent => agent.isSelected);
      if (selectedAgent) {
        await initiateVapiCall("23a2ccf0-044e-4340-8c88-850b272e2abf");
        setIsCallActive(true);
        setShowRestaurantDialog(false);
        toast({
          title: "Call initiated",
          description: `You are now connected to Dominic from Slice House of Anaheim.`
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to initiate call",
        description: error instanceof Error ? error.message : "Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRealEstateCall = async () => {
    setIsLoading(true);
    try {
      const selectedAgent = agentTypes.find(agent => agent.isSelected);
      if (selectedAgent) {
        await initiateVapiCall("f8131f3d-58aa-4c81-a79e-1bf758803775");
        setIsCallActive(true);
        setShowRealEstateDialog(false);
        toast({
          title: "Call initiated",
          description: `You are now connected to Jeff Smith from Township Real Estate.`
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to initiate call",
        description: error instanceof Error ? error.message : "Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndCall = async () => {
    try {
      await stopVapiCall();
      setIsCallActive(false);
      setIsMuted(false);
      toast({
        title: "Call ended",
        description: "Thank you for trying our voice assistant."
      });
    } catch (error) {
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

  const selectedAgent = agentTypes.find(agent => agent.isSelected) || agentTypes[0];

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
};
