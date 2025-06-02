
import React from "react";
import { AgentType } from "@/components/asset-test/types";
import { Phone } from "lucide-react";

interface AgentInfoProps {
  selectedAgent: AgentType;
}

const AgentInfo: React.FC<AgentInfoProps> = ({ selectedAgent }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-6 text-[#9b87f5]">Agent Details</h2>
      
      <div className="bg-[#222222] text-white p-4 rounded-xl border border-gray-700">
        <h3 className="font-bold text-lg mb-3">{selectedAgent.name}</h3>
        <p className="text-gray-300 mb-4">{selectedAgent.description}</p>
        
        <div className="flex items-center gap-2 text-[#9b87f5]">
          <Phone className="w-4 h-4" />
          <span>{selectedAgent.phoneNumber}</span>
        </div>
        
        <div className="mt-4 text-sm text-gray-400">
          <span>Assistant ID: </span>
          <span className="font-mono">{selectedAgent.assistantId}</span>
        </div>
      </div>
    </div>
  );
};

export default AgentInfo;
