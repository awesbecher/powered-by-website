
import React from "react";
import { AgentTemplates } from "./types";

interface VoiceAgentTemplatesProps {
  agentTemplates: AgentTemplates;
  onSelectTemplate: (key: string) => void;
}

const VoiceAgentTemplates: React.FC<VoiceAgentTemplatesProps> = ({ 
  agentTemplates, 
  onSelectTemplate 
}) => {
  return (
    <div>
      <p className="text-white/80 mb-4">Select an industry to launch a voice-enabled AI agent:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {Object.entries(agentTemplates).map(([key, val]) => (
          <div
            key={key}
            className="border border-white/10 rounded-lg p-4 cursor-pointer bg-[#1a0b2e]/40 hover:bg-[#2f1c4a]/40 transition-colors"
            onClick={() => onSelectTemplate(key)}
          >
            <strong className="text-white block mb-1">{val.name}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoiceAgentTemplates;
