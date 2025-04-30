
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CalendarClock, Sparkles, Headset } from "lucide-react";

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
    <div className={`w-full transition-all duration-1000 delay-300 ease-out transform
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <div className="w-full">
        {/* Logo image above the card - now with headset overlay */}
        <div className="flex justify-center mb-3 relative">
          <img 
            src="/assets/images/cf3e4a34-142d-4988-99e0-6c90f83d89e7.png" 
            alt="Voice AI Logo" 
            className="w-40 h-40 object-contain cursor-pointer hover:opacity-90 transition-opacity" 
            onClick={openCalendly} 
          />
          
          {/* Headset icon with adjusted positioning - moved further up and more to the left */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-[66%] -translate-y-[75%] flex items-center justify-center">
            <div className="bg-[#8B5CF6] rounded-full flex items-center justify-center" style={{ width: '42px', height: '42px' }}>
              <Headset className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="relative rounded-3xl p-4 overflow-hidden">
          {/* Glass background with purple gradient outline */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#7100ff]/40 via-[#9b87f5]/20 to-transparent rounded-3xl"></div>
          <div className="absolute inset-0.5 bg-black/60 backdrop-blur-md rounded-[1.4rem]"></div>
          
          {/* Animated particles in background */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white/10"
                style={{
                  width: `${Math.random() * 8 + 3}px`,
                  height: `${Math.random() * 8 + 3}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                  opacity: Math.random() * 0.5 + 0.2
                }}
              />
            ))}
          </div>
          
          <div className="relative flex flex-col items-center space-y-2 py-1 z-10"> {/* Reduced space-y-3 to space-y-2 and py-2 to py-1 */}
            <div className="flex items-center">
              <Sparkles className="h-5 w-5 text-[#9b87f5] mr-2" />
              <h3 className="text-xl font-bold text-white text-center">
                Ready to See How It Works?
              </h3>
            </div>
            
            <Button 
              onClick={openCalendly}
              className="relative w-full bg-[#7100ff] hover:bg-[#5c00d6] text-white px-6 py-4 text-lg rounded-md flex items-center justify-center group overflow-hidden"
            >
              {/* Button glow effect */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#7100ff]/0 via-white/20 to-[#7100ff]/0 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></span>
              
              <CalendarClock className="mr-2 h-5 w-5" />
              Get Started Now!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
