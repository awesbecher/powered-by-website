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
import VoiceTriggerSection from "./components/voice-trigger/VoiceTriggerSection";
import WebhookTriggerSection from "./components/webhook-trigger/WebhookTriggerSection";

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

  const handleVoiceTranscription = (text: string) => {
    setInputMessage(text);
    // Optionally automatically send the message
    // setTimeout(() => handleSendMessage(), 500);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader initialLoad={initialLoad} />
      <FeatureBubbles />

      <div className={`mb-6 transition-all duration-1000 delay-300 ease-out transform ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
        <Tabs defaultValue="custom" className="w-full">
          <div className="flex justify-center">
            <TabsList className="max-w-3xl w-full mx-auto grid grid-cols-6 gap-2">
              <TabsTrigger value="custom" className="flex-1">
                Custom Agent
              </TabsTrigger>
              <TabsTrigger value="templates" className="flex-1">
                Industry Templates
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex-1">
                My Agents
              </TabsTrigger>
              <TabsTrigger value="pro" className="flex-1">
                Agent Builder Pro
              </TabsTrigger>
              <TabsTrigger value="voice-trigger" className="flex-1">
                Voice Trigger
              </TabsTrigger>
              <TabsTrigger value="webhook-trigger" className="flex-1">
                Webhook Trigger
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="custom">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
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
            <VoiceAgentBuilder onSelectTemplate={handleTemplateSelected} />
          </TabsContent>
          
          <TabsContent value="saved" className="mt-6">
            <VoiceAgentBuilder onSelectTemplate={handleTemplateSelected} initialTab="saved" />
          </TabsContent>
          
          <TabsContent value="pro" className="mt-6">
            <AgentBuilderPro />
          </TabsContent>

          <TabsContent value="voice-trigger" className="mt-6">
            <VoiceTriggerSection onTranscription={handleVoiceTranscription} />
          </TabsContent>

          <TabsContent value="webhook-trigger" className="mt-6">
            <WebhookTriggerSection agentName={agentName} />
          </TabsContent>
        </Tabs>
      </div>
      
      <DeploymentCTA />
    </div>
  );
};
