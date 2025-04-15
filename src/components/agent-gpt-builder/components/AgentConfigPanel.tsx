
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Code, Save, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AgentConfigPanelProps {
  agentName: string;
  setAgentName: (name: string) => void;
  agentInstructions: string;
  setAgentInstructions: (instructions: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  checkAgentLimits?: () => Promise<boolean>;
  disableCreation?: boolean;
}

const AgentConfigPanel: React.FC<AgentConfigPanelProps> = ({
  agentName,
  setAgentName,
  agentInstructions,
  setAgentInstructions,
  activeTab,
  setActiveTab,
  checkAgentLimits,
  disableCreation = false
}) => {
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleSaveAgent = async () => {
    if (disableCreation) {
      toast({
        variant: "destructive",
        title: "Agent limit reached",
        description: "You've reached your plan's agent limit. Please upgrade to create more agents."
      });
      return;
    }

    if (checkAgentLimits) {
      const canProceed = await checkAgentLimits();
      if (!canProceed) return;
    }

    setSaving(true);
    try {
      // Save agent logic would go here
      // For this example, we'll just simulate a saving process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Agent saved",
        description: "Your agent has been saved successfully."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save agent. Please try again."
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="border border-gray-700 bg-gray-900 shadow-xl rounded-xl">
      <CardHeader className="border-b border-gray-800 bg-gray-800/50 px-6 py-4">
        <CardTitle className="text-white flex items-center gap-2">
          <Bot className="h-5 w-5 text-purple-400" />
          Agent Configuration
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4">
        {/* Agent name input */}
        <div className="mb-4">
          <label htmlFor="agentName" className="block text-sm font-medium text-gray-300 mb-1">
            Agent Name
          </label>
          <Input 
            id="agentName"
            value={agentName} 
            onChange={(e) => setAgentName(e.target.value)}
            className="bg-gray-800 border-gray-700"
            placeholder="Enter agent name..."
            disabled={disableCreation}
          />
        </div>
        
        {/* Tabs for instructions, settings */}
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="mt-4"
        >
          <TabsList className="bg-gray-800/70">
            <TabsTrigger value="instructions" className="data-[state=active]:bg-purple-900/30">
              Instructions
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-900/30">
              Settings
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-purple-900/30">
              Advanced
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="instructions" className="mt-4 space-y-4">
            <div>
              <label htmlFor="instructions" className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-1">
                <Code className="h-4 w-4" />
                Agent Instructions
              </label>
              <Textarea 
                id="instructions"
                value={agentInstructions} 
                onChange={(e) => setAgentInstructions(e.target.value)}
                placeholder="Enter detailed instructions for your agent..."
                className="min-h-[300px] bg-gray-800 border-gray-700 text-sm font-mono"
                disabled={disableCreation}
              />
              <p className="text-xs text-gray-400 mt-2">
                This text will guide the agent's behavior and responses. Be as detailed as possible.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-4 space-y-4">
            <p className="text-gray-300">
              Voice and behavior settings will be available soon.
            </p>
          </TabsContent>
          
          <TabsContent value="advanced" className="mt-4 space-y-4">
            <p className="text-gray-300">
              Advanced configuration options will be available soon.
            </p>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 flex justify-between">
          <Button 
            variant="ghost" 
            className="text-gray-300 hover:bg-gray-800"
            disabled={disableCreation}
          >
            <Sparkles className="mr-1 h-4 w-4" />
            Enhance Instructions
          </Button>
          
          <Button 
            onClick={handleSaveAgent}
            disabled={saving || !agentName.trim() || !agentInstructions.trim() || disableCreation}
            className="bg-purple-700 hover:bg-purple-600"
          >
            {saving ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-1" />
            ) : (
              <Save className="mr-1 h-4 w-4" />
            )}
            Save Agent
          </Button>
        </div>

        {disableCreation && (
          <p className="text-amber-500 text-xs mt-4">
            You've reached your agent limit. Please 
            <a href="/pricing" className="underline mx-1">upgrade your plan</a>
            to create more agents.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default AgentConfigPanel;
