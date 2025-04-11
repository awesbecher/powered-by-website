
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface MissionImageSectionProps {
  initialLoad: boolean;
}

export const MissionImageSection = ({ initialLoad }: MissionImageSectionProps) => {
  return (
    <div className={`mt-16 mb-16 max-w-xl mx-auto transition-all duration-1000 delay-400 ease-out transform
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <div className="rounded-xl overflow-hidden shadow-2xl border border-accent/30">
        <AspectRatio ratio={16/9} className="w-full">
          <img 
            src="/lovable-uploads/bcaa0656-14f4-485d-8bf2-98ad41d9c172.png" 
            alt="AI Agents for SMBs - Unlocking new agentic opportunities" 
            className="w-full h-full object-contain"
          />
        </AspectRatio>
      </div>
    </div>
  );
};
