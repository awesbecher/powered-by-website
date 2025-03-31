
import React from "react";

interface MissionImageSectionProps {
  initialLoad: boolean;
}

export const MissionImageSection = ({ initialLoad }: MissionImageSectionProps) => {
  return (
    <div className={`mt-16 mb-16 max-w-4xl mx-auto transition-all duration-1000 delay-400 ease-out transform
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <div className="rounded-xl overflow-hidden shadow-2xl border border-accent/30">
        <img 
          src="/lovable-uploads/839054a0-e115-4db5-9585-78873881b35e.png" 
          alt="Powered_by mission: democratize access to AI agents for SMBs" 
          className="w-full h-auto"
        />
      </div>
      <p className="text-center text-gray-400 mt-3 text-sm">Our founder presenting the Powered_by mission</p>
    </div>
  );
};
