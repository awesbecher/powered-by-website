
import React, { useEffect } from "react";
import PageHeader from "./components/PageHeader";
import FeatureBubbles from "./components/FeatureBubbles";
import ChatInterface from "./components/ChatInterface";
import AgentConfigPanel from "./components/AgentConfigPanel";
import DeploymentCTA from "./components/DeploymentCTA";
import { useAgentBuilder } from "./hooks/useAgentBuilder";

interface AgentBuilderProps {
  initialLoad: boolean;
}

export const AgentBuilder: React.FC<AgentBuilderProps> = ({ initialLoad }) => {
  const {
    messages,
    inputMessage,
    setInputMessage,
    isLoading,
    agentName,
    setAgentName,
    agentInstructions,
    setAgentInstructions,
    activeTab,
    setActiveTab,
    handleSendMessage,
    getStarterPrompt
  } = useAgentBuilder();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page title and description */}
      <PageHeader initialLoad={initialLoad} />

      {/* Feature bubbles */}
      <FeatureBubbles />

      {/* Main content area with chat interface and agent configuration */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 transition-all duration-1000 delay-300 ease-out transform ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
        {/* Left side - Chat interface */}
        <div className="lg:col-span-7">
          <ChatInterface 
            messages={messages} 
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            isLoading={isLoading}
            handleSendMessage={handleSendMessage}
            getStarterPrompt={getStarterPrompt}
          />
        </div>
        
        {/* Right side - Agent configuration */}
        <div className="lg:col-span-5">
          <AgentConfigPanel 
            agentName={agentName}
            setAgentName={setAgentName}
            agentInstructions={agentInstructions}
            setAgentInstructions={setAgentInstructions}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>
      
      {/* Bottom section with call to action */}
      <DeploymentCTA />
    </div>
  );
};
