
import React from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

interface CallButtonProps {
  isProcessing: boolean;
  isCallActive: boolean;
  onClick: () => void;
}

export const CallButton: React.FC<CallButtonProps> = ({ 
  isProcessing, 
  isCallActive, 
  onClick 
}) => {
  return (
    <Button 
      className="bg-accent hover:bg-accent/90 text-white mb-4 font-bold text-lg mx-auto block px-8 py-4 h-auto whitespace-nowrap flex items-center gap-3"
      onClick={onClick}
      disabled={isProcessing || isCallActive}
    >
      <Phone className="h-6 w-6 flex-shrink-0" />
      {isProcessing ? 'Connecting...' : isCallActive ? 'Call in Progress' : 'Speak to Room Service'}
    </Button>
  );
};
