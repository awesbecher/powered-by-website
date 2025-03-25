
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PoweredByText } from "@/components/shared/PoweredByText";

interface CTACardProps {
  initialLoad: boolean;
  handleGetStarted: () => void;
}

export const CTACard: React.FC<CTACardProps> = ({ initialLoad, handleGetStarted }) => {
  return (
    <div 
      className={`bg-gradient-to-r from-[#6342ff] to-[#a87cff] rounded-2xl p-5 h-full flex flex-col justify-center transition-all duration-1000 delay-300 ease-out transform
        ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}
    >
      <div className="text-center py-2">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
          Ready to Put AI Agents to Work?
        </h2>
        
        <p className="text-base text-white/90 mb-5">
          Book a free consultation with the <PoweredByText /> solutions team to learn how voice AI can transform your customer interactions.
        </p>
        
        <Button 
          className="bg-white hover:bg-gray-100 text-[#6342ff] font-bold px-5 py-2 h-auto text-base rounded-md w-full sm:w-auto"
          onClick={handleGetStarted}
        >
          Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
