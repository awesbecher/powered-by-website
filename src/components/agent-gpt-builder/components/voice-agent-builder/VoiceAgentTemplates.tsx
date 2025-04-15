
import React from "react";
import { Card } from "@/components/ui/card";
import { AgentTemplate } from "./types";
import { agentTemplates, AgentTemplatesKey } from "./data/templateData";

interface VoiceAgentTemplatesProps {
  onSelectTemplate: (key: string) => void;
}

const VoiceAgentTemplates: React.FC<VoiceAgentTemplatesProps> = ({ onSelectTemplate }) => {
  return (
    <div className="bg-[#433c5c] p-6 rounded-lg">
      <p className="text-white/80 mb-4">Select a template to customize your voice agent:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(agentTemplates).map(([key, template]) => (
          <Card 
            key={key}
            className="border border-white/10 bg-[#352f49] hover:bg-[#423a5a] transition-colors cursor-pointer p-4"
            onClick={() => onSelectTemplate(key)}
          >
            <h3 className="text-white font-bold mb-2">{template.name}</h3>
            <p className="text-gray-300 text-sm">{template.prompt.substring(0, 100)}...</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VoiceAgentTemplates;
