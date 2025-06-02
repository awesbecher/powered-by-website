import React from "react";
import { Button } from "@/components/ui/button";
import { Users, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AboutPageButtonsProps {
  onScrollToSection?: (ref: React.RefObject<HTMLElement>) => void;
  whoWeAreRef?: React.RefObject<HTMLElement>;
  collaborationRef?: React.RefObject<HTMLElement>;
}

export const AboutPageButtons = ({ onScrollToSection, whoWeAreRef, collaborationRef }: AboutPageButtonsProps) => {
  const handleWhoWeAreClick = () => {
    if (onScrollToSection && whoWeAreRef) {
      onScrollToSection(whoWeAreRef);
    }
  };

  const handleMissionClick = () => {
    if (onScrollToSection && collaborationRef) {
      onScrollToSection(collaborationRef);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-5 justify-center mt-8 mx-auto max-w-xl">
        {/* Our Mission Button */}
        <Button 
          className="bg-[#6342ff] hover:bg-[#7352ff] text-white px-8 py-6 rounded-lg text-lg font-medium flex items-center justify-center gap-3 shadow-md shadow-purple-700/20 transition-colors"
          onClick={handleMissionClick}
        >
          <Target className="h-5 w-5" />
          Our Mission
        </Button>
        
        {/* Meet Our Team Button */}
        <Button 
          className="bg-[#6342ff] hover:bg-[#7352ff] text-white px-8 py-6 rounded-lg text-lg font-medium flex items-center justify-center gap-3 shadow-md shadow-purple-700/20 transition-colors"
          onClick={handleWhoWeAreClick}
        >
          <Users className="h-5 w-5" />
          Meet Our Team
        </Button>
      </div>
    </>
  );
};
