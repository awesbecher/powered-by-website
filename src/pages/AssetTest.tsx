
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { initiateVapiCall, stopVapiCall } from "@/services/vapiService";
import { AgentType } from "@/components/asset-test/types";
import { defaultAgents } from "@/components/asset-test/agentsData";
import AgentSelector from "@/components/asset-test/AgentSelector";
import MicButton from "@/components/asset-test/MicButton";
import AgentInfo from "@/components/asset-test/AgentInfo";
import ConsentDialog from "@/components/asset-test/ConsentDialog";
import CallDialog from "@/components/asset-test/CallDialog";
import MercedesConsentDialog from "@/components/asset-test/MercedesConsentDialog";

const AssetTest = () => {
  const [agentTypes, setAgentTypes] = useState<AgentType[]>(defaultAgents);
  const [isCallActive, setIsCallActive] = useState(false);
  const [showConsentDialog, setShowConsentDialog] = useState(false);
  const [showMercedesDialog, setShowMercedesDialog] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMercedesAgent, setIsMercedesAgent] = useState(false);
  const { toast } = useToast();

  const handleAgentSelect = (selectedId: string) => {
    setAgentTypes(prevTypes => 
      prevTypes.map(agent => ({
        ...agent,
        isSelected: agent.id === selectedId
      }))
    );
    
    // Set the appropriate agent type flag
    setIsMercedesAgent(selectedId === "auto-dealership");
  };

  const handleMicClick = () => {
    const selectedAgent = agentTypes.find(agent => agent.isSelected);
    
    if (selectedAgent?.id === "insurance-quote") {
      setShowConsentDialog(true);
    } else if (selectedAgent?.id === "auto-dealership") {
      setShowMercedesDialog(true);
    } else {
      setIsCallActive(!isCallActive);
      // In a real implementation, this would initiate the voice assistant based on the selected agent
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
        // Use the provided assistant ID
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
    // In a real implementation, this would interact with the Vapi SDK to mute/unmute
    setIsMuted(!isMuted);
  };

  const selectedAgent = agentTypes.find(agent => agent.isSelected) || agentTypes[0];

  return (
    <div className="pt-24 min-h-screen bg-[#121212] text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-[#9b87f5] text-center">AI Voice Assistant Demo</h1>
        
        <div className="bg-[#1A1A1A] p-8 rounded-3xl shadow-xl border border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AgentSelector 
              agentTypes={agentTypes} 
              onAgentSelect={handleAgentSelect} 
            />

            <MicButton 
              isCallActive={isCallActive} 
              onClick={handleMicClick} 
            />

            <AgentInfo selectedAgent={selectedAgent} />
          </div>
        </div>
      </div>

      <ConsentDialog 
        open={showConsentDialog} 
        onOpenChange={setShowConsentDialog}
        onConfirm={handleCall}
        isLoading={isLoading}
      />

      <MercedesConsentDialog
        open={showMercedesDialog}
        onOpenChange={setShowMercedesDialog}
        onConfirm={handleMercedesCall}
        isLoading={isLoading}
      />

      <CallDialog 
        open={isCallActive} 
        onOpenChange={(open) => !open && handleEndCall()}
        onEndCall={handleEndCall}
        onToggleMute={toggleMute}
        isMuted={isMuted}
        isMercedesAgent={isMercedesAgent}
      />
    </div>
  );
};

export default AssetTest;
