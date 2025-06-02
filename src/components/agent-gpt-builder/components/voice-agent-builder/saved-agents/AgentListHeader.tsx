
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface AgentListHeaderProps {
  onRefresh: () => void;
  isLoading: boolean;
}

const AgentListHeader: React.FC<AgentListHeaderProps> = ({ onRefresh, isLoading }) => {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-white text-xl">📁 My Saved Agents</h3>
      <Button 
        onClick={onRefresh} 
        variant="outline"
        className="bg-[#352f49] text-white font-bold border-white/20 hover:bg-[#423a5a]"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
      </Button>
    </div>
  );
};

export default AgentListHeader;

