
import { Button } from "@/components/ui/button";
import { Headset } from "lucide-react";
import { useState, useEffect } from "react";

interface AIReceptionistCardProps {
  handleVoiceChatClick: () => void;
  initialLoad: boolean;
}

export const AIReceptionistCard = ({ handleVoiceChatClick, initialLoad }: AIReceptionistCardProps) => {
  const [animatedText, setAnimatedText] = useState(0);
  
  // Cycle through welcome messages for a dynamic effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedText(prev => (prev + 1) % 3);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const welcomeMessages = [
    "Hello, thank you for calling! How may I assist you today?",
    "I can help you schedule an appointment or answer questions about our services.",
    "Would you like me to check our availability for next week?"
  ];

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-0 bg-gradient-to-r from-[#7100ff]/20 to-[#9b87f5]/20 rounded-3xl blur-lg transform -rotate-3"></div>
      <div className={`relative bg-gradient-to-r from-[#1f1235] to-[#2a1d45] p-6 rounded-2xl border border-[#9b87f5]/30 shadow-xl transition-all duration-1000 delay-300 ease-out transform
        ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-[#7100ff] to-[#9b87f5] rounded-full flex items-center justify-center mr-4">
            <Headset className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">AI Receptionist</h3>
            <p className="text-gray-400 text-sm">Always available, never on break</p>
          </div>
        </div>
        
        <div className="space-y-4 mb-6">
          {welcomeMessages.map((message, index) => (
            <div 
              key={index}
              className={`bg-[#13151a]/80 p-3 rounded-lg transition-all duration-500 ${animatedText === index ? 'opacity-100 scale-100' : 'opacity-60 scale-95'}`}
            >
              <p className="text-gray-300 text-sm">
                "{message}"
              </p>
            </div>
          ))}
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>AI Receptionist is ready</span>
          </div>
          
          <Button 
            className="w-full bg-[#7100ff] hover:bg-[#6342ff] text-white"
            onClick={handleVoiceChatClick}
          >
            Try Demo
          </Button>
          
          <p className="text-xs text-center text-gray-500">No credit card required</p>
        </div>
      </div>
    </div>
  );
};
