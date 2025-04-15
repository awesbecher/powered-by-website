
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Agent {
  id: string;
  name: string;
  prompt: string;
  created_at: string;
  created_by: string;
}

export function useSavedAgents(user: { id: string } | null) {
  const [agents, setAgents] = useState<Agent[]>([]);
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

  return {
    agents,
    loading,
    fetchAgents,
    deleteAgent
  };
}
