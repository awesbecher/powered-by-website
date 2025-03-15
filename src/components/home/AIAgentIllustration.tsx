
import { MessageCircle, Phone, Smartphone, MessageSquare, Bot, Mail, Settings, Plug } from "lucide-react";
import AgentBubble from "./AgentBubble";
import NeuralNetwork from "./NeuralNetwork";
import ConnectingLines from "./ConnectingLines";

const AIAgentIllustration = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto h-[400px] flex items-center justify-center">
      {/* Robot and laptop container */}
      <div className="relative">
        {/* Laptop */}
        <div className="w-96 h-64 bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 rounded-lg backdrop-blur-sm border border-white/10 shadow-xl transform perspective-1000 rotateX-10 overflow-hidden">
          <NeuralNetwork />
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
          position="-top-8 left-0 transform -translate-x-[75%]" 
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
          position="top-28 right-0 transform translate-x-3/4" 
          dotPosition="top-left"
        />
        <AgentBubble 
          title="TASK AGENT" 
          icon={Settings} 
          position="top-28 left-0 transform -translate-x-3/4" 
          dotPosition="top-right"
        />
        <AgentBubble 
          title="API AGENT" 
          icon={Plug} 
          position="top-44 right-0 transform translate-x-1/2" 
          dotPosition="top-left"
        />
        <AgentBubble 
          title="SLACK AGENT" 
          icon={MessageSquare} 
          position="top-44 left-0 transform -translate-x-[50%]" 
          dotPosition="top-right"
        />

        <ConnectingLines />
      </div>
    </div>
  );
};

export default AIAgentIllustration;
