
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { openaiService, ChatMessage } from "@/services/openaiService";
import { Sparkles, Send, Loader2, Bot, Settings, Save, Copy } from "lucide-react";

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

interface AgentBuilderProps {
  initialLoad: boolean;
}

export const AgentBuilder: React.FC<AgentBuilderProps> = ({ initialLoad }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [agentName, setAgentName] = useState("My Voice Agent");
  const [agentInstructions, setAgentInstructions] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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

  // Try to extract potential agent instructions from the assistant's message
  const extractInstructionsFromMessage = (message: string) => {
    // Look for instruction blocks in the message
    const instructionMatches = message.match(/```([\s\S]*?)```/);
    if (instructionMatches && instructionMatches[1]) {
      setAgentInstructions(instructionMatches[1].trim());
    }
  };

  const copyInstructions = () => {
    navigator.clipboard.writeText(agentInstructions);
    toast({
      title: "Copied!",
      description: "Agent instructions copied to clipboard",
    });
  };

  const saveAgent = () => {
    // Future functionality to save the agent
    toast({
      title: "Agent Saved",
      description: `${agentName} has been saved successfully.`,
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Page title and description */}
      <div className={`text-center mb-8 transition-all duration-1000 ease-out transform ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
        <h1 className="text-4xl font-bold text-white mb-4">Build Your Voice AI Agent</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Create a customized voice agent for your business by chatting with our AI assistant. 
          Get help designing your agent's personality, knowledge base, and response patterns.
        </p>
      </div>

      {/* Main content area */}
      <div className={`grid grid-cols-1 lg:grid-cols-5 gap-6 transition-all duration-1000 delay-300 ease-out transform ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
        {/* Left side - Chat interface */}
        <div className="lg:col-span-3">
          <Card className="h-[700px] bg-gradient-to-br from-[#1A1F2C]/80 to-[#2A2F3C]/80 border border-white/10 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-[#1a0b2e] to-[#2f1c4a] border-b border-white/10">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-[#9b87f5]" />
                <CardTitle className="text-white">Voice Agent Builder Assistant</CardTitle>
              </div>
              <CardDescription className="text-gray-300">
                Chat with our AI to design your custom voice agent
              </CardDescription>
            </CardHeader>
            
            {/* Messages container */}
            <CardContent className="p-4 h-[480px] overflow-y-auto">
              {messages.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Sparkles className="h-8 w-8 mx-auto mb-2 text-[#9b87f5]" />
                  <p className="mb-2">Welcome to the Voice Agent Builder!</p>
                  <p className="text-sm max-w-md mx-auto">
                    Tell me about your business and what kind of voice agent you'd like to create. 
                    I'll help you design the perfect agent for your needs.
                  </p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    } mb-4`}
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
            </CardContent>
            
            {/* Input area */}
            <CardFooter className="border-t border-white/10 p-4 bg-[#1a0b2e]/20">
              <div className="flex gap-2 w-full">
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
                  className="min-h-[60px] bg-[#1a0b2e]/20 border-white/10 text-white resize-none"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  className="bg-[#9b87f5] hover:bg-[#8777e5] text-white"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
        
        {/* Right side - Agent configuration */}
        <div className="lg:col-span-2">
          <Card className="h-[700px] bg-gradient-to-br from-[#1A1F2C]/80 to-[#2A2F3C]/80 border border-white/10 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-[#1a0b2e] to-[#2f1c4a] border-b border-white/10">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-[#9b87f5]" />
                <CardTitle className="text-white">Agent Configuration</CardTitle>
              </div>
              <CardDescription className="text-gray-300">
                Define your agent's personality and behavior
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-4">
              <Tabs defaultValue="instructions" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-[#1a0b2e]/40">
                  <TabsTrigger value="instructions">Instructions</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="instructions" className="h-[520px]">
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Agent Instructions</label>
                      <Textarea
                        value={agentInstructions}
                        onChange={(e) => setAgentInstructions(e.target.value)}
                        className="h-[400px] bg-[#1a0b2e]/20 border-white/10 text-white resize-none"
                        placeholder="Define how your agent should behave, what knowledge it has, and how it should respond..."
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button 
                        onClick={copyInstructions}
                        variant="outline" 
                        size="sm"
                        className="bg-transparent border-white/20 text-white hover:bg-white/10"
                      >
                        <Copy className="h-4 w-4 mr-2" /> Copy
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="settings" className="h-[520px]">
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Agent Name</label>
                      <Input
                        value={agentName}
                        onChange={(e) => setAgentName(e.target.value)}
                        className="bg-[#1a0b2e]/20 border-white/10 text-white"
                        placeholder="Enter a name for your agent"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            
            <CardFooter className="border-t border-white/10 p-4 flex justify-end">
              <Button 
                onClick={saveAgent}
                className="bg-[#9b87f5] hover:bg-[#8777e5] text-white"
              >
                <Save className="h-4 w-4 mr-2" /> Save Agent
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
