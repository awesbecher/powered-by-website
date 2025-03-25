
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
      className={`bg-gradient-to-r from-[#6342ff] to-[#a87cff] rounded-2xl p-6 h-full flex flex-col justify-center transition-all duration-1000 delay-300 ease-out transform
        ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}
    >
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Ready to Put AI Agents to Work?
        </h2>
        
        <p className="text-lg text-white/90 mb-6">
          Book a free consultation with the <PoweredByText /> solutions team to learn how voice AI can transform your customer interactions.
        </p>
        
        <Button 
          className="bg-white hover:bg-gray-100 text-[#6342ff] font-bold px-6 py-3 h-auto text-lg rounded-md w-full sm:w-auto"
          onClick={handleGetStarted}
        >
          Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
