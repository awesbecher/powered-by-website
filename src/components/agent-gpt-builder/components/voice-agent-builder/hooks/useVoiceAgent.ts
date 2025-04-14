
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { openaiService } from "@/services/openaiService";
import { AgentTemplate, Message } from "../types";

export function useVoiceAgent() {
  const [selectedTemplate, setSelectedTemplate] = useState<AgentTemplate | null>(null);
  const [editableTemplate, setEditableTemplate] = useState<AgentTemplate | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const { toast } = useToast();

  // Handle template selection from the grid
  const handleTemplateSelect = (key: string, template: AgentTemplate) => {
    setEditableTemplate(template);
  };

  // Launch the agent with current configuration
  const launchAgent = () => {
    if (!editableTemplate) return;
    
    setSelectedTemplate(editableTemplate);
    setMessages([{ role: "system", content: editableTemplate.prompt }]);
    setEditableTemplate(null);
  };

  // Send message to the agent
  const handleSendMessage = async (text?: string) => {
    if (!selectedTemplate) return;
    
    const inputText = text || userInput;
    if (!inputText.trim()) return;
    
    const userMessage = { role: "user" as const, content: inputText };
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
        handleSendMessage(speechText);
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
    if (!editableTemplate) return;
    
    try {
      const { error } = await supabase.from("gpt_logs").insert([
        {
          event: "agent_saved",
          message: editableTemplate.prompt || "",
          clinic_name: editableTemplate.name || "",
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

  return {
    selectedTemplate,
    setSelectedTemplate,
    editableTemplate, 
    setEditableTemplate,
    messages,
    setMessages,
    userInput,
    setUserInput,
    loading,
    isListening,
    selectedLanguage,
    setSelectedLanguage,
    handleTemplateSelect,
    launchAgent,
    handleSendMessage,
    startVoiceInput,
    saveAgent,
    generateEmbedCode,
    generateOpenAPISpec
  };
}
