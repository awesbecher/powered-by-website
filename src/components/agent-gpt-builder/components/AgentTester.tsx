
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { openaiService } from "@/services/openaiService";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Copy, Download, FileJson, ExternalLink } from "lucide-react";

interface AgentTesterProps {
  agentName: string;
  agentInstructions: string;
}

const AgentTester: React.FC<AgentTesterProps> = ({ agentName, agentInstructions }) => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "system" | "user" | "assistant"; content: string }>>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Reset messages when agent instructions change
  useEffect(() => {
    if (agentInstructions) {
      setMessages([{ role: "system", content: agentInstructions }]);
    }
  }, [agentInstructions]);

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

  const handleCopyPrompt = () => {
    const exportData = {
      model: "gpt-4o",
      messages: [
        { role: "system", content: agentInstructions },
        { role: "user", content: "Can you help me with a customer inquiry?" },
      ],
    };
    navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
    toast({
      title: "Copied to clipboard",
      description: "Agent prompt has been copied to clipboard.",
    });
  };

  const handleDownloadPrompt = () => {
    const exportData = {
      model: "gpt-4o",
      messages: [
        { role: "system", content: agentInstructions },
        { role: "user", content: "Can you help me with a customer inquiry?" },
      ],
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${agentName.replace(/\s+/g, '-')}-prompt.json`;
    a.click();
  };

  const handleDownloadOpenAPISpec = () => {
    const yaml = `openapi: 3.1.0
info:
  title: ${agentName} Agent API
  description: Auto-generated OpenAPI spec for your custom GPT agent
  version: 1.0.0
servers:
  - url: https://api.openai.com/v1
paths:
  /chat/completions:
    post:
      operationId: sendMessageTo${agentName.replace(/\s+/g, '')}
      summary: Send a message to the ${agentName} GPT agent
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [model, messages]
              properties:
                model:
                  type: string
                  example: gpt-4o
                messages:
                  type: array
                  items:
                    type: object
                    properties:
                      role:
                        type: string
                        enum: [system, user, assistant]
                      content:
                        type: string
                  example:
                    - role: system
                      content: "${agentInstructions.replace(/"/g, "'")}"
                    - role: user
                      content: "Hello"
      responses:
        '200':
          description: Assistant response
          content:
            application/json:
              schema:
                type: object
                properties:
                  choices:
                    type: array
                    items:
                      type: object
                      properties:
                        message:
                          type: object
                          properties:
                            role:
                              type: string
                            content:
                              type: string
security:
  - BearerAuth: []
components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer`;

    const blob = new Blob([yaml], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${agentName.replace(/\s+/g, '-')}-OpenAPI.yaml`;
    a.click();
  };

  // Function to save agent to Supabase (will require authentication)
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

  return (
    <Card className="border border-white/10 bg-gradient-to-br from-[#1a0b2e]/70 to-[#2f1c4a]/70 shadow-xl rounded-xl overflow-hidden animate-fade-in" style={{ animationDelay: '0.7s' }}>
      <CardHeader className="border-b border-white/10 bg-gradient-to-r from-[#2f1c4a] to-[#1a0b2e]">
        <CardTitle className="text-white flex items-center gap-2">
          <span className="bg-[#9b87f5]/20 p-1 rounded-md">🧪</span>
          Test Your Agent
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        {messages.length > 1 ? (
          <div className="bg-[#1a0b2e]/40 rounded-xl p-4 mb-6 max-h-[300px] overflow-y-auto border border-white/10">
            {messages.map((msg, idx) => {
              // Skip the system message in the display
              if (msg.role === "system") return null;
              
              return (
                <div 
                  key={idx} 
                  className={`mb-3 p-3 rounded-lg ${
                    msg.role === "user" 
                      ? "bg-[#9b87f5]/20 ml-8 mr-2 border border-[#9b87f5]/20" 
                      : "bg-[#1a0b2e]/60 mr-8 ml-2 border border-white/5"
                  } animate-fade-in`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="text-sm text-gray-400 mb-1">
                    {msg.role === "user" ? "You" : "Agent"}
                  </div>
                  <div className="text-white whitespace-pre-wrap">{msg.content}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center my-6 text-gray-400">
            <p>Start testing your voice agent by sending a message below.</p>
            <p className="text-sm mt-2">Your agent will respond based on the instructions you've provided.</p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Textarea
            placeholder="Ask your agent a question..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="bg-[#1a0b2e]/40 border-white/10 text-white resize-none min-h-[80px]"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          
          <Button 
            onClick={handleSendMessage} 
            disabled={loading || !userInput.trim() || !agentInstructions}
            className="bg-gradient-to-r from-[#9b87f5] to-[#8777e5] hover:from-[#8777e5] hover:to-[#7667d5] text-white shadow-lg shadow-[#9b87f5]/20"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            {loading ? "Generating response..." : "Test Your Agent"}
          </Button>
        </div>
        
        <div className="mt-10">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="bg-[#9b87f5]/20 p-1 rounded-md">🚀</span>
            Deploy Your Agent
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Button 
              variant="outline" 
              className="bg-[#1a0b2e]/60 border-white/10 text-white hover:bg-[#2f1c4a]/60 flex items-center justify-center gap-2"
              onClick={handleCopyPrompt}
            >
              <Copy size={16} />
              Copy Prompt JSON
            </Button>
            
            <Button 
              variant="outline"
              className="bg-[#1a0b2e]/60 border-white/10 text-white hover:bg-[#2f1c4a]/60 flex items-center justify-center gap-2"
              onClick={handleDownloadPrompt}
            >
              <Download size={16} />
              Download JSON
            </Button>
            
            <Button 
              variant="outline"
              className="bg-[#1a0b2e]/60 border-white/10 text-white hover:bg-[#2f1c4a]/60 flex items-center justify-center gap-2"
              onClick={handleDownloadOpenAPISpec}
            >
              <FileJson size={16} />
              Export OpenAPI
            </Button>
            
            <Button 
              variant="outline"
              className="bg-[#1a0b2e]/60 border-white/10 text-white hover:bg-[#2f1c4a]/60 flex items-center justify-center gap-2"
              onClick={handleSaveAgent}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Save Agent
            </Button>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2 mt-6">
            <span className="bg-[#9b87f5]/20 p-1 rounded-md">🔗</span>
            External Platforms
          </h3>
          
          <div className="grid grid-cols-1 gap-3">
            <a 
              href={`https://platform.openai.com/playground?mode=chat&model=gpt-4o&prompt=${encodeURIComponent(agentInstructions)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#9b87f5] hover:text-[#a87cff] transition-colors"
            >
              <ExternalLink size={16} />
              Open in OpenAI Playground
            </a>
            
            <a 
              href="https://chat.openai.com/gpts/editor" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#9b87f5] hover:text-[#a87cff] transition-colors"
            >
              <ExternalLink size={16} />
              Add to Custom GPT
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentTester;
