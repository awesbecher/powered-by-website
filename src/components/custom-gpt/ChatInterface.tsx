
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { openaiService, ChatMessage } from "@/services/openaiService";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Send, Loader2 } from "lucide-react";

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // System prompt for the custom GPT
  const systemPrompt = `You are an AI voice agent assistant built into a web application.
Your purpose is to help users understand how to set up and use AI voice agents.
You have extensive knowledge about voice AI technology, customer service automation, appointment scheduling,
and how AI can enhance business communications. Be friendly, helpful, and concise in your responses.`;

  // Scroll to bottom of messages whenever they update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Add user message to chat
    const userMessage: ChatMessage = { role: "user", content: inputMessage };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Get all messages including the new one
      const currentMessages = [...messages, userMessage];
      
      // Generate response from OpenAI
      const response = await openaiService.generateChatCompletion(currentMessages, {
        systemPrompt: systemPrompt,
        temperature: 0.7
      });
      
      // Add assistant message to chat
      setMessages(prevMessages => [...prevMessages, response.message]);
    } catch (error) {
      console.error("Error generating response:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate a response. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto border border-white/10 rounded-lg overflow-hidden bg-gradient-to-br from-[#1A1F2C]/80 to-[#2A2F3C]/80 shadow-lg">
      {/* Chat header */}
      <div className="bg-gradient-to-r from-[#1a0b2e] to-[#2f1c4a] p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#9b87f5]" />
          <h2 className="text-xl font-bold text-white">Voice Agent Assistant</h2>
        </div>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Sparkles className="h-8 w-8 mx-auto mb-2 text-[#9b87f5]" />
            <p>Ask me anything about voice agents and AI assistants!</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === "user"
                    ? "bg-[#9b87f5]/20 text-white"
                    : "bg-[#1a0b2e]/40 text-white"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="p-4 border-t border-white/10 bg-[#1a0b2e]/20">
        <div className="flex gap-2">
          <Textarea
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="min-h-[60px] bg-[#1a0b2e]/20 border-white/10 text-white"
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="bg-[#9b87f5] hover:bg-[#8777e5] text-white"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};
