
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, RefreshCcw, Save, Copy, Download, Code2, Bot, Mic, BrainCircuit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AgentConfigPanelProps {
  agentName: string;
  setAgentName: (name: string) => void;
  agentInstructions: string;
  setAgentInstructions: (instructions: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AgentConfigPanel: React.FC<AgentConfigPanelProps> = ({
  agentName,
  setAgentName,
  agentInstructions,
  setAgentInstructions,
  activeTab,
  setActiveTab,
}) => {
  const { toast } = useToast();

  const copyInstructions = () => {
    navigator.clipboard.writeText(agentInstructions);
    toast({
      title: "Copied!",
      description: "Agent instructions copied to clipboard",
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

  const saveAgent = () => {
    // Future functionality to save the agent
    toast({
      title: "Agent Saved",
      description: `${agentName} has been saved successfully.`,
    });
  };

  return (
    <Card className="h-[700px] bg-gradient-to-br from-[#1A1F2C]/70 to-[#2A2F3C]/70 border border-white/10 shadow-xl overflow-hidden rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#9b87f5]/20">
      <CardHeader className="bg-gradient-to-r from-[#2f1c4a] to-[#1a0b2e] border-b border-white/10 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#9b87f5]/20 p-2 rounded-full transition-all duration-300 hover:bg-[#9b87f5]/30 transform hover:scale-105">
              <Settings className="h-5 w-5 text-[#9b87f5]" />
            </div>
            <CardTitle className="text-white text-xl">Agent Configuration</CardTitle>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <RefreshCcw className="h-4 w-4 transition-transform duration-300 hover:rotate-180" />
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
              className="rounded-lg data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white transition-all duration-200"
            >
              <Code2 className="h-4 w-4 mr-2" />
              Instructions
            </TabsTrigger>
            <TabsTrigger 
              value="settings"
              className="rounded-lg data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white transition-all duration-200"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="instructions" className="h-[520px] animate-fade-in">
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center">
                  <Code2 className="h-4 w-4 mr-2 text-[#9b87f5]" />
                  Agent Instructions
                </label>
                <Textarea
                  value={agentInstructions}
                  onChange={(e) => setAgentInstructions(e.target.value)}
                  className="h-[430px] bg-[#1a0b2e]/40 border-white/20 text-white resize-none focus:border-[#9b87f5]/50 focus:ring-[#9b87f5]/20 rounded-xl font-mono text-sm transition-all duration-200"
                  placeholder="Define how your agent should behave, what knowledge it has, and how it should respond..."
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button 
                  onClick={copyInstructions}
                  variant="outline" 
                  size="sm"
                  className="bg-transparent border-white/20 text-white hover:bg-white/10 transition-all duration-200 transform hover:scale-105"
                >
                  <Copy className="h-4 w-4 mr-2" /> Copy
                </Button>
                <Button 
                  onClick={downloadInstructions}
                  variant="outline" 
                  size="sm"
                  className="bg-transparent border-white/20 text-white hover:bg-white/10 transition-all duration-200 transform hover:scale-105"
                >
                  <Download className="h-4 w-4 mr-2" /> Download
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="h-[520px] animate-fade-in">
            <div className="space-y-6 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center">
                  <Bot className="h-4 w-4 mr-2 text-[#9b87f5]" />
                  Agent Name
                </label>
                <Input
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="bg-[#1a0b2e]/40 border-white/20 text-white focus:border-[#9b87f5]/50 focus:ring-[#9b87f5]/20 rounded-xl transition-all duration-200"
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
                      className="bg-[#1a0b2e]/40 border border-white/20 hover:border-[#9b87f5]/50 rounded-xl p-4 cursor-pointer transition-all duration-200 transform hover:-translate-y-1 hover:shadow-md flex items-center justify-center"
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
                      } border hover:border-[#9b87f5]/50 rounded-xl p-4 cursor-pointer transition-all duration-200 transform hover:-translate-y-1 hover:shadow-md flex items-center justify-center`}
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
          className="bg-gradient-to-r from-[#9b87f5] to-[#8777e5] hover:from-[#8777e5] hover:to-[#7667d5] text-white px-8 rounded-xl shadow-lg shadow-[#9b87f5]/20 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          <Save className="h-5 w-5 mr-2" /> Save Agent
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AgentConfigPanel;
