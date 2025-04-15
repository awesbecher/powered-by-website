
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { openaiService, ChatMessage } from "@/services/openaiService";

// The system prompt for the voice agent builder
const AGENT_BUILDER_SYSTEM_PROMPT = `You are an expert AI voice agent designer. Your job is to help users create custom voice AI agents for their businesses.

Follow these guidelines:
1. Ask users about their business needs and use case for the voice agent
2. Help them define the agent's personality, tone, and specific knowledge it needs
3. Draft detailed instructions for the voice agent that cover how to respond, what knowledge it needs, and limitations
4. Always aim to create agents that are helpful, accurate, and that follow ethical guidelines
5. Explain key voice AI concepts when needed, but focus on practical implementation
6. Be patient and supportive, remembering that users may be new to AI voice technologies

The end goal is to create a complete, usable instruction set for a voice AI agent that aligns with the user's business needs and can be deployed for real-world use.`;

export const useAgentBuilder = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [agentName, setAgentName] = useState("My Voice Agent");
  const [agentInstructions, setAgentInstructions] = useState("");
  const [activeTab, setActiveTab] = useState("instructions");
  const { toast } = useToast();

  // Try to extract potential agent instructions from the assistant's message
  const extractInstructionsFromMessage = (message: string) => {
    // Look for instruction blocks in the message
    const instructionMatches = message.match(/```([\s\S]*?)```/);
    if (instructionMatches && instructionMatches[1]) {
      setAgentInstructions(instructionMatches[1].trim());
    }
  };

  const handleSendMessage = async (message: string): Promise<boolean> => {
    if (!message.trim()) return false;
    
    // Add user message to chat
    const userMessage: ChatMessage = { role: "user", content: message };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Get all messages including the new one
      const currentMessages = [...messages, userMessage];
      
      // Generate response from OpenAI
      const response = await openaiService.generateChatCompletion(currentMessages, {
        systemPrompt: AGENT_BUILDER_SYSTEM_PROMPT,
        temperature: 0.7,
        model: "gpt-4o" // Using the more capable model for better agent creation
      });
      
      // Add assistant message to chat
      setMessages(prevMessages => [...prevMessages, response.message]);
      
      // If this is the first response, suggest a starting point
      if (messages.length === 0 && agentInstructions === "") {
        extractInstructionsFromMessage(response.message.content);
      }
      
      return true;
    } catch (error) {
      console.error("Error generating response:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate a response. Please try again.",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getStarterPrompt = (): string => {
    return "I want to create a voice agent for my business that can handle customer service inquiries. Can you help me design it?";
  };

  return {
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
  };
};
