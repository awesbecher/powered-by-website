
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CalendarClock } from "lucide-react";

interface ServiceBoxesProps {
  initialLoad: boolean;
  onTryNow?: () => void;
}

export const ServiceBoxes = ({ initialLoad, onTryNow }: ServiceBoxesProps) => {
  // Function to open Calendly popup
  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/d/cntp-tg6-f8k?hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=7100ff'
      });
    }
  };

  return (
    <div className={`w-full lg:w-1/2 transition-all duration-1000 delay-300 ease-out transform flex flex-col items-start justify-center
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <div className="w-full">
        <div className="border border-white rounded-3xl p-4 overflow-hidden bg-black/20 backdrop-blur-sm">
          <div className="flex flex-col items-center space-y-6 py-6">
            <h3 className="text-2xl font-bold text-white text-center">
              Ready to See How It Works?
            </h3>
            <Button 
              onClick={openCalendly}
              className="bg-[#7100ff] hover:bg-[#5c00d6] text-white px-8 py-6 text-lg rounded-md flex items-center"
            >
              <CalendarClock className="mr-2 h-5 w-5" />
              Get Started Now!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
