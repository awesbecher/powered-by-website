import React from "react";
import { Link } from "react-router-dom";
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
    <div className="container mx-auto px-4 py-6 flex justify-center items-center min-h-[30vh]">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-8">
          Call the Dealership Below or Click to Speak to us Live!
        </h2>
        
        <div className="flex justify-center">
          <DemoCallBlock 
            title="Experience Sales"
            subtitle="Try our sales assistant"
            onStartCall={() => setShowCallDialog(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default VisitSection;
