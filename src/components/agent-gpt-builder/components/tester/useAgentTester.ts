import { useState, useRef } from "react";
import { openaiService, ChatMessage } from "@/services/openaiService";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useAgentTester = (agentName: string, agentInstructions: string) => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  // Initialize messages once on first render
  const initialized = useRef(false);
  if (!initialized.current && agentInstructions) {
    initialized.current = true;
    setMessages([{ role: "system", content: agentInstructions }]);
  }

  const handleSendMessage = async () => {
    if (!userInput || !agentInstructions) return;

    const userMessage: ChatMessage = { role: "user", content: userInput };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setUserInput("");
    setLoading(true);

    try {
      // Generate response using our existing OpenAI service
      const response = await openaiService.generateChatCompletion(updatedMessages, {
        model: "gpt-4o",
        systemPrompt: agentInstructions,
      });
      
      setMessages([...updatedMessages, response.message]);
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

  const handleSaveAgent = async () => {
    try {
      const { error } = await supabase.from("gpt_logs").insert([
        {
          event: "agent_saved",
          message: agentInstructions,
          clinic_name: agentName,
        },
      ]);
      
      if (error) {
        throw new Error(error.message);
      }
      
      toast({
        title: "Agent saved",
        description: "Your agent has been saved successfully.",
      });
    } catch (error) {
      console.error("Error saving agent:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save agent. You may need to login or create the required database table.",
      });
    }
  };

  // Method to update the system message when instructions change
  const updateInstructions = (newInstructions: string) => {
    if (!newInstructions) return;
    
    setMessages(prev => {
      // If we have messages and the first one is a system message
      if (prev.length > 0 && prev[0].role === "system") {
        return [{ role: "system", content: newInstructions }, ...prev.slice(1)];
      }
      // Otherwise create a new system message
      return [{ role: "system", content: newInstructions }, ...prev];
    });
  };

  return {
    userInput,
    setUserInput,
    messages,
    setMessages,
    loading,
    handleSendMessage,
    handleSaveAgent,
    updateInstructions
  };
};
