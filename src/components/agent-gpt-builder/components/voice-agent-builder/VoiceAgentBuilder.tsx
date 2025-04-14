
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { openaiService, ChatMessage } from "@/services/openaiService";
import { supabase } from "@/integrations/supabase/client";
import VoiceAgentTemplates from "./VoiceAgentTemplates";
import AgentEditor from "./AgentEditor";
import AgentChat from "./AgentChat";
import { AgentTemplate, Message } from "./types";

// Agent templates for different industries
const agentTemplates = {
  auto: { 
    name: "Auto Sales", 
    prompt: "You help users find the perfect car based on preferences and budget." 
  },
  saas: { 
    name: "SaaS Support", 
    prompt: "You provide friendly onboarding and troubleshooting for a SaaS product." 
  },
  hospitality: { 
    name: "Hotel Concierge", 
    prompt: "You assist hotel guests with local recs, bookings, and questions." 
  },
  restaurants: { 
    name: "Restaurant Host", 
    prompt: "You help customers book tables and explain menu options." 
  },
  realEstate: { 
    name: "Real Estate Assistant", 
    prompt: "You help users find homes, schedule tours, and answer questions." 
  },
  b2b: { 
    name: "B2B Lead Qualifier", 
    prompt: "You qualify leads by asking about their business, size, and needs." 
  },
  retail: { 
    name: "Retail Chatbot", 
    prompt: "You help customers find products, check stock, and offer suggestions." 
  },
  events: { 
    name: "Event Concierge", 
    prompt: "You help attendees find schedules, speakers, and live updates." 
  },
  education: { 
    name: "Education Advisor", 
    prompt: "You guide students through admissions, programs, and requirements." 
  },
  finance: { 
    name: "Finance Q&A", 
    prompt: "You answer questions about financial products and services." 
  },
  hr: { 
    name: "HR Assistant", 
    prompt: "You help employees with onboarding, benefits, and policies." 
  },
  multilingual: { 
    name: "Multilingual Support", 
    prompt: "You assist customers across multiple languages." 
  },
};

interface VoiceAgentBuilderProps {
  onSelectTemplate?: (template: AgentTemplate) => void;
}

const VoiceAgentBuilder: React.FC<VoiceAgentBuilderProps> = ({ onSelectTemplate }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<AgentTemplate | null>(null);
  const [editableTemplate, setEditableTemplate] = useState<AgentTemplate | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US"); 
  const { toast } = useToast();

  // Handle template selection from the grid
  const handleTemplateSelect = (key: string) => {
    const template = agentTemplates[key as keyof typeof agentTemplates];
    setEditableTemplate(template);
    
    if (onSelectTemplate) {
      onSelectTemplate(template);
    }
  };

  // Launch the agent with current configuration
  const launchAgent = () => {
    if (!editableTemplate) return;
    
    setSelectedTemplate(editableTemplate);
    setMessages([{ role: "system", content: editableTemplate.prompt }]);
    setEditableTemplate(null);
  };

  // Send message to the agent
  const handleSendMessage = async () => {
    if (!userInput.trim() || !selectedTemplate) return;
    
    const userMessage = { role: "user" as const, content: userInput };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setUserInput("");
    setLoading(true);

    try {
      const response = await openaiService.generateChatCompletion(updatedMessages, {
        model: "gpt-4o",
        systemPrompt: selectedTemplate.prompt,
      });
      
      const aiMessage = response.message;
      setMessages([...updatedMessages, aiMessage]);
      speakText(aiMessage.content);
    } catch (error) {
      console.error("Error generating response:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate a response. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Convert response text to speech
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage;
      
      // Improved voice selection if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.lang === utterance.lang && (voice.name.includes("Google") || voice.name.includes("Natural"))
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    }
  };

  // Start voice input (speech-to-text)
  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({
        variant: "destructive",
        title: "Not Supported",
        description: "Speech recognition is not supported in this browser. Try Chrome.",
      });
      return;
    }
    
    setIsListening(true);
    
    // @ts-ignore - webkitSpeechRecognition is not in the TypeScript types
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = selectedLanguage;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const speechText = event.results[0][0].transcript;
      setUserInput(speechText);
      setTimeout(() => {
        handleSendMessage();
      }, 100);
    };

    recognition.onerror = (err: any) => {
      console.error("Speech recognition error", err);
      toast({
        variant: "destructive",
        title: "Voice Error",
        description: `Error: ${err.error}. Please try again.`,
      });
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Save agent to Supabase
  const saveAgent = async () => {
    try {
      const { error } = await supabase.from("gpt_logs").insert([
        {
          event: "agent_saved",
          message: editableTemplate?.prompt || "",
          clinic_name: editableTemplate?.name || "",
          user_email: selectedLanguage, // Using this field to store the language
        },
      ]);
      
      if (error) {
        throw new Error(error.message);
      }
      
      toast({
        title: "Agent saved",
        description: "Your voice agent has been saved successfully.",
      });
    } catch (error) {
      console.error("Error saving agent:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save agent. You may need to login first.",
      });
    }
  };

  // Generate embed code for the agent
  const generateEmbedCode = () => {
    if (!selectedTemplate) return;
    
    const code = `
<!-- GPT Agent Widget -->
<div id="gpt-agent-widget"></div>
<script src="https://voice-agent-widget.vercel.app/widget.js" data-agent="${selectedTemplate.name}" data-lang="${selectedLanguage}"></script>
`;
    
    navigator.clipboard.writeText(code);
    toast({
      title: "Embed code copied",
      description: "The widget embed code has been copied to your clipboard.",
    });
  };

  // Generate OpenAPI specification file
  const generateOpenAPISpec = () => {
    if (!selectedTemplate) return;
    
    const yaml = `openapi: 3.1.0
info:
  title: ${selectedTemplate.name} API
  version: 1.0.0
servers:
  - url: https://api.openai.com/v1
paths:
  /chat/completions:
    post:
      operationId: sendMessageTo${selectedTemplate.name.replace(/\s+/g, "")}
      summary: Send message to GPT agent
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                model:
                  type: string
                  example: gpt-4o
                messages:
                  type: array
                  items:
                    type: object
                    properties:
                      role:
                        type: string
                      content:
                        type: string
      responses:
        '200':
          description: GPT response
components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
security:
  - BearerAuth: []`;

    const blob = new Blob([yaml], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedTemplate.name}-OpenAPI.yaml`;
    a.click();
    
    toast({
      title: "OpenAPI spec downloaded",
      description: "The OpenAPI specification file has been downloaded.",
    });
  };

  return (
    <Card className="border border-white/10 bg-gradient-to-br from-[#1a0b2e]/70 to-[#2f1c4a]/70 shadow-xl rounded-xl overflow-hidden animate-fade-in" style={{ animationDelay: '0.7s' }}>
      <CardHeader className="border-b border-white/10 bg-gradient-to-r from-[#2f1c4a] to-[#1a0b2e]">
        <CardTitle className="text-white flex items-center gap-2">
          <span className="bg-[#9b87f5]/20 p-1 rounded-md">🎙️</span>
          Voice GPT Agent Builder
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* Template selection grid */}
        {!selectedTemplate && !editableTemplate && (
          <VoiceAgentTemplates 
            agentTemplates={agentTemplates} 
            onSelectTemplate={handleTemplateSelect}
          />
        )}
        
        {/* Agent editor */}
        {editableTemplate && (
          <AgentEditor
            editableTemplate={editableTemplate}
            setEditableTemplate={setEditableTemplate}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            onLaunchAgent={launchAgent}
            onSaveAgent={saveAgent}
          />
        )}
        
        {/* Agent chat interface */}
        {selectedTemplate && (
          <AgentChat 
            selectedTemplate={selectedTemplate}
            messages={messages}
            userInput={userInput}
            setUserInput={setUserInput}
            loading={loading}
            isListening={isListening}
            onSendMessage={handleSendMessage}
            onStartVoiceInput={startVoiceInput}
            onGenerateEmbedCode={generateEmbedCode}
            onGenerateOpenAPISpec={generateOpenAPISpec}
            onBack={() => setSelectedTemplate(null)}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceAgentBuilder;
