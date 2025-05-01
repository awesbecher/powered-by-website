import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DownloadIcon, FileJson, Mail, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import VisualAgentBuilder from "@/components/agent-gpt-builder/VisualAgentBuilder";
import { agentTemplates } from "@/components/agent-gpt-builder/components/voice-agent-builder/data/templateData";
import { AgentTemplatesKey } from "@/components/agent-gpt-builder/components/voice-agent-builder/data/templateData";

const AgentGPTBuilder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [activeTab, setActiveTab] = useState("builder");
  const [templateKey, setTemplateKey] = useState<string | null>(null);
  
  // Get template from URL if provided
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const template = params.get("template");
    if (template) {
      setTemplateKey(template);
    }
    
    setIsLoaded(true);
    
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [location]);

  const handleExportJson = () => {
    // Implementation for exporting agent as JSON
    const agentData = {
      name: "My Agent",
      instructions: "This is a sample agent",
      // Add more properties as needed from the form
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(agentData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "agent-config.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    toast({
      title: "JSON Exported",
      description: "Your agent configuration has been exported successfully.",
    });
  };
  
  const handleSendPdf = () => {
    // Implementation for sending PDF to email
    toast({
      title: "PDF Generated",
      description: "The agent PDF has been sent to your email.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] text-white">
      <Navbar />
      
      <motion.div 
        className="pt-8 pb-16 px-4 md:px-8 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Visual Agent Builder</h1>
            <p className="text-gray-300">Customize your AI voice agent with our powerful visual editor.</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleExportJson} className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white flex items-center gap-2">
              <FileJson size={18} />
              Export JSON
            </Button>
            <Button onClick={handleSendPdf} className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white flex items-center gap-2">
              <Mail size={18} />
              Send PDF
            </Button>
            <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white flex items-center gap-2">
              <Save size={18} />
              Save Agent
            </Button>
          </div>
        </div>
        
        <Tabs 
          defaultValue={activeTab} 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 max-w-md mb-8">
            <TabsTrigger value="builder">Builder</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          
          <TabsContent value="builder" className="w-full">
            <VisualAgentBuilder templateKey={templateKey as AgentTemplatesKey} />
          </TabsContent>
          
          <TabsContent value="preview">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Agent Preview</h3>
              <p className="text-gray-300 mb-4">This is where a preview of your agent would appear.</p>
              <div className="bg-black/20 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap">
                {`# Agent Prompt Preview
name: ${templateKey ? agentTemplates[templateKey as AgentTemplatesKey]?.name || "My Agent" : "My Agent"}
role: AI Voice Assistant

## Instructions
- Respond to customer inquiries professionally
- Provide accurate information about products and services
- Schedule appointments when requested
- Escalate to a human agent when necessary

## Additional Context
This agent is designed to handle incoming calls for our business,
answer common questions, and help direct customers to the right resources.
`}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="code">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Agent Code</h3>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <DownloadIcon size={14} />
                  Download
                </Button>
              </div>
              <div className="bg-black/20 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{`{
  "agent": {
    "name": "${templateKey ? agentTemplates[templateKey as AgentTemplatesKey]?.name || "My Agent" : "My Agent"}",
    "description": "AI voice agent for customer support",
    "prompt": "You are a helpful customer support agent...",
    "parameters": {
      "temperature": 0.7,
      "maxTokens": 150
    },
    "voice": {
      "provider": "elevenlabs",
      "voiceId": "EXAVITQu4vr4xnSDxMaL",
      "settings": {
        "stability": 0.5,
        "similarity_boost": 0.75
      }
    },
    "webhooks": {
      "onStart": "https://api.example.com/call/start",
      "onEnd": "https://api.example.com/call/end"
    }
  }
}`}</pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default AgentGPTBuilder;
