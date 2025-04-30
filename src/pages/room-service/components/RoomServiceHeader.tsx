import React from "react";
import { Button } from "@/components/ui/button";
import { PhoneCall } from "lucide-react";

interface RoomServiceHeaderProps {
  setShowCallDialog: (show: boolean) => void;
}

export const RoomServiceHeader: React.FC<RoomServiceHeaderProps> = ({ setShowCallDialog }) => {
  return (
    <div className="relative h-[60vh] mb-8 mt-16">
      <div className="absolute inset-0">
        <img 
          src="/assets/images/e87cce6e-adc9-4426-b464-c64b14d607bd.png"
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
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg font-bold mb-8">
            Our Voice AI answers, recommends, and routes guest requests in seconds — all without staff.
          </p>
          <Button
            onClick={() => setShowCallDialog(true)}
            size="lg"
            className="bg-white hover:bg-white/90 text-black px-8 py-6 text-lg font-semibold rounded-xl shadow-lg transition-all duration-200"
          >
            <PhoneCall className="mr-2 h-6 w-6" />
            Try Room Service Demo
          </Button>
        </div>
      </div>
    </div>
  );
};
