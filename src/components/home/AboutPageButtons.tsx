import React from "react";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AboutPageButtonsProps {
  onScrollToSection?: (ref: React.RefObject<HTMLElement>) => void;
  sectionRef?: React.RefObject<HTMLElement>;
}

export const AboutPageButtons = ({ onScrollToSection, sectionRef }: AboutPageButtonsProps) => {
  const handleWhoWeAreClick = () => {
    if (onScrollToSection && sectionRef) {
      onScrollToSection(sectionRef);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-8 mx-auto max-w-xl">
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
