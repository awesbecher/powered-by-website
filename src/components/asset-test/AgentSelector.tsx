
import React from "react";
import { AgentType } from "./types";

interface AgentSelectorProps {
  agentTypes: AgentType[];
  onAgentSelect: (id: string) => void;
}

const AgentSelector: React.FC<AgentSelectorProps> = ({ agentTypes, onAgentSelect }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-6 text-[#9b87f5]">Choose Agent Use Case</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        {agentTypes.map(agent => (
          <div
            key={agent.id}
            onClick={() => onAgentSelect(agent.id)}
            className={`relative cursor-pointer rounded-xl p-4 transition-all duration-300 ${
              agent.isSelected
                ? "bg-white text-black border-2 border-[#9b87f5]" 
                : "bg-[#222222] text-white border border-gray-700 hover:border-[#9b87f5]/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${agent.isSelected ? "bg-[#9b87f5]" : "bg-gray-800"}`}>
                <agent.icon className={`w-6 h-6 ${agent.isSelected ? "text-white" : "text-[#9b87f5]"}`} />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base">{agent.name}</h3>
              </div>
            </div>
            {agent.isSelected && (
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#9b87f5] rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentSelector;
