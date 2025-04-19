
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { openaiService, ChatMessage } from "@/services/openaiService";

export function ChatTester() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: ChatMessage = {
      role: "user",
      content: inputMessage
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    
    try {
      console.log("ChatTester: Sending message to OpenAI service");
      const systemPrompt = "You are a helpful assistant for testing purposes. Keep your answers short and concise.";
      
      const updatedMessages = [...messages, userMessage];
      const response = await openaiService.generateChatCompletion(updatedMessages, {
        systemPrompt,
        model: "gpt-4o-mini", // Using smaller model for faster responses during testing
        temperature: 0.7
      });
      
      console.log("ChatTester: Received response from OpenAI service");
      setMessages(prevMessages => [...prevMessages, response.message]);
      
      toast({
        title: "API Test Successful",
        description: `Used ${response.usage?.total_tokens || 0} tokens`,
      });
    } catch (error) {
      console.error("ChatTester: Error in test message:", error);
      toast({
        variant: "destructive",
        title: "API Test Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-lg mx-auto bg-white shadow-lg">
      <CardHeader className="bg-gray-50">
        <CardTitle className="text-center">OpenAI API Test</CardTitle>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-4 max-h-[300px] overflow-y-auto mb-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No messages yet. Send a message to test the OpenAI integration.
            </div>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-100 ml-8"
                    : "bg-gray-100 mr-8"
                }`}
              >
                <div className="font-semibold text-sm text-gray-700">
                  {msg.role === "user" ? "You" : "AI Assistant"}
                </div>
                <div className="text-gray-800 whitespace-pre-wrap">{msg.content}</div>
              </div>
            ))
          )}
        </div>
      </CardContent>
      
      <CardFooter className="border-t p-4 flex gap-2">
        <Input
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
          placeholder="Type a test message..."
          disabled={isLoading}
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          className="flex-1"
        />
        <Button 
          onClick={handleSendMessage} 
          disabled={isLoading || !inputMessage.trim()}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
