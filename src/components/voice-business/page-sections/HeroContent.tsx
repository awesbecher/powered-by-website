
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Tv, Mic, Phone, Calendar, HeadphonesIcon, UserSearch } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface HeroContentProps {
  initialLoad: boolean;
  handleContact: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  initialLoad,
  handleContact,
}) => {
  const [videoOpen, setVideoOpen] = useState(false);

  // Function to open Calendly popup
  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/d/cntp-tg6-f8k?hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=7100ff'
      });
    }
  };

  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    
    // Add Calendly CSS
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      // Clean up on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return (
    <div className={`w-full transition-all duration-1000 ease-out transform
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <div className="space-y-6">
        <div className="relative">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Transform Your Business With{" "}
            <div className="relative inline-block">
              <span className="relative z-10 text-[#9b87f5]">AI Voice Assistants</span>
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-gradient-to-r from-[#7100ff]/30 to-[#9b87f5]/30 rounded-full z-0 blur-sm"></span>
            </div>
          </h1>
        </div>
        
        <p className="text-xl text-gray-300 relative z-10">
          <span className="bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md mr-1">Powered_by</span>
          : AI Receptionists. Automate phone calls, answer questions 24/7, and convert leads into customers. Perfect for businesses of all sizes.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex items-start space-x-3">
            <Phone className="text-[#9b87f5] h-6 w-6 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-white font-medium text-lg">Handle Customer Inquiries</h3>
              <p className="text-gray-400 text-sm">Answer calls, provide information, and convert leads</p>
            </div>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex items-start space-x-3">
            <Calendar className="text-[#9b87f5] h-6 w-6 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-white font-medium text-lg">Automate Scheduling</h3>
              <p className="text-gray-400 text-sm">Book appointments with calendar integration</p>
            </div>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex items-start space-x-3">
            <HeadphonesIcon className="text-[#9b87f5] h-6 w-6 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-white font-medium text-lg">24/7 Availability</h3>
              <p className="text-gray-400 text-sm">Never miss a customer call again</p>
            </div>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex items-start space-x-3">
            <UserSearch className="text-[#9b87f5] h-6 w-6 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-white font-medium text-lg">Pre-Screen Leads & Qualify Clients</h3>
              <p className="text-gray-400 text-sm">Gather customer details upfront and qualify them</p>
            </div>
          </div>
        </div>
        
        {/* Added "See for yourself:" text above the buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <p className="text-gray-300 font-bold text-left self-start mb-1">See for yourself:</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Button 
            className="w-full sm:w-auto bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-4 text-base rounded-md flex items-center justify-center"
            onClick={() => setVideoOpen(true)}
          >
            <Tv className="mr-2 h-5 w-5" /> Watch our intro to Voice AI
          </Button>
          
          <Button 
            className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white px-6 py-4 text-base rounded-md flex items-center justify-center border-2 border-white"
            onClick={openCalendly}
          >
            <Mic className="mr-2 h-5 w-5" /> See Demo
          </Button>
        </div>
      </div>

      {/* YouTube Video Dialog */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-3xl p-1 bg-black">
          <div className="aspect-video">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/A4PPY9idmpo?si=YTt05OJgGRyKheJE&autoplay=1" 
              title="Voice AI Introduction" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
