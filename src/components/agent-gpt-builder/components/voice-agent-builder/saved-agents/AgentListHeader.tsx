
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
        className="border-white/20 text-white hover:bg-white/10"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
      </Button>
    </div>
  );
};

export default AgentListHeader;
