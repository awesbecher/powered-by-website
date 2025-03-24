
import React from "react";

export const BackgroundImage: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Top section background image */}
      <div className="absolute top-0 left-0 right-0 h-[70vh] overflow-hidden">
        {/* Semi-transparent gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e]/90 via-[#2f1c4a]/80 to-[#1a0b2e] z-10"
          aria-hidden="true"
        />
        
        {/* Background image */}
        <img
          src="/lovable-uploads/131b4a87-de91-4b08-9702-1bcde3ef8356.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          style={{ objectPosition: "center 20%" }}
          aria-hidden="true"
        />
        
        {/* Extra gradient for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0b2e]/80 via-transparent to-[#1a0b2e]/80 z-20" aria-hidden="true" />
      </div>
      
      {/* Animated orbs/blobs for visual interest */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20 z-0" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20 z-0" />
    </div>
  );
};
