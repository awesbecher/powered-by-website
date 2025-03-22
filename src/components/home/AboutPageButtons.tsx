
import React from "react";
import { Button } from "@/components/ui/button";
import { Users, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AboutPageButtonsProps {
  onScrollToSection?: (ref: React.RefObject<HTMLElement>) => void;
  sectionRef?: React.RefObject<HTMLElement>;
}

export const AboutPageButtons = ({ onScrollToSection, sectionRef }: AboutPageButtonsProps) => {
  const navigate = useNavigate();

  const handleWhoWeAreClick = () => {
    if (onScrollToSection && sectionRef) {
      onScrollToSection(sectionRef);
    }
  };

  const handleCareersClick = () => {
    navigate('/careers');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
      <Button 
        variant="outline" 
        size="lg"
        className="border-white text-white hover:bg-white/10 hover:text-white"
        onClick={handleWhoWeAreClick}
      >
        <Users className="mr-2 h-5 w-5" />
        Who We Are
      </Button>
      
      <Button 
        variant="gradient" 
        size="lg"
        onClick={handleCareersClick}
      >
        <Briefcase className="mr-2 h-5 w-5" />
        Careers
      </Button>
    </div>
  );
};
