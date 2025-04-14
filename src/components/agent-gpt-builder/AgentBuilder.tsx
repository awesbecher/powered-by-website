
import React, { useEffect } from "react";
import PageHeader from "./components/PageHeader";
import FeatureBubbles from "./components/FeatureBubbles";
import ChatInterface from "./components/ChatInterface";
import AgentConfigPanel from "./components/AgentConfigPanel";
import DeploymentCTA from "./components/DeploymentCTA";
import { useAgentBuilder } from "./hooks/useAgentBuilder";
import VoiceAgentBuilder from "./components/voice-agent-builder/VoiceAgentBuilder";
import AgentBuilderPro from "./components/AgentBuilderPro";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  const handleTemplateSelected = (template: { name: string; prompt: string }) => {
    setAgentName(template.name.split(" - ")[0]);
    setAgentInstructions(template.prompt);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page title and description */}
      <PageHeader initialLoad={initialLoad} />

      {/* Feature bubbles */}
      <FeatureBubbles />

      {/* Tabs for switching between custom and template agents */}
      <div className={`mb-6 transition-all duration-1000 delay-300 ease-out transform ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
        <Tabs defaultValue="custom" className="w-full">
          <TabsList className="max-w-md mx-auto">
            <TabsTrigger value="custom">
              Custom Agent
            </TabsTrigger>
            <TabsTrigger value="templates">
              Industry Templates
            </TabsTrigger>
            <TabsTrigger value="saved">
              My Agents
            </TabsTrigger>
            <TabsTrigger value="embeds">
              Embeds
            </TabsTrigger>
            <TabsTrigger value="pro">
              Agent Builder Pro
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="custom">
            {/* Main content area with chat interface and agent configuration */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
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
          </TabsContent>
          
          <TabsContent value="templates" className="mt-6">
            {/* Voice-enabled template agents */}
            <VoiceAgentBuilder onSelectTemplate={handleTemplateSelected} />
          </TabsContent>
          
          <TabsContent value="saved" className="mt-6">
            {/* Saved agents tab */}
            <VoiceAgentBuilder onSelectTemplate={handleTemplateSelected} initialTab="saved" />
          </TabsContent>
          
          <TabsContent value="embeds" className="mt-6">
            {/* Embeds tab for managing agent embeds */}
            <VoiceAgentBuilder onSelectTemplate={handleTemplateSelected} initialTab="embeds" />
          </TabsContent>
          
          <TabsContent value="pro" className="mt-6">
            {/* Advanced agent builder with more features */}
            <AgentBuilderPro />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Bottom section with call to action */}
      <DeploymentCTA />
    </div>
  );
};
