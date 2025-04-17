
import React from "react";

export const RoomServiceHeader: React.FC = () => {
  return (
    <div className="relative h-[60vh] mb-8 mt-16">
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/e87cce6e-adc9-4426-b464-c64b14d607bd.png"
          alt="Luxury Hotel Room"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#222222]"></div>
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Turn your hotel phone line into a 24/7 room service concierge.
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg font-bold">
            Our Voice AI answers, recommends, and routes guest requests in seconds — all without staff.
          </p>
        </div>
      </div>
    </div>
  );
};
