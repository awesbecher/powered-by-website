import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { VapiDialog } from '@/components/shared/VapiDialog';

interface InsuranceHeroProps {
  isLoading: boolean;
}

const InsuranceHero = ({ isLoading }: InsuranceHeroProps) => {
  const [showVapiDialog, setShowVapiDialog] = useState(false);

  const handleVapiCall = () => {
    setShowVapiDialog(true);
  };

  return (
    <>
      <div className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden shadow-2xl border border-white/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="col-span-7 p-8 lg:p-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Empower Your Insurance Business with AI
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Transform your insurance agency with AI-powered agents that handle inquiries, qualify leads, and assist customers 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Button 
                  className="bg-accent hover:bg-accent/80 text-white text-lg px-8 py-6 flex items-center justify-center gap-2 shadow-lg transition-all duration-300 rounded-lg"
                  variant="default"
                  onClick={handleVapiCall}
                  disabled={isLoading}
                >
                  <span>Speak to a Planter's Insurance Agent Now</span>
                  <Phone className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          <div className="col-span-5 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/40" />
            <img 
              src="/images/insurance-agent.png" 
              alt="AI Insurance Agent"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <VapiDialog
        isOpen={showVapiDialog}
        onClose={() => setShowVapiDialog(false)}
        agentId="df42b616-337e-4877-8e9b-44fb0b5a0225"
        agentImage="/assets/team/Chris Cambridge.jpg"
        logoImage="/assets/team/Planter's Insurance.png"
      />
    </>
  );
};

export default InsuranceHero;
