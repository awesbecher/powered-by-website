
import React from "react";
import { Phone, BrainCircuit, MessageSquare, Mic } from "lucide-react";

const FeatureBubbles: React.FC = () => {
  const features = [
    { icon: <Phone className="h-5 w-5" />, text: "Handle Calls 24/7" },
    { icon: <BrainCircuit className="h-5 w-5" />, text: "Custom Knowledge Base" },
    { icon: <MessageSquare className="h-5 w-5" />, text: "Natural Conversations" },
    { icon: <Mic className="h-5 w-5" />, text: "Voice Recognition" }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {features.map((feature, index) => (
        <div 
          key={index} 
          className="flex items-center gap-2 bg-gradient-to-r from-[#2f1c4a]/60 to-[#1a0b2e]/60 px-4 py-2 rounded-full border border-[#9b87f5]/30 transition-all duration-300 transform hover:scale-105 hover:border-[#9b87f5]/50 hover:shadow-md hover:shadow-[#9b87f5]/20 animate-fade-in"
          style={{ animationDelay: `${index * 0.15}s` }}
        >
          <span className="text-[#9b87f5]">{feature.icon}</span>
          <span className="text-white text-sm">{feature.text}</span>
        </div>
      ))}
    </div>
  );
};

export default FeatureBubbles;
