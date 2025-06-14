
import React from "react";
import { OptimizedImage } from "@/components/shared/OptimizedImage";
import "@/components/ui/animations.css";

interface MissionImageSectionProps {
  initialLoad: boolean;
}

export const MissionImageSection = ({ initialLoad }: MissionImageSectionProps) => {
  return (
    <div className={`mt-16 mb-16 max-w-xl mx-auto transition-all duration-1000 delay-400 ease-out transform
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <OptimizedImage 
        src="/assets/images/bcaa0656-14f4-485d-8bf2-98ad41d9c172.png" 
        alt="AI Agents for SMBs - Unlocking new agentic opportunities and business value" 
        className="w-full h-auto animate-fade-in"
      />
    </div>
  );
};
