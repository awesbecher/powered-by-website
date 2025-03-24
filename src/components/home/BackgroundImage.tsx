
import React from "react";

interface BackgroundImageProps {
  children?: React.ReactNode;
}

export const BackgroundImage: React.FC<BackgroundImageProps> = ({ children }) => {
  return (
    <div className="relative">
      {/* Background image container */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/71f8dcda-6501-4375-a8aa-676b561ed420.png" 
          alt="Purple geometric pattern" 
          className="w-full h-[70vh] object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a0b2e]/50 to-[#1a0b2e]"></div>
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
