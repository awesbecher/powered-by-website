import React, { useState } from "react";
import { DollarSign, FileText, Shield, Stethoscope, Mic, MicOff, Car, House, Pizza, X, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { initiateVapiCall, stopVapiCall } from "@/services/vapiService";

interface AgentType {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  phoneNumber: string;
  isSelected: boolean;
  assistantId: string;
}

const AssetTest = () => {
  const [agentTypes, setAgentTypes] = useState<AgentType[]>([
    {
      id: "insurance-quote",
      name: "Insurance: Get a Quote",
      icon: DollarSign,
      description: "AI agent for handling insurance quote requests",
      phoneNumber: "+1 (650) 640-1015",
      isSelected: true,
      assistantId: "df42b616-337e-4877-8e9b-44fb0b5a0225"
    },
    {
      id: "auto-dealership",
      name: "Auto Dealership: Take a Test Drive",
      icon: Car,
      description: "Schedule a test drive with our dealership",
      phoneNumber: "+1 (732) 638-0513",
      isSelected: false,
      assistantId: ""
    },
    {
      id: "restaurant-order",
      name: "Restaurant: Order a Pizza",
      icon: Pizza,
      description: "Order delicious pizza for delivery or pickup",
      phoneNumber: "+1 (732) 702-8348",
      isSelected: false,
      assistantId: ""
    },
    {
      id: "real-estate",
      name: "Real Estate: Find a House",
      icon: House,
      description: "Find your dream home with our AI assistant",
      phoneNumber: "+1 (657) 464-2712",
      isSelected: false,
      assistantId: ""
    }
  ]);

  const [isCallActive, setIsCallActive] = useState(false);
  const [showConsentDialog, setShowConsentDialog] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAgentSelect = (selectedId: string) => {
    setAgentTypes(prevTypes => 
      prevTypes.map(agent => ({
        ...agent,
        isSelected: agent.id === selectedId
      }))
    );
  };

  const handleMicClick = () => {
    const selectedAgent = agentTypes.find(agent => agent.isSelected);
    
    if (selectedAgent?.id === "insurance-quote") {
      setShowConsentDialog(true);
    } else {
      setIsCallActive(!isCallActive);
      // In a real implementation, this would initiate the voice assistant based on the selected agent
    }
  };

  const handleCall = async () => {
    setIsLoading(true);
    try {
      const selectedAgent = agentTypes.find(agent => agent.isSelected);
      if (selectedAgent && selectedAgent.assistantId) {
        await initiateVapiCall(selectedAgent.assistantId);
        setIsCallActive(true);
        setShowConsentDialog(false);
        toast({
          title: "Call initiated",
          description: `You are now connected to Alex Fisher from Planter's Insurance.`
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to initiate call",
        description: error instanceof Error ? error.message : "Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndCall = async () => {
    try {
      await stopVapiCall();
      setIsCallActive(false);
      setIsMuted(false);
      toast({
        title: "Call ended",
        description: "Thank you for trying our voice assistant."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to end call",
        description: error instanceof Error ? error.message : "Please try again later."
      });
    }
  };

  const toggleMute = () => {
    // In a real implementation, this would interact with the Vapi SDK to mute/unmute
    setIsMuted(!isMuted);
  };

  const selectedAgent = agentTypes.find(agent => agent.isSelected) || agentTypes[0];

  return (
    <div className="pt-24 min-h-screen bg-[#121212] text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-[#9b87f5] text-center">AI Voice Assistant Demo</h1>
        
        <div className="bg-[#1A1A1A] p-8 rounded-3xl shadow-xl border border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-6 text-[#9b87f5]">Choose Agent Use Case</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {agentTypes.map(agent => (
                  <div
                    key={agent.id}
                    onClick={() => handleAgentSelect(agent.id)}
                    className={`relative cursor-pointer rounded-xl p-4 transition-all duration-300 ${
                      agent.isSelected
                        ? "bg-white text-black border-2 border-[#9b87f5]" 
                        : "bg-[#222222] text-white border border-gray-700 hover:border-[#9b87f5]/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${agent.isSelected ? "bg-[#9b87f5]" : "bg-gray-800"}`}>
                        <agent.icon className={`w-6 h-6 ${agent.isSelected ? "text-white" : "text-[#9b87f5]"}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm sm:text-base">{agent.name}</h3>
                      </div>
                    </div>
                    {agent.isSelected && (
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#9b87f5] rounded-full"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div
                className={`w-32 h-32 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                  isCallActive
                    ? "bg-red-500 animate-pulse"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={handleMicClick}
              >
                <Mic className={`w-12 h-12 ${isCallActive ? "text-white" : "text-black"}`} />
              </div>
              <p className="mt-6 text-center text-gray-300 max-w-xs">
                Click on the mic to try the AI voice agents after you choose the Agent Type on the left.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-4 text-[#9b87f5]">
                  Try {selectedAgent.name} AI
                </h2>
                <p className="text-gray-300 mb-6">
                  Call the number below to interact with our {selectedAgent.name} assistant
                </p>
                <div className="bg-white text-black rounded-full py-3 px-8 font-bold text-xl inline-block">
                  {selectedAgent.phoneNumber}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showConsentDialog} onOpenChange={setShowConsentDialog}>
        <DialogContent className="bg-[#222222] text-white border-gray-800">
          <DialogHeader className="flex flex-row items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage 
                src="/lovable-uploads/156d245d-e750-4ef3-8995-a7ae211eeeee.png"
                alt="Alex Fisher"
                className="object-cover"
              />
              <AvatarFallback>AF</AvatarFallback>
            </Avatar>
            <DialogTitle>Start Voice Chat with Alex Fisher on the Planter's Insurance Team</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4 pt-4">
            <p className="text-gray-300">
              You'll be able to have a voice conversation with Alex directly through your browser. Please ensure your microphone is enabled and your speaker volume is turned on appropriately.
            </p>
            <p className="text-gray-300 text-sm">
              By clicking "Start Voice Chat", you consent to having a voice conversation with the Planter's Insurance team. You can end the conversation at any time.
            </p>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => setShowConsentDialog(false)}
                className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Cancel
              </Button>
              <Button 
                className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
                onClick={handleCall}
                disabled={isLoading}
              >
                {isLoading ? "Initiating call..." : "Start Voice Chat"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isCallActive} onOpenChange={(open) => !open && handleEndCall()}>
        <DialogContent className="bg-white text-black border-gray-200 sm:max-w-md p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold">You are now Connected</h2>
            <button onClick={handleEndCall} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex items-center mb-6">
            <Avatar className="h-16 w-16 mr-4">
              <AvatarImage 
                src="/lovable-uploads/156d245d-e750-4ef3-8995-a7ae211eeeee.png"
                alt="Alex Fisher"
              />
              <AvatarFallback>AF</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-2xl font-bold">Alex Fisher</h3>
              <p className="text-gray-500">Planter's Insurance</p>
            </div>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">Call in progress</h3>
              <div className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                <span>Live</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Your microphone</p>
              <div className="flex items-center">
                <div className="flex space-x-1 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-4 w-1 rounded-full ${i === 0 ? 'bg-black' : i < 3 ? 'bg-gray-400' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">Active</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline"
              onClick={toggleMute}
              className="flex items-center justify-center py-6"
            >
              {isMuted ? <MicOff className="mr-2" /> : <Mic className="mr-2" />}
              {isMuted ? "Unmute" : "Mute"}
            </Button>
            
            <Button 
              variant="destructive"
              onClick={handleEndCall}
              className="flex items-center justify-center py-6"
            >
              <X className="mr-2" />
              End Call
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssetTest;
