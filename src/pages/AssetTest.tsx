import React, { useState } from "react";
import { DollarSign, FileText, Shield, Stethoscope, Mic, Car, House, Pizza } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AgentType {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  phoneNumber: string;
  isSelected: boolean;
}

const AssetTest = () => {
  const [agentTypes, setAgentTypes] = useState<AgentType[]>([
    {
      id: "insurance-quote",
      name: "Insurance: Get a Quote!",
      icon: DollarSign,
      description: "AI agent for handling insurance quote requests",
      phoneNumber: "+1 (650) 640-1015",
      isSelected: true
    },
    {
      id: "auto-dealership",
      name: "Auto Dealership: Take a Test Drive",
      icon: Car,
      description: "Schedule a test drive with our dealership",
      phoneNumber: "+1 (732) 638-0513",
      isSelected: false
    },
    {
      id: "restaurant-order",
      name: "Restaurant: Order a Pizza",
      icon: Pizza,
      description: "Order delicious pizza for delivery or pickup",
      phoneNumber: "+1 (732) 702-8348",
      isSelected: false
    },
    {
      id: "real-estate",
      name: "Real Estate: Find a House",
      icon: House,
      description: "Find your dream home with our AI assistant",
      phoneNumber: "+1 (657) 464-2712",
      isSelected: false
    }
  ]);

  const [isCallActive, setIsCallActive] = useState(false);

  const handleAgentSelect = (selectedId: string) => {
    setAgentTypes(prevTypes => 
      prevTypes.map(agent => ({
        ...agent,
        isSelected: agent.id === selectedId
      }))
    );
  };

  const handleMicClick = () => {
    setIsCallActive(!isCallActive);
    // In a real implementation, this would initiate the voice assistant based on the selected agent
  };

  const selectedAgent = agentTypes.find(agent => agent.isSelected) || agentTypes[0];

  return (
    <div className="pt-24 min-h-screen bg-[#121212] text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-[#9b87f5] text-center">AI Voice Assistant Demo</h1>
        
        <div className="bg-[#1A1A1A] p-8 rounded-3xl shadow-xl border border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left section - Agent Type Selection */}
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

            {/* Middle section - Microphone */}
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
              <Button 
                variant="outline" 
                className="mt-8 border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10"
              >
                Explore More
              </Button>
            </div>

            {/* Right section - Phone Number */}
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
    </div>
  );
};

export default AssetTest;
