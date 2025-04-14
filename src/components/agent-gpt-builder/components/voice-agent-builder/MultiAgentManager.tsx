
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Trash2, Clipboard, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MultiAgentManagerProps {
  user: { id: string } | null;
}

interface Agent {
  id: string;
  name: string;
  prompt: string;
  created_at: string;
}

const MultiAgentManager: React.FC<MultiAgentManagerProps> = ({ user }) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [brandColor, setBrandColor] = useState("#9b87f5");
  const [greeting, setGreeting] = useState("Hi! I'm your smart agent 🤖");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchAgents = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("voice_agents")
        .select("*")
        .eq("created_by", user.id)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      if (data) setAgents(data as Agent[]);
    } catch (error) {
      console.error("Error fetching agents:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load your agents"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteAgent = async (id: string) => {
    try {
      const { error } = await supabase.from("voice_agents").delete().eq("id", id);
      
      if (error) throw error;
      
      toast({
        title: "Agent Deleted",
        description: "The agent has been successfully deleted"
      });
      
      fetchAgents();
    } catch (error) {
      console.error("Error deleting agent:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete agent"
      });
    }
  };

  const copyEmbed = (agent: Agent) => {
    const snippet = `
<!-- GPT Agent Widget -->
<div id="gpt-agent-widget"></div>
<script 
  src="https://voice-agent-widget.vercel.app/widget.js"
  data-agent="${agent.name}"
  data-lang="en-US"
  data-color="${brandColor}"
  data-greeting="${greeting}"
></script>
    `;
    navigator.clipboard.writeText(snippet);
    
    toast({
      title: "Embed Code Copied",
      description: `Embed code copied for agent: ${agent.name}`
    });
  };

  useEffect(() => {
    if (user?.id) fetchAgents();
  }, [user]);

  // Show a message if no user is logged in
  if (!user) {
    return (
      <div className="text-center py-12">
        <h3 className="text-white text-xl mb-4">Authentication Required</h3>
        <p className="text-gray-300">Please log in to manage your agents</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-white text-xl flex items-center gap-2">
          <span className="bg-[#9b87f5]/20 p-1 rounded-md">📂</span>
          My Agents &amp; Embeds
        </h2>
        <Button 
          onClick={fetchAgents} 
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10"
          disabled={loading}
        >
          {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white mb-2">Brand Color</label>
          <div className="flex items-center">
            <input
              type="color"
              value={brandColor}
              onChange={(e) => setBrandColor(e.target.value)}
              className="h-10 w-16 rounded cursor-pointer border-0"
            />
            <Input
              type="text"
              value={brandColor}
              onChange={(e) => setBrandColor(e.target.value)}
              className="ml-4 bg-[#1a0b2e]/40 border-white/20 text-white w-32"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-white mb-2">Greeting Message</label>
          <Input
            value={greeting}
            onChange={(e) => setGreeting(e.target.value)}
            placeholder="Hi! I'm your AI"
            className="bg-[#1a0b2e]/40 border-white/20 text-white"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <RefreshCw className="h-8 w-8 animate-spin text-[#9b87f5]" />
        </div>
      ) : agents.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-white text-xl mb-4">No Saved Agents</h3>
          <p className="text-gray-300">You haven't saved any agents yet. Create one to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {agents.map((agent) => (
            <Card 
              key={agent.id}
              className="border border-white/10 bg-[#1a0b2e]/40 hover:bg-[#2f1c4a]/40 transition-colors overflow-hidden"
            >
              <div className="p-4">
                <h3 className="text-white font-bold">{agent.name}</h3>
                <p className="text-gray-300 text-sm mt-2 line-clamp-2">
                  {agent.prompt?.substring(0, 100)}...
                </p>
                <div className="mt-4 flex justify-between">
                  <Button 
                    onClick={() => copyEmbed(agent)}
                    className="bg-gradient-to-r from-[#9b87f5] to-[#8777e5] hover:from-[#8777e5] hover:to-[#7667d5]"
                  >
                    <Clipboard className="mr-2 h-4 w-4" />
                    Copy Embed
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

export default MultiAgentManager;
