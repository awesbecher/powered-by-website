
import { useState, useRef } from "react";
import { openaiService, ChatMessage } from "@/services/openaiService";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useAgentTester = (agentName: string, agentInstructions: string) => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const initializedRef = useRef(false);

  // Initialize the system message ONLY ONCE, not on every render
  if (agentInstructions && !initializedRef.current) {
    setMessages([{ role: "system", content: agentInstructions }]);
    initializedRef.current = true;
  }

  const handleSendMessage = async () => {
    if (!userInput || !agentInstructions) return;

    const updatedMessages = [...messages, { role: "user" as const, content: userInput }];
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

  return {
    userInput,
    setUserInput,
    messages,
    loading,
    handleSendMessage,
    handleSaveAgent
  };
};
