
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Tv, Mic } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface HeroContentProps {
  initialLoad: boolean;
  handleVoiceChatClick: () => void;
  handleGetStarted: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  initialLoad,
  handleVoiceChatClick,
  handleGetStarted,
}) => {
  const [videoOpen, setVideoOpen] = useState(false);

  // Function to open Calendly popup
  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/d/cq7r-5v8-qvw?hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=8e00ff'
      });
    }
  };

  return (
    <div className={`transition-all duration-1000 ease-out transform
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
          Transform Your Website With <span className="text-[#9b87f5]">AI Voice Chat</span>
        </h1>
        <p className="text-xl text-gray-300">
          <span className="bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md mr-1">Powered_by</span>: AI Voice Chat. Engage website visitors in natural conversations that convert. Unlock new opportunities to upsell and cross-sell. Delight your customers with state-of-the-art in voice AI.
        </p>
        <div className="space-y-2 text-gray-300">
          <p className="text-xl">Deploy Human-like AI Voice Chat Directly on Your Website to:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-sm">
            <li>Boost Conversions: Turn visitors into customers with engaging conversations</li>
            <li>Automate Customer Support: Provide immediate answers & reduce response times</li>
            <li>Offer 24/7 Availability: Ensure reliable, personalized support day or night</li>
          </ul>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-gray-300 font-bold mb-1 text-left">See for yourself:</p>
          <div className="flex flex-wrap gap-3 self-start">
            <Button 
              className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-4 text-base rounded-md flex items-center"
              onClick={() => setVideoOpen(true)}
            >
              <Tv className="mr-2 h-5 w-5" /> Watch our intro to Voice AI
            </Button>
            
            {/* "See Demo" button with black background, white text, and white outline */}
            <Button 
              className="bg-black hover:bg-gray-900 text-white px-6 py-4 text-base rounded-md flex items-center border-2 border-white"
              onClick={openCalendly}
            >
              <Mic className="mr-2 h-5 w-5" /> See Demo
            </Button>
          </div>
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
