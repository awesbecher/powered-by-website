
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
            Room Service at Grandview
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg font-bold">
            Indulge in exquisite dining from the comfort of your luxury suite, with our 24/7 premium room service. Please choose from any of the items on our Food & Drinks Menu below. When you are ready, click the button below to speak to Room Service.
          </p>
        </div>
      </div>
    </div>
  );
};
