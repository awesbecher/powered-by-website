
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Message } from "../types";
import { openaiService } from "@/services/openaiService";
import { useAgentVoice } from "./useAgentVoice";

export function useAgentMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { speakText } = useAgentVoice();
  const { toast } = useToast();

  const handleSendMessage = async (text?: string) => {
    // Skip if no template selected (system message should be present)
    if (messages.length === 0) return;
    
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
        systemPrompt: messages[0].content, // Use first system message as prompt
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

  return {
    messages,
    setMessages,
    userInput,
    setUserInput,
    loading,
    handleSendMessage
  };
}
