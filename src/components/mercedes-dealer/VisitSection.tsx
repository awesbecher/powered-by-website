
import React from "react";
import DemoCallBlock from "./DemoCallBlock";

interface VisitSectionProps {
  isProcessing: boolean;
  isCallActive: boolean;
  showCallDialog: boolean;
  setShowCallDialog: (value: boolean) => void;
}

const VisitSection = ({
  isProcessing,
  isCallActive,
  setShowCallDialog
}: VisitSectionProps) => {
  return (
    <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[50vh]">
      <div className="text-center max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Book Your Free Voice AI Demo</h2>
        <p className="text-white/80 mb-8 text-center">
          We'll send you a personalized demo for your dealership. Experience how our AI can transform your customer service and sales efforts.
        </p>
        
        <div className="flex justify-center">
          <DemoCallBlock />
        </div>
      </div>
    </div>
  );
};

export default VisitSection;
