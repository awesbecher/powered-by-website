
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AgentTestInterface from "./AgentTestInterface";
import AgentDeploymentSection from "./AgentDeploymentSection";
import { useAgentTester } from "./useAgentTester";

interface AgentTesterProps {
  agentName: string;
  agentInstructions: string;
}

const AgentTester: React.FC<AgentTesterProps> = ({ agentName, agentInstructions }) => {
  // Use the custom hook to manage all tester state and logic
  const {
    userInput,
    setUserInput,
    messages,
    loading,
    handleSendMessage,
    handleSaveAgent
  } = useAgentTester(agentName, agentInstructions);

  return (
    <Card className="border border-white/10 bg-gradient-to-br from-[#1a0b2e]/70 to-[#2f1c4a]/70 shadow-xl rounded-xl overflow-hidden animate-fade-in" style={{ animationDelay: '0.7s' }}>
      <CardHeader className="border-b border-white/10 bg-gradient-to-r from-[#2f1c4a] to-[#1a0b2e]">
        <CardTitle className="text-white flex items-center gap-2">
          <span className="bg-[#9b87f5]/20 p-1 rounded-md">🧪</span>
          Test Your Agent
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <AgentTestInterface 
          messages={messages}
          handleSendMessage={handleSendMessage}
          userInput={userInput}
          setUserInput={setUserInput}
          loading={loading}
          agentInstructions={agentInstructions}
        />
        
        <AgentDeploymentSection 
          agentName={agentName}
          agentInstructions={agentInstructions}
          handleSaveAgent={handleSaveAgent}
        />
      </CardContent>
    </Card>
  );
};

export default AgentTester;
