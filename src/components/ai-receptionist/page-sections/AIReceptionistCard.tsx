
import { Button } from "@/components/ui/button";
import { Headset } from "lucide-react";

interface AIReceptionistCardProps {
  handleVoiceChatClick: () => void;
  initialLoad: boolean;
}

export const AIReceptionistCard = ({ handleVoiceChatClick, initialLoad }: AIReceptionistCardProps) => {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-0 bg-gradient-to-r from-[#7100ff]/20 to-[#9b87f5]/20 rounded-3xl blur-lg transform -rotate-6"></div>
      <div className={`relative bg-gradient-to-r from-[#1f1235] to-[#2a1d45] p-6 rounded-2xl border border-[#9b87f5]/30 shadow-xl transition-all duration-1000 delay-300 ease-out transform
        ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#7100ff] to-[#9b87f5] rounded-full flex items-center justify-center mr-4">
            <Headset className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">AI Receptionist</h3>
            <p className="text-gray-400 text-sm">24/7 Availability</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="bg-[#13151a]/80 p-3 rounded-lg">
            <p className="text-gray-300 text-sm">
              "Hello, thank you for calling! How may I assist you today?"
            </p>
          </div>
          
          <div className="bg-[#13151a]/80 p-3 rounded-lg">
            <p className="text-gray-300 text-sm">
              "I can help you schedule an appointment or answer questions about our services."
            </p>
          </div>
          
          <div className="bg-[#13151a]/80 p-3 rounded-lg">
            <p className="text-gray-300 text-sm">
              "Would you like me to check our availability for next week?"
            </p>
          </div>
        </div>
        
        <Button 
          className="w-full mt-4 bg-[#7100ff] hover:bg-[#6342ff] text-white"
          onClick={handleVoiceChatClick}
        >
          Try Demo
        </Button>
      </div>
    </div>
  );
};
