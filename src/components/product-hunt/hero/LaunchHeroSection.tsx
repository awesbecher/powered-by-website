
import React from "react";
import { HeroSection } from "./HeroSection";

interface LaunchHeroSectionProps {
  initialLoad: boolean;
}

export const LaunchHeroSection = ({ initialLoad }: LaunchHeroSectionProps) => {
  return (
    <div className="relative">
      {/* Background image container */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/91bd573a-cfea-4ac8-a555-cf0c34f77d76.png" 
          alt="Rocket launch with cloud plume" 
          className="w-full h-[70vh] object-cover object-center brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1a0b2e]/95"></div>
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10">
        <HeroSection initialLoad={initialLoad} />
      </div>
    </div>
  );
};
