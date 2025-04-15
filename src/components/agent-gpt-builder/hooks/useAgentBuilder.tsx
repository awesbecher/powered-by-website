
import { useState } from 'react';

export const useAgentBuilder = () => {
  const [agentName, setAgentName] = useState("");
  const [agentType, setAgentType] = useState("customer-service");
  const [agentPrompt, setAgentPrompt] = useState("");
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isConfiguring, setIsConfiguring] = useState(false);

  const handleSendMessage = async (message: string, checkLimitFn?: () => boolean) => {
    // Check if the user has reached their message limit
    if (checkLimitFn && !checkLimitFn()) {
      return;
    }

    // Clear input and add user message to chat
    setInputMessage("");
    const userMessage = { role: 'user' as const, content: message };
    setMessages((prev) => [...prev, userMessage]);
    
    setIsLoading(true);
    
    try {
      // Generate AI response
      setTimeout(() => {
        // Simulate AI response
        const responses: { [key: string]: string } = {
          "customer-service": "I'm here to help with your customer service needs! How can I assist you today?",
          "sales": "Thanks for your interest in our products! I'd be happy to help you find what you're looking for.",
          "technical-support": "I'm your technical support assistant. What issue are you experiencing? I'll do my best to troubleshoot it with you.",
          "general": "Hello! I'm your AI assistant. How may I help you today?"
        };
        
        const baseResponse = responses[agentType] || "I'm your AI assistant. How may I help you today?";
        
        // Add some response variety based on the user's message
        let aiResponse = baseResponse;
        
        if (message.toLowerCase().includes("pricing")) {
          aiResponse = "Our pricing plans start at $29/month for basic features. Premium plans with all features are available for $99/month. Would you like more details about what's included in each plan?";
        } else if (message.toLowerCase().includes("problem") || message.toLowerCase().includes("issue")) {
          aiResponse = "I'm sorry to hear you're having trouble. Could you please describe the issue in more detail so I can better assist you?";
        } else if (message.toLowerCase().includes("thank")) {
          aiResponse = "You're very welcome! Is there anything else I can help you with today?";
        }
        
        const assistantMessage = { role: 'assistant' as const, content: aiResponse };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error generating response:', error);
      setMessages((prev) => [...prev, { role: 'assistant', content: "I'm sorry, I encountered an error processing your request." }]);
      setIsLoading(false);
    }
  };

  // Helper function to get starter prompts based on agent type
  const getStarterPrompt = (agentType: string): string => {
    const starterPrompts: Record<string, string> = {
      "customer-service": "Can you help me with my recent order?",
      "sales": "What products would you recommend for my small business?",
      "technical-support": "I'm having trouble connecting to the service.",
      "general": "Tell me about your company's services."
    };
    
    return starterPrompts[agentType] || "How can you help me?";
  };

  return {
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
  };
};
