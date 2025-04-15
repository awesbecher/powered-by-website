
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VoiceTrigger from "../voice-agent-builder/VoiceTrigger";
import { Bot } from "lucide-react";

interface VoiceTriggerSectionProps {
  onTranscription: (text: string) => void;
}

const VoiceTriggerSection: React.FC<VoiceTriggerSectionProps> = ({ onTranscription }) => {
  return (
    <Card className="border border-white/10 bg-gradient-to-br from-[#1a0b2e]/70 to-[#2f1c4a]/70 shadow-xl rounded-xl overflow-hidden">
      <CardHeader className="border-b border-white/10 bg-gradient-to-r from-[#2f1c4a] to-[#1a0b2e]">
        <CardTitle className="text-white flex items-center gap-2">
          <span className="bg-[#9b87f5]/20 p-1 rounded-md">
            <Bot className="text-[#9b87f5]" size={24} />
          </span>
          Voice Agent Trigger
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="text-white/80 mb-4">
          Quickly trigger your agent using voice or audio uploads
        </div>
        
        <VoiceTrigger onTranscription={onTranscription} />
      </CardContent>
    </Card>
  );
};

export default VoiceTriggerSection;
