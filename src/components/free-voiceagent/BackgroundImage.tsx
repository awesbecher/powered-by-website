
import React from "react";

export const BackgroundImage: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Top section background image */}
      <div className="absolute top-0 left-0 right-0 h-[80vh] overflow-hidden">
        {/* Semi-transparent gradient overlay - made more transparent */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e]/70 via-[#2f1c4a]/60 to-[#1a0b2e]/80 z-10"
          aria-hidden="true"
        />
        
        {/* Background image - increased opacity from 0.2 to 0.4 */}
        <img
          src="/assets/images/131b4a87-de91-4b08-9702-1bcde3ef8356.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          style={{ objectPosition: "center 20%" }}
          aria-hidden="true"
        />
        
        {/* Reduced side gradients for better image visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0b2e]/60 via-transparent to-[#1a0b2e]/60 z-20" aria-hidden="true" />
      </div>
      
      {/* Enhanced animated orbs/blobs for visual interest */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-30 z-0" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/40 blur-3xl opacity-30 z-0" />
    </div>
  );
};
