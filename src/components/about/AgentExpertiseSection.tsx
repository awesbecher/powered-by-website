
import React from "react";
import { NavigationButtons } from "@/components/home/NavigationButtons";

interface AgentExpertiseSectionProps {
  initialLoad: boolean;
}

export const AgentExpertiseSection = ({ initialLoad }: AgentExpertiseSectionProps) => {
  return (
    <div className={`mt-16 p-8 bg-gradient-to-r from-[#2a1a47]/40 to-[#1a0b2e]/40 rounded-xl border border-[#9b87f5]/30 text-left
      transition-all duration-1000 delay-600 ease-out transform max-w-4xl mx-auto backdrop-blur-md shadow-lg
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white">Multi-Channel Agent Expertise</h2>
      </div>
      <div className="py-2">
        <NavigationButtons />
      </div>
    </div>
  );
};
