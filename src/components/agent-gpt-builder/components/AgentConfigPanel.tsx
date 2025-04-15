
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AgentTester from "./tester/AgentTester";

interface AgentConfigPanelProps {
  agentName: string;
  setAgentName: (name: string) => void;
  agentInstructions: string;
  setAgentInstructions: (instructions: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onCreateAgent?: () => void; 
}

const AgentConfigPanel: React.FC<AgentConfigPanelProps> = ({
  agentName,
  setAgentName,
  agentInstructions,
  setAgentInstructions,
  activeTab,
  setActiveTab,
  onCreateAgent,
}) => {
  const [showAgentTester, setShowAgentTester] = useState(false);

  const handleTestAgent = () => {
    setActiveTab("test");
    setShowAgentTester(true);
  };

  return (
    <div className="space-y-6 transition-all duration-300">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full bg-gradient-to-r from-[#2f1c4a]/60 to-[#1a0b2e]/60 border border-white/10 rounded-xl overflow-hidden">
          <TabsTrigger
            value="instructions"
            className="w-full data-[state=active]:bg-[#9b87f5]/20 data-[state=active]:text-white text-gray-300"
          >
            Instructions
          </TabsTrigger>
          <TabsTrigger
            value="test"
            className="w-full data-[state=active]:bg-[#9b87f5]/20 data-[state=active]:text-white text-gray-300"
            onClick={() => setShowAgentTester(true)}
          >
            Test & Deploy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="instructions" className="border-none mt-6 p-0">
          <div className="bg-gradient-to-br from-[#1a0b2e]/70 to-[#2f1c4a]/70 p-6 rounded-xl border border-white/10 shadow-lg">
            <div className="space-y-6">
              <div>
                <label htmlFor="agent-name" className="block text-sm text-gray-300 mb-2">
                  Agent Name
                </label>
                <Input
                  id="agent-name"
                  placeholder="My Voice Agent"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="bg-[#1a0b2e]/60 border-white/10 text-white"
                />
              </div>

              <div>
                <label htmlFor="agent-instructions" className="block text-sm text-gray-300 mb-2">
                  Agent Instructions
                </label>
                <Textarea
                  id="agent-instructions"
                  placeholder="Enter detailed instructions for your voice agent..."
                  value={agentInstructions}
                  onChange={(e) => setAgentInstructions(e.target.value)}
                  rows={12}
                  className="bg-[#1a0b2e]/60 border-white/10 text-white resize-none"
                />
                <p className="text-xs text-gray-400 mt-2">
                  These instructions will define how your voice agent behaves, what knowledge it has,
                  and how it should respond to different types of inquiries.
                </p>
              </div>

              <div className="flex space-x-4">
                <Button 
                  className="flex-1 bg-gradient-to-r from-[#9b87f5] to-[#8777e5] hover:from-[#8777e5] hover:to-[#7667d5] text-white shadow-lg shadow-[#9b87f5]/20"
                  onClick={onCreateAgent}
                >
                  Create Agent
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-[#9b87f5] to-[#8777e5] hover:from-[#8777e5] hover:to-[#7667d5] text-white shadow-lg shadow-[#9b87f5]/20"
                  onClick={handleTestAgent}
                >
                  Test Your Agent
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="test" className="border-none mt-6 p-0">
          {showAgentTester && (
            <AgentTester
              agentName={agentName}
              agentInstructions={agentInstructions}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgentConfigPanel;
