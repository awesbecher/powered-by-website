
import React from "react";
import { AgentType } from "@/components/asset-test/types";
import AgentSelector from "@/components/asset-test/AgentSelector";
import MicButton from "@/components/asset-test/MicButton";
import AgentInfo from "@/components/asset-test/AgentInfo";

interface AssetTestContentProps {
  agentTypes: AgentType[];
  selectedAgent: AgentType;
  isCallActive: boolean;
  onAgentSelect: (id: string) => void;
  onMicClick: () => void;
}

const AssetTestContent: React.FC<AssetTestContentProps> = ({
  agentTypes,
  selectedAgent,
  isCallActive,
  onAgentSelect,
  onMicClick
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-[#9b87f5] text-center">AI Voice Assistant Demo</h1>
      
      <div className="bg-[#1A1A1A] p-8 rounded-3xl shadow-xl border border-gray-800">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AgentSelector 
            agentTypes={agentTypes} 
            onAgentSelect={onAgentSelect} 
          />

          <MicButton 
            isCallActive={isCallActive} 
            onClick={onMicClick} 
          />

          <AgentInfo selectedAgent={selectedAgent} />
        </div>
      </div>
    </div>
  );
};

export default AssetTestContent;
