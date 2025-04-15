
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import WebhookTriggerSection from "@/components/agent-gpt-builder/components/webhook-trigger/WebhookTriggerSection";
import VoiceToWebhookSection from "@/components/agent-gpt-builder/components/voice-trigger/VoiceToWebhookSection";
import OpenAPIGeneratorSection from "@/components/agent-gpt-builder/components/openapi-generator/OpenAPIGeneratorSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AgentIntegrations = () => {
  const [activeTab, setActiveTab] = React.useState("webhooks");
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      <div className="py-8 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Agent Integrations</h1>
          <p className="text-white/70 max-w-3xl mx-auto">
            Connect your AI agents with other tools and services using webhooks, voice commands, and more.
          </p>
        </div>
        
        <Tabs defaultValue="webhooks" value={activeTab} onValueChange={setActiveTab} className="w-full mb-12">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-[#1A1F2C]/80 border border-white/10">
              <TabsTrigger value="webhooks">
                Webhook Triggers
              </TabsTrigger>
              <TabsTrigger value="voice">
                Voice to Webhook
              </TabsTrigger>
              <TabsTrigger value="openapi">
                API Spec Generator
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="webhooks">
            <WebhookTriggerSection />
          </TabsContent>
          
          <TabsContent value="voice">
            <VoiceToWebhookSection />
          </TabsContent>
          
          <TabsContent value="openapi">
            <OpenAPIGeneratorSection />
          </TabsContent>
        </Tabs>
        
        {/* Additional info section */}
        <div className="bg-[#2f1c4a]/40 p-6 rounded-xl border border-white/10 mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Integration Ideas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#1a0b2e]/60 p-4 rounded-lg border border-white/10">
              <h3 className="text-xl font-medium text-[#9b87f5] mb-2">Customer Support</h3>
              <p className="text-white/80">
                Connect your CRM to automatically trigger agents when customers submit support tickets.
              </p>
            </div>
            <div className="bg-[#1a0b2e]/60 p-4 rounded-lg border border-white/10">
              <h3 className="text-xl font-medium text-[#9b87f5] mb-2">Scheduled Reports</h3>
              <p className="text-white/80">
                Use cron jobs to trigger agents that generate and send reports on a schedule.
              </p>
            </div>
            <div className="bg-[#1a0b2e]/60 p-4 rounded-lg border border-white/10">
              <h3 className="text-xl font-medium text-[#9b87f5] mb-2">IoT Devices</h3>
              <p className="text-white/80">
                Trigger agents from smart home devices or sensors when specific conditions are met.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default AgentIntegrations;
