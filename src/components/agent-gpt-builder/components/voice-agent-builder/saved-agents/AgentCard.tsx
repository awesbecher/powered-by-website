
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

interface AgentCardProps {
  agent: {
    id: string;
    name: string;
    prompt: string;
  };
  onLoadAgent: (agent: any) => void;
  onDeleteAgent: (id: string) => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ 
  agent, 
  onLoadAgent, 
  onDeleteAgent 
}) => {
  return (
    <Card 
      className="border border-white/10 bg-[#2C3142] hover:bg-[#3C4252] transition-colors overflow-hidden"
    >
      <div className="p-4">
        <h3 className="text-white font-bold">{agent.name}</h3>
        <p className="text-gray-300 text-sm mt-2 line-clamp-2">
          {agent.prompt.substring(0, 120)}...
        </p>
        <div className="mt-4 flex justify-between">
          <Button 
            onClick={() => onLoadAgent(agent)}
            className="bg-gradient-to-r from-[#9b87f5] to-[#8777e5] hover:from-[#8777e5] hover:to-[#7667d5]"
          >
            Load Agent
          </Button>
          <Button 
            onClick={() => onDeleteAgent(agent.id)} 
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <Trash2 className="h-4 w-4 text-red-400" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AgentCard;
