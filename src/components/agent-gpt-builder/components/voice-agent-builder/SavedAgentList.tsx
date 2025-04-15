import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SavedAgentListProps {
  user: { id: string } | null;
  onLoadAgent: (agent: any) => void;
  onRefresh?: () => void;
  onBrowseTemplates?: () => void;
}

const SavedAgentList: React.FC<SavedAgentListProps> = ({ 
  user, 
  onLoadAgent, 
  onRefresh, 
  onBrowseTemplates 
}) => {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAgents = async () => {
    setLoading(true);
    let query = supabase
      .from("voice_agents")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (user?.id) {
      query = query.eq("created_by", user.id);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error("Error fetching agents:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load saved agents",
      });
    }
    
    if (data) {
      setAgents(data);
    }
    
    setLoading(false);
  };

  const deleteAgent = async (id: string) => {
    try {
      const { error } = await supabase.from("voice_agents").delete().eq("id", id);
      
      if (error) throw error;
      
      toast({
        title: "Agent Deleted",
        description: "The agent has been successfully deleted",
      });
      
      fetchAgents();
      if (onRefresh) onRefresh();
      
    } catch (error) {
      console.error("Error deleting agent:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete agent",
      });
    }
  };

  useEffect(() => {
    fetchAgents();
  }, [user]);

  return (
    <div className="space-y-6 bg-[#1A1F2C]/20 p-6 rounded-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-white text-xl">📁 My Saved Agents</h3>
        <Button 
          onClick={fetchAgents} 
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-[#9b87f5]" />
        </div>
      ) : agents.length === 0 ? (
        <div className="text-center py-12 bg-[#1A1F2C]/60 rounded-lg">
          <h3 className="text-white text-xl mb-4">No Saved Agents</h3>
          <p className="text-gray-300 mb-6">You haven't saved any agents yet. Create one from a template to get started.</p>
          <Button 
            onClick={onBrowseTemplates} 
            className="bg-gradient-to-r from-[#9b87f5] to-[#8777e5] hover:from-[#8777e5] hover:to-[#7667d5]"
          >
            Browse Templates
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {agents.map((agent) => (
            <Card 
              key={agent.id}
              className="border border-white/10 bg-[#1A1F2C]/60 hover:bg-[#2f1c4a]/40 transition-colors overflow-hidden"
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
                    onClick={() => deleteAgent(agent.id)} 
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedAgentList;
