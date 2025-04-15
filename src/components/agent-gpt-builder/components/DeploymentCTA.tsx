
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";

const DeploymentCTA: React.FC = () => {
  useEffect(() => {
    // Load Tally script when the component mounts
    const existingScript = document.querySelector('script[src="https://tally.so/widgets/embed.js"]');
    
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://tally.so/widgets/embed.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="mt-16 text-center max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.5s' }}>
      <Button 
        className="bg-gradient-to-r from-[#9b87f5] to-[#8777e5] hover:from-[#8777e5] hover:to-[#7667d5] text-white px-8 py-6 rounded-xl text-lg shadow-lg shadow-[#9b87f5]/20 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        data-tally-open="mRrk6p" 
        data-tally-layout="modal" 
        data-tally-width="400" 
        data-tally-auto-close="0"
      >
        Ready to Deploy Your Agent? Contact Us
      </Button>
    </div>
  );
};

export default DeploymentCTA;
