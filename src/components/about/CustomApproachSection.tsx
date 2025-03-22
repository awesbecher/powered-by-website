
import React from "react";

interface CustomApproachSectionProps {
  initialLoad: boolean;
}

export const CustomApproachSection = ({ initialLoad }: CustomApproachSectionProps) => {
  return (
    <div className={`mt-16 p-8 bg-gradient-to-r from-[#2a1a47]/40 to-[#1a0b2e]/40 rounded-xl border border-[#9b87f5]/30 text-left
      transition-all duration-1000 delay-400 ease-out transform max-w-4xl mx-auto backdrop-blur-md shadow-lg
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <div className="mb-4">
        <h2 className="text-3xl font-bold text-white">Custom Approach to AI Agents</h2>
      </div>
      <p className="text-xl text-gray-300 mb-6">
        Our AI agent solutions offer SMBs unique advantages:
      </p>
      <div className="space-y-4 ml-2">
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 bg-[#9b87f5] rounded-full mt-2.5 flex-shrink-0" />
          <p className="text-xl text-gray-300">
            <span className="font-semibold text-white">Turnkey solutions:</span> Powered_by owns the full lifecycle of an AI agent implementation, from design, to build and implementation, to ongoing agent management & optimizations.
          </p>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 bg-[#9b87f5] rounded-full mt-2.5 flex-shrink-0" />
          <p className="text-xl text-gray-300">
            <span className="font-semibold text-white">Always on:</span> Our AI agents operate 24/7, ensuring consistent and exceptional service for your customers.
          </p>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 bg-[#9b87f5] rounded-full mt-2.5 flex-shrink-0" />
          <p className="text-xl text-gray-300">
            <span className="font-semibold text-white">10x more cost-efficient:</span> Deploy AI workers at just 1/10th the cost of a human employee without compromising on performance or customer experience.
          </p>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 bg-[#9b87f5] rounded-full mt-2.5 flex-shrink-0" />
          <p className="text-xl text-gray-300">
            <span className="font-semibold text-white">Quick to implement:</span> Get up and running with an AI agent solution in days using our pre-built agents for voice, email, SMS-text, and workflows.
          </p>
        </div>
      </div>
    </div>
  );
};
