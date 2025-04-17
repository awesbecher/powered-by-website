
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
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Book Your Free Voice AI Demo</h2>
            <p className="text-white/80 mb-8">
              We'll send you a personalized demo for your dealership. Experience how our AI can transform your customer service and sales efforts.
            </p>
            
            <div className="mb-8">
              <DemoCallBlock />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitSection;
