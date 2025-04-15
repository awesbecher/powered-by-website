
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Send, Mic, Save, Code, BarChart2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { openaiService } from "@/services/openaiService";
import SavedAgentList from "./voice-agent-builder/SavedAgentList";

const agentTemplates = {
  realEstate: {
    name: "Real Estate Assistant",
    prompt: "You are a helpful real estate assistant. You help users find homes, schedule tours, and answer questions about neighborhoods or pricing. Be friendly, knowledgeable, and concise.",
  },
  saas: {
    name: "SaaS Support Bot",
    prompt: "You are a SaaS product support specialist. You help customers troubleshoot login issues, explore product features, answer questions about pricing, and manage billing inquiries. Be clear, professional, and solution-oriented.",
  },
  retail: {
    name: "Retail Sales Assistant",
    prompt: "You are a retail sales assistant. You guide users to products, check availability, provide quick shopping advice, and answer questions about products. Be helpful, enthusiastic, and focused on customer satisfaction.",
  },
  healthcare: {
    name: "Healthcare Assistant",
    prompt: "You are a healthcare assistant for a medical clinic. You help patients schedule appointments, answer basic health questions, and provide information about services. Be professional, empathetic, and remember patient confidentiality is important.",
  },
  restaurant: {
    name: "Restaurant Booking Agent",
    prompt: "You are a restaurant booking agent. You help customers make reservations, answer questions about the menu, dietary options, and special events. Be friendly, helpful, and make customers feel welcome.",
  },
};

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface LogEntry {
  id?: string;
  timestamp: string;
  event_type: string;
  agent_name: string;
  message: string;
}

const AgentBuilderPro: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [agentName, setAgentName] = useState("");
  const [agentPrompt, setAgentPrompt] = useState("");
  const [brandColor, setBrandColor] = useState("#9b87f5");
  const [greeting, setGreeting] = useState("Hi! I'm your smart assistant");
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [activeTab, setActiveTab] = useState("templates");
  const [savedAgents, setSavedAgents] = useState<any[]>([]);
  const [user, setUser] = useState<{ id: string } | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    };
    
    fetchUser();
    fetchSavedAgents();
    fetchLogs();
  }, []);

  const fetchSavedAgents = async () => {
    try {
      const { data, error } = await supabase
        .from("voice_agents")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      if (data) setSavedAgents(data);
    } catch (error) {
      console.error("Error fetching saved agents:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load your saved agents",
      });
    }
  };

  const fetchLogs = async () => {
    try {
      const { data, error } = await supabase
        .from("gpt_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);
      
      if (error) throw new Error(error.message);
      
      if (data) {
        setLogs(data.map(log => ({
          id: log.id,
          timestamp: new Date(log.created_at).toLocaleString(),
          event_type: log.event,
          agent_name: log.clinic_name || "Unnamed Agent",
          message: log.message || ""
        })));
      }
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  const handleSend = async (inputText: string) => {
    if (!inputText.trim()) return;
    
    const systemMessage = { role: "system" as const, content: agentPrompt };
    const userMessage = { role: "user" as const, content: inputText };
    
    const updatedMessages = messages.length > 0 
      ? [...messages, userMessage] 
      : [systemMessage, userMessage];
      
    setMessages(updatedMessages);
    setUserInput("");
    setLoading(true);

    try {
      const response = await openaiService.generateChatCompletion(updatedMessages, {
        model: "gpt-4o",
        systemPrompt: agentPrompt
      });
      
      if (response.message) {
        setMessages([...updatedMessages, response.message]);
        
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(response.message.content);
          utterance.lang = "en-US";
          window.speechSynthesis.speak(utterance);
        }
      }
      
      await logUsage("message_sent", inputText);
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

  const startVoice = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({
        variant: "destructive",
        title: "Not Supported",
        description: "Voice recognition is not supported in this browser. Try Chrome.",
      });
      return;
    }
    
    setIsListening(true);
    
    const SpeechRecognition = window.webkitSpeechRecognition as unknown as new () => webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    
    recognition.onresult = (event: any) => {
      const speechText = event.results[0][0].transcript;
      handleSend(speechText);
      setIsListening(false);
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
    logUsage("voice_input_start");
  };

  const saveAgent = async () => {
    if (!agentName || !agentPrompt) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please provide both a name and prompt for your agent.",
      });
      return;
    }
    
    try {
      const { data, error } = await supabase.from("voice_agents").insert([
        {
          name: agentName,
          prompt: agentPrompt
        }
      ]).select();
      
      if (error) throw new Error(error.message);
      
      toast({
        title: "Agent Saved",
        description: "Your agent has been saved successfully.",
      });
      
      fetchSavedAgents();
      
      logUsage("agent_saved");
    } catch (error) {
      console.error("Error saving agent:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save your agent. Please try again.",
      });
    }
  };

  const generateEmbedCode = () => {
    const snippet = `
<!-- GPT Agent Widget -->
<div id="gpt-agent-widget"></div>
<script 
  src="https://voice-agent-widget.vercel.app/widget.js"
  data-agent="${agentName}"
  data-lang="en-US"
  data-color="${brandColor}"
  data-welcome="${greeting}"
></script>
    `;
    
    navigator.clipboard.writeText(snippet);
    
    toast({
      title: "Embed Code Copied",
      description: "The widget embed code has been copied to your clipboard.",
    });
    
    logUsage("embed_code_generated");
  };

  const logUsage = async (event: string, message: string = "") => {
    try {
      await supabase.from("gpt_logs").insert([
        {
          event: event,
          message: message || "",
          clinic_name: agentName || "Unnamed Agent",
          user_email: "user@example.com",
        },
      ]);
    } catch (error) {
      console.error("Error logging usage:", error);
    }
  };

  const loadSavedAgent = (agent: any) => {
    setSelectedAgent({name: agent.name, prompt: agent.prompt});
    setAgentName(agent.name);
    setAgentPrompt(agent.prompt);
    setMessages([{ role: "system", content: agent.prompt }]);
    setActiveTab("customize");
    
    toast({
      title: "Agent Loaded",
      description: `Loaded "${agent.name}" successfully.`,
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Card className="border border-white/10 bg-[#1A1F2C] shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="border-b border-white/10 bg-gradient-to-r from-[#2f1c4a] to-[#1a0b2e]">
          <CardTitle className="text-white flex items-center gap-2">
            <span className="bg-[#9b87f5]/20 p-1 rounded-md"><Bot className="h-5 w-5" /></span>
            Voice Agent Builder Pro
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 bg-[#1A1F2C]/80 border border-white/10">
              <TabsTrigger value="templates">
                Agent Templates
              </TabsTrigger>
              <TabsTrigger value="saved">
                Saved Agents
              </TabsTrigger>
              <TabsTrigger value="customize">
                Customize
              </TabsTrigger>
              <TabsTrigger value="test">
                Test Chat
              </TabsTrigger>
              <TabsTrigger value="analytics">
                Analytics
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="templates">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-[#1A1F2C]/60 p-4 rounded-lg">
                {Object.entries(agentTemplates).map(([key, tpl]) => (
                  <div 
                    key={key}
                    onClick={() => {
                      setSelectedAgent(tpl);
                      setAgentName(tpl.name);
                      setAgentPrompt(tpl.prompt);
                      setMessages([]);
                      setActiveTab("customize");
                    }}
                    className="border border-white/10 rounded-lg p-4 cursor-pointer bg-[#1A1F2C]/40 hover:bg-[#2f1c4a]/40 transition-colors"
                  >
                    <h3 className="text-white font-bold">{tpl.name}</h3>
                    <p className="text-gray-300 text-sm mt-2">{tpl.prompt.substring(0, 100)}...</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="saved" className="bg-[#1A1F2C]/60 p-4 rounded-lg">
              {savedAgents.length === 0 ? (
                <div className="text-center col-span-full py-12 bg-[#1A1F2C]/40">
                  <h3 className="text-white text-xl mb-4">No Saved Agents</h3>
                  <p className="text-gray-300 mb-6">You haven't saved any agents yet. Create one from a template to get started.</p>
                  <Button 
                    onClick={() => setActiveTab("templates")} 
                    className="bg-gradient-to-r from-[#9b87f5] to-[#8777e5] hover:from-[#8777e5] hover:to-[#7667d5]"
                  >
                    Browse Templates
                  </Button>
                </div>
              ) : (
                <SavedAgentList 
                  user={user} 
                  onLoadAgent={(agent) => {
                    setAgentName(agent.name);
                    setAgentPrompt(agent.prompt);
                    setSelectedAgent({ name: agent.name, prompt: agent.prompt });
                    setMessages([{ role: "system", content: agent.prompt }]);
                    setActiveTab("customize");
                  }}
                />
              )}
            </TabsContent>
            
            <TabsContent value="customize">
              {selectedAgent ? (
                <div className="space-y-6 bg-[#1A1F2C]/20 p-6 rounded-lg">
                  <div>
                    <label className="block text-white mb-2">Agent Name</label>
                    <Input 
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                      placeholder="Agent Name"
                      className="bg-[#1A1F2C]/40 border-white/20 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">Agent Instructions</label>
                    <Textarea 
                      value={agentPrompt}
                      onChange={(e) => setAgentPrompt(e.target.value)}
                      rows={5}
                      placeholder="Instructions for your agent"
                      className="bg-[#1A1F2C]/40 border-white/20 text-white"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white mb-2">Brand Color</label>
                      <div className="flex items-center">
                        <input
                          type="color"
                          value={brandColor}
                          onChange={(e) => setBrandColor(e.target.value)}
                          className="h-10 w-16 rounded cursor-pointer border-0"
                        />
                        <Input
                          type="text"
                          value={brandColor}
                          onChange={(e) => setBrandColor(e.target.value)}
                          className="ml-4 bg-[#1A1F2C]/40 border-white/20 text-white w-32"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-white mb-2">Greeting Message</label>
                      <Input
                        value={greeting}
                        onChange={(e) => setGreeting(e.target.value)}
                        placeholder="Greeting message"
                        className="bg-[#1A1F2C]/40 border-white/20 text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 flex gap-4">
                    <Button 
                      onClick={saveAgent} 
                      className="bg-gradient-to-r from-[#9b87f5] to-[#8777e5] hover:from-[#8777e5] hover:to-[#7667d5]"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Agent
                    </Button>
                    <Button 
                      onClick={() => setActiveTab("test")} 
                      variant="outline" 
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Test Agent
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-[#1A1F2C]/20 rounded-lg">
                  <h3 className="text-white text-xl mb-4">No Agent Selected</h3>
                  <p className="text-gray-300 mb-6">Please select a template to customize your agent</p>
                  <Button 
                    onClick={() => setActiveTab("templates")} 
                    className="bg-gradient-to-r from-[#9b87f5] to-[#8777e5] hover:from-[#8777e5] hover:to-[#7667d5]"
                  >
                    Select Template
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="test">
              {selectedAgent ? (
                <div className="bg-[#1A1F2C]/20 p-4 rounded-lg">
                  <div className="bg-[#1a0b2e]/40 border border-white/10 rounded-xl p-4 h-[400px] overflow-y-auto mb-4">
                    {messages.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <Bot className="h-12 w-12 text-[#9b87f5]/60 mb-4" />
                        <h3 className="text-white text-lg mb-2">Start Chatting</h3>
                        <p className="text-gray-300">Send a message to test your agent</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {messages.filter(m => m.role !== "system").map((msg, i) => (
                          <div 
                            key={i} 
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div 
                              className={`max-w-[75%] p-3 rounded-2xl ${
                                msg.role === "user" 
                                  ? "bg-[#9b87f5]/30 text-white border border-[#9b87f5]/30" 
                                  : "bg-[#1a0b2e]/60 text-white border border-white/10"
                              }`}
                            >
                              {msg.content}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Type your message..."
                      className="bg-[#1a0b2e]/40 border-white/20 text-white"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey && !loading) {
                          e.preventDefault();
                          handleSend(userInput);
                        }
                      }}
                    />
                    <Button 
                      onClick={() => handleSend(userInput)} 
                      disabled={loading || !userInput.trim()}
                      className="bg-gradient-to-r from-[#9b87f5] to-[#8777e5] hover:from-[#8777e5] hover:to-[#7667d5]"
                    >
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                    <Button
                      onClick={startVoice}
                      disabled={isListening}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      {isListening ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mic className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                  <div className="mt-6 flex gap-4">
                    <Button 
                      onClick={generateEmbedCode} 
                      variant="outline" 
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <Code className="mr-2 h-4 w-4" />
                      Generate Embed Code
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-[#1A1F2C]/20 rounded-lg">
                  <h3 className="text-white text-xl mb-4">No Agent Selected</h3>
                  <p className="text-gray-300 mb-6">Please select and customize an agent before testing</p>
                  <Button 
                    onClick={() => setActiveTab("templates")} 
                    className="bg-gradient-to-r from-[#9b87f5] to-[#8777e5] hover:from-[#8777e5] hover:to-[#7667d5]"
                  >
                    Select Template
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="analytics">
              <div className="bg-[#1A1F2C]/20 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white text-xl">Usage Analytics</h3>
                  <Button 
                    onClick={fetchLogs} 
                    variant="outline" 
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <BarChart2 className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                </div>
                
                <div className="bg-[#1a0b2e]/40 border border-white/10 rounded-xl p-4 h-[400px] overflow-y-auto">
                  {logs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <BarChart2 className="h-12 w-12 text-[#9b87f5]/60 mb-4" />
                      <h3 className="text-white text-lg mb-2">No Analytics Data</h3>
                      <p className="text-gray-300">Usage data will appear here once you start using your agent</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {logs.map((log) => (
                        <div 
                          key={log.id} 
                          className="bg-[#1a0b2e]/60 border border-white/10 rounded-lg p-3 text-sm"
                        >
                          <div className="flex justify-between">
                            <span className="text-[#9b87f5]">{log.event_type}</span>
                            <span className="text-gray-400">{log.timestamp}</span>
                          </div>
                          <div className="mt-1">
                            <span className="text-white">{log.agent_name}</span>
                            {log.message && (
                              <p className="text-gray-300 mt-1">{log.message.substring(0, 100)}{log.message.length > 100 ? '...' : ''}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentBuilderPro;
