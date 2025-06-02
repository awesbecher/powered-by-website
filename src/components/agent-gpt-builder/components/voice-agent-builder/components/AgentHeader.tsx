
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { AgentTemplate } from "../types";

interface AgentHeaderProps {
  selectedTemplate: AgentTemplate;
  onBack: () => void;
}

const AgentHeader: React.FC<AgentHeaderProps> = ({
  selectedTemplate,
  onBack
}) => {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-bold text-white flex items-center gap-2">
        <span className="bg-[#9b87f5]/20 p-1 rounded-md">🤖</span>
        {selectedTemplate.name}
      </h3>
      <Button 
        variant="outline" 
        size="sm"
        className="bg-[#1a0b2e]/60 border-white/10 text-white hover:bg-[#2f1c4a]/60"
        onClick={onBack}
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Templates
      </Button>
    </div>
  );
};

export default AgentHeader;
