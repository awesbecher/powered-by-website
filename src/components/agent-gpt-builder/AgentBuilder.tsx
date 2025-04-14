
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { openaiService, ChatMessage } from "@/services/openaiService";
import { 
  Sparkles, 
  Send, 
  Loader2, 
  Bot, 
  Settings, 
  Save, 
  Copy, 
  BrainCircuit, 
  Mic,
  Phone,
  RefreshCcw,
  Download,
  HelpCircle,
  Code2,
  MessageSquare
} from "lucide-react";

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
  const [activeTab, setActiveTab] = useState("instructions");
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

  const downloadInstructions = () => {
    const element = document.createElement("a");
    const file = new Blob([agentInstructions], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${agentName.replace(/\s+/g, '-').toLowerCase()}-instructions.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Downloaded",
      description: "Agent instructions have been downloaded",
    });
  };

  const getStarterPrompt = () => {
    setInputMessage("I want to create a voice agent for my business that can handle customer service inquiries. Can you help me design it?");
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page title and description with improved styling */}
      <div className={`text-center mb-8 transition-all duration-1000 ease-out transform ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#a87cff] bg-clip-text text-transparent mb-4">Build Your Voice AI Agent</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Create a customized voice agent for your business by chatting with our AI assistant.
          Get help designing your agent's personality, knowledge base, and response patterns.
        </p>
      </div>

      {/* Feature bubbles */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {[
          { icon: <Phone className="h-5 w-5" />, text: "Handle Calls 24/7" },
          { icon: <BrainCircuit className="h-5 w-5" />, text: "Custom Knowledge Base" },
          { icon: <MessageSquare className="h-5 w-5" />, text: "Natural Conversations" },
          { icon: <Mic className="h-5 w-5" />, text: "Voice Recognition" }
        ].map((feature, index) => (
          <div 
            key={index} 
            className="flex items-center gap-2 bg-gradient-to-r from-[#2f1c4a]/60 to-[#1a0b2e]/60 px-4 py-2 rounded-full border border-[#9b87f5]/30"
          >
            <span className="text-[#9b87f5]">{feature.icon}</span>
            <span className="text-white text-sm">{feature.text}</span>
          </div>
        ))}
      </div>

      {/* Main content area with improved layout and visual appeal */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 transition-all duration-1000 delay-300 ease-out transform ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
        {/* Left side - Chat interface (wider) */}
        <div className="lg:col-span-7">
          <Card className="h-[700px] bg-gradient-to-br from-[#1A1F2C]/70 to-[#2A2F3C]/70 border border-white/10 shadow-xl overflow-hidden rounded-xl">
            <CardHeader className="bg-gradient-to-r from-[#2f1c4a] to-[#1a0b2e] border-b border-white/10 p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-[#9b87f5]/20 p-2 rounded-full">
                    <Bot className="h-5 w-5 text-[#9b87f5]" />
                  </div>
                  <CardTitle className="text-white text-xl">Voice Agent Builder Assistant</CardTitle>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-white/10" 
                  onClick={getStarterPrompt}
                >
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-gray-300 text-sm mt-2">
                Chat with our AI to design your custom voice agent for your business
              </p>
            </CardHeader>
            
            {/* Messages container with improved styling */}
            <CardContent className="p-5 h-[480px] overflow-y-auto bg-gradient-to-b from-transparent to-[#1a0b2e]/20">
              {messages.length === 0 ? (
                <div className="text-center flex flex-col items-center justify-center h-full">
                  <div className="bg-[#9b87f5]/10 p-4 rounded-full mb-4">
                    <Sparkles className="h-10 w-10 text-[#9b87f5]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Welcome to the Voice Agent Builder!</h3>
                  <p className="text-gray-300 max-w-md mx-auto mb-6">
                    Tell me about your business and what kind of voice agent you'd like to create. 
                    I'll help you design the perfect agent for your needs.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center max-w-md mx-auto">
                    <Button 
                      onClick={() => setInputMessage("I need a voice agent for my healthcare clinic to handle appointment scheduling.")}
                      className="bg-[#1a0b2e] border border-[#9b87f5]/30 hover:bg-[#2f1c4a] text-gray-200"
                      size="sm"
                    >
                      Healthcare Agent
                    </Button>
                    <Button 
                      onClick={() => setInputMessage("I want a voice agent for my restaurant to take reservations and answer menu questions.")}
                      className="bg-[#1a0b2e] border border-[#9b87f5]/30 hover:bg-[#2f1c4a] text-gray-200"
                      size="sm"
                    >
                      Restaurant Agent
                    </Button>
                    <Button 
                      onClick={() => setInputMessage("I need a voice agent for my retail store to handle customer service inquiries.")}
                      className="bg-[#1a0b2e] border border-[#9b87f5]/30 hover:bg-[#2f1c4a] text-gray-200"
                      size="sm"
                    >
                      Retail Agent
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] p-4 rounded-2xl shadow-md ${
                          msg.role === "user"
                            ? "bg-[#9b87f5]/30 text-white border border-[#9b87f5]/30"
                            : "bg-[#1a0b2e]/60 text-white border border-white/10"
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </CardContent>
            
            {/* Input area with improved styling */}
            <CardFooter className="border-t border-white/10 p-4 bg-[#1a0b2e]/30">
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
                  className="min-h-[60px] bg-[#1a0b2e]/40 border-white/20 text-white resize-none focus:border-[#9b87f5]/50 focus:ring-[#9b87f5]/20 rounded-xl"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  className="bg-gradient-to-r from-[#9b87f5] to-[#8777e5] hover:from-[#8777e5] hover:to-[#7667d5] text-white rounded-xl shadow-lg shadow-[#9b87f5]/20"
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
        
        {/* Right side - Agent configuration (narrower) */}
        <div className="lg:col-span-5">
          <Card className="h-[700px] bg-gradient-to-br from-[#1A1F2C]/70 to-[#2A2F3C]/70 border border-white/10 shadow-xl overflow-hidden rounded-xl">
            <CardHeader className="bg-gradient-to-r from-[#2f1c4a] to-[#1a0b2e] border-b border-white/10 p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-[#9b87f5]/20 p-2 rounded-full">
                    <Settings className="h-5 w-5 text-[#9b87f5]" />
                  </div>
                  <CardTitle className="text-white text-xl">Agent Configuration</CardTitle>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-white/10"
                >
                  <RefreshCcw className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-gray-300 text-sm mt-2">
                Define your agent's personality, capabilities, and knowledge
              </p>
            </CardHeader>
            
            <div className="p-5">
              <Tabs 
                defaultValue="instructions" 
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 bg-[#1a0b2e]/40 rounded-xl p-1">
                  <TabsTrigger 
                    value="instructions" 
                    className="rounded-lg data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white"
                  >
                    <Code2 className="h-4 w-4 mr-2" />
                    Instructions
                  </TabsTrigger>
                  <TabsTrigger 
                    value="settings"
                    className="rounded-lg data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="instructions" className="h-[520px]">
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 flex items-center">
                        <Code2 className="h-4 w-4 mr-2 text-[#9b87f5]" />
                        Agent Instructions
                      </label>
                      <Textarea
                        value={agentInstructions}
                        onChange={(e) => setAgentInstructions(e.target.value)}
                        className="h-[430px] bg-[#1a0b2e]/40 border-white/20 text-white resize-none focus:border-[#9b87f5]/50 focus:ring-[#9b87f5]/20 rounded-xl font-mono text-sm"
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
                      <Button 
                        onClick={downloadInstructions}
                        variant="outline" 
                        size="sm"
                        className="bg-transparent border-white/20 text-white hover:bg-white/10"
                      >
                        <Download className="h-4 w-4 mr-2" /> Download
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="settings" className="h-[520px]">
                  <div className="space-y-6 mt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 flex items-center">
                        <Bot className="h-4 w-4 mr-2 text-[#9b87f5]" />
                        Agent Name
                      </label>
                      <Input
                        value={agentName}
                        onChange={(e) => setAgentName(e.target.value)}
                        className="bg-[#1a0b2e]/40 border-white/20 text-white focus:border-[#9b87f5]/50 focus:ring-[#9b87f5]/20 rounded-xl"
                        placeholder="Enter a name for your agent"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 flex items-center">
                        <Mic className="h-4 w-4 mr-2 text-[#9b87f5]" />
                        Voice Type
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Female', 'Male'].map((voiceType) => (
                          <div 
                            key={voiceType}
                            className="bg-[#1a0b2e]/40 border border-white/20 hover:border-[#9b87f5]/50 rounded-xl p-4 cursor-pointer transition-all duration-200 flex items-center justify-center"
                          >
                            <span className="text-white">{voiceType}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 flex items-center">
                        <BrainCircuit className="h-4 w-4 mr-2 text-[#9b87f5]" />
                        AI Model
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Standard', 'Advanced'].map((model, index) => (
                          <div 
                            key={model}
                            className={`${
                              index === 1 ? 'bg-gradient-to-r from-[#1a0b2e]/60 to-[#2f1c4a]/60 border-[#9b87f5]/30' : 'bg-[#1a0b2e]/40 border-white/20'
                            } border hover:border-[#9b87f5]/50 rounded-xl p-4 cursor-pointer transition-all duration-200 flex items-center justify-center`}
                          >
                            <span className="text-white">{model}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Advanced model offers more natural conversations and better domain knowledge</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <CardFooter className="border-t border-white/10 p-5 flex justify-end bg-[#1a0b2e]/20">
              <Button 
                onClick={saveAgent}
                className="bg-gradient-to-r from-[#9b87f5] to-[#8777e5] hover:from-[#8777e5] hover:to-[#7667d5] text-white px-8 rounded-xl shadow-lg shadow-[#9b87f5]/20"
              >
                <Save className="h-5 w-5 mr-2" /> Save Agent
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Bottom section with information */}
      <div className="mt-16 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-4">Deploy Your Voice Agent in Minutes</h2>
        <p className="text-gray-300 mb-8">
          Once you've designed your agent, deploy it to answer calls, schedule appointments,
          and provide information 24/7. No coding required.
        </p>
        <Button className="bg-gradient-to-r from-[#9b87f5] to-[#8777e5] hover:from-[#8777e5] hover:to-[#7667d5] text-white px-8 py-6 rounded-xl text-lg shadow-lg shadow-[#9b87f5]/20">
          Ready to Deploy Your Agent? Contact Us
        </Button>
      </div>
    </div>
  );
};
