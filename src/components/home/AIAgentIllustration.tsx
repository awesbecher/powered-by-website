
import { MessageCircle, Phone, Smartphone, MessageSquare, Bot, Mail, Settings, Plug } from "lucide-react";
import AgentBubble from "./AgentBubble";
import NeuralNetwork from "./NeuralNetwork";
import ConnectingLines from "./ConnectingLines";

const AIAgentIllustration = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto h-[500px] flex items-center justify-center">
      {/* Robot and laptop container */}
      <div className="relative">
        {/* Laptop */}
        <div className="w-64 h-48 bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 rounded-lg backdrop-blur-sm border border-white/10 shadow-xl transform perspective-1000 rotateX-10 overflow-hidden">
          <NeuralNetwork />
        </div>

        {/* Robot head */}
        <div className="absolute -top-32 left-1/2 transform -translate-x-1/2">
          <div className="w-24 h-24 bg-gradient-to-br from-[#9b87f5] to-[#7a6cc5] rounded-2xl relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-6 bg-black rounded-full overflow-hidden">
                <div className="w-full h-full flex items-center justify-center gap-4">
                  <div className="w-2 h-2 bg-[#61dafb] rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-[#61dafb] rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Bubbles */}
        <AgentBubble 
          title="CHAT AGENT" 
          icon={MessageCircle} 
          position="top-12 right-0 transform translate-x-3/4" 
          dotPosition="top-left"
        />
        <AgentBubble 
          title="VOICE AGENT" 
          icon={Phone} 
          position="-top-8 left-0 transform -translate-x-full" 
          dotPosition="bottom-right"
        />
        <AgentBubble 
          title="SMS AGENT" 
          icon={Smartphone} 
          position="top-12 left-0 transform -translate-x-3/4" 
          dotPosition="top-right"
        />
        <AgentBubble 
          title="EMAIL AGENT" 
          icon={Mail} 
          position="top-32 right-0 transform translate-x-full" 
          dotPosition="top-left"
        />
        <AgentBubble 
          title="TASK AGENT" 
          icon={Settings} 
          position="top-32 left-0 transform -translate-x-3/4" 
          dotPosition="top-right"
        />
        <AgentBubble 
          title="API AGENT" 
          icon={Plug} 
          position="top-52 right-0 transform translate-x-1/2" 
          dotPosition="top-left"
        />
        <AgentBubble 
          title="SLACK AGENT" 
          icon={MessageSquare} 
          position="top-52 left-0 transform -translate-x-3/4" 
          dotPosition="top-right"
        />

        <ConnectingLines />
      </div>
    </div>
  );
};

export default AIAgentIllustration;

