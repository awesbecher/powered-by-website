
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AgentConfigPanel } from "./components/AgentConfigPanel";
import { ChatInterface } from "./components/ChatInterface";
import { PageHeader } from "./components/PageHeader";
import { FeatureBubbles } from "./components/FeatureBubbles";
import { DeploymentCTA } from "./components/DeploymentCTA";
import { supabase } from "@/integrations/supabase/client";
import { useAgentBuilder } from "./hooks/useAgentBuilder";
import { useToast } from "@/hooks/use-toast";
import BillingPanel from "./components/billing/BillingPanel";
import { useUsageLimits } from "./hooks/useUsageLimits";

interface AgentBuilderProps {
  initialLoad?: boolean;
}

export const AgentBuilder: React.FC<AgentBuilderProps> = ({ initialLoad = false }) => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [activeTab, setActiveTab] = useState("chat");
  const [readyToChat, setReadyToChat] = useState(false);
  
  const {
    agentName,
    setAgentName,
    agentType,
    setAgentType,
    agentPrompt,
    setAgentPrompt,
    messages,
    setMessages,
    inputMessage,
    setInputMessage,
    isLoading,
    setIsLoading,
    isConfiguring,
    setIsConfiguring,
    handleSendMessage,
    getStarterPrompt
  } = useAgentBuilder();

  const { usageLimits, checkMessageLimit, checkAgentCreationLimit } = useUsageLimits();

  useEffect(() => {
    // Check for success or canceled parameters in the URL
    const success = searchParams.get('success') === 'true';
    const canceled = searchParams.get('canceled') === 'true';

    if (success) {
      toast({
        title: "Payment successful!",
        description: "Your subscription has been activated. You now have access to additional features.",
      });
    } else if (canceled) {
      toast({
        title: "Payment canceled",
        description: "Your payment was canceled. You can try again when you're ready.",
      });
    }
  }, [searchParams, toast]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    };

    fetchUser();
  }, []);

  // Handle agent creation
  const handleAgentCreation = () => {
    if (!agentName.trim() || !agentPrompt.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a name and prompt for your agent.",
        variant: "destructive",
      });
      return;
    }

    // Check if user is within usage limits for agent creation
    if (!checkAgentCreationLimit()) {
      return; // The function already shows a toast
    }

    // If all validations pass, configure the agent
    setIsConfiguring(true);
    setReadyToChat(true);
    setActiveTab("chat");
  };

  const handleStartOver = () => {
    setAgentName("");
    setAgentPrompt("");
    setAgentType("customer-service");
    setMessages([]);
    setIsConfiguring(false);
    setReadyToChat(false);
  };

  return (
    <div className="container mx-auto max-w-7xl">
      <PageHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-gray-900/50 border border-gray-700">
              <TabsTrigger value="configure" disabled={isConfiguring}>Configure</TabsTrigger>
              <TabsTrigger value="chat" disabled={!readyToChat}>Chat</TabsTrigger>
              <TabsTrigger value="deploy" disabled={!readyToChat}>Deploy</TabsTrigger>
            </TabsList>
            
            <TabsContent value="configure" className="mt-4">
              <AgentConfigPanel 
                agentName={agentName}
                setAgentName={setAgentName}
                agentType={agentType}
                setAgentType={setAgentType}
                agentPrompt={agentPrompt}
                setAgentPrompt={setAgentPrompt}
                onCreateAgent={handleAgentCreation}
              />
            </TabsContent>
            
            <TabsContent value="chat" className="mt-4">
              <ChatInterface 
                messages={messages}
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                isLoading={isLoading}
                handleSendMessage={(message) => handleSendMessage(message, checkMessageLimit)}
                getStarterPrompt={() => getStarterPrompt(agentType)}
                disabled={!checkMessageLimit(true)}  // Just check without incrementing
              />
              
              {readyToChat && (
                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={handleStartOver} 
                    className="text-sm text-gray-400 hover:text-white transition-colors">
                    Start over with a new configuration
                  </button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="deploy" className="mt-4">
              <DeploymentCTA 
                agentName={agentName}
                agentPrompt={agentPrompt}
              />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <BillingPanel user={user} />
          <FeatureBubbles />
        </div>
      </div>
    </div>
  );
};
