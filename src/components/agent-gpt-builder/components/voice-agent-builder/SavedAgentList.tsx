
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, BrainCircuit } from "lucide-react";
import { AgentTemplate } from "./types";
import { useToast } from "@/hooks/use-toast";

interface SavedAgentListProps {
  onLoadAgent: (agent: AgentTemplate) => void;
  onRefresh?: () => void;
}

const SavedAgentList: React.FC<SavedAgentListProps> = ({ onLoadAgent, onRefresh }) => {
  const [agents, setAgents] = useState<AgentTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAgents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("voice_agents")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      console.error("Error fetching agents:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load saved agents. Please try again.",
      });
    } else {
      setAgents(data || []);
    }
    setLoading(false);
  };

  const deleteAgent = async (id: string) => {
    const { error } = await supabase.from("voice_agents").delete().eq("id", id);
    
    if (error) {
      console.error("Error deleting agent:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete agent. Please try again.",
      });
    } else {
      toast({
        title: "Agent deleted",
        description: "The agent has been successfully deleted.",
      });
      fetchAgents();
      if (onRefresh) onRefresh();
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#9b87f5] border-r-transparent"></div>
      </div>
    );
  }

  if (agents.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-white text-xl mb-4">No Saved Agents</h3>
        <p className="text-gray-300 mb-6">You haven't saved any agents yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {agents.map((agent) => (
        <Card 
          key={agent.id}
          className="border border-white/10 bg-[#1a0b2e]/40 hover:bg-[#2f1c4a]/40 transition-colors"
        >
          <div className="p-4">
            <h3 className="text-white font-bold mb-2">{agent.name}</h3>
            <p className="text-gray-300 text-sm mb-3">{agent.prompt?.substring(0, 100)}...</p>
            <p className="text-gray-400 text-xs mb-3">
              Created: {new Date(agent.created_at || '').toLocaleDateString()}
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => onLoadAgent(agent)}
                className="flex-1 gap-1 bg-[#1a0b2e]/60 border-white/10 hover:bg-[#2f1c4a]/60"
              >
                <BrainCircuit size={16} />
                Load
              </Button>
              <Button
                onClick={() => deleteAgent(agent.id || '')}
                variant="destructive"
                size="sm"
                className="w-10"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SavedAgentList;
