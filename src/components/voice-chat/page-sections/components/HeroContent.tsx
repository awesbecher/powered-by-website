import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mic } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { getCalApi } from "@calcom/embed-react";

interface HeroContentProps {
  initialLoad: boolean;
  handleContact: () => void;
}

export const HeroContent = ({ initialLoad, handleContact }: HeroContentProps) => {
  const [videoOpen, setVideoOpen] = useState(false);
  const navigate = useNavigate();

  const handleTryDemo = () => {
    const triggerButton = document.getElementById('voice-chat-trigger');
    if (triggerButton) {
      triggerButton.click();
    }
  };

  const handleGetStarted = () => {
    const calBtn = document.querySelector('[data-cal-link="team-powered-by-dfbtbb/get-started-today"]');
    if (calBtn instanceof HTMLElement) {
      console.log("Cal.com button found, triggering click");
      calBtn.click();
    } else {
      console.error("Cal.com button not found in DOM, navigating to /contact as fallback");
      window.location.href = '/contact';
    }
  };

  useEffect(() => {
    // Initialize Cal.com
    (window as any).Cal = {
      q: (window as any).Cal ? (window as any).Cal.q : [],
      ns: {},
    };
    
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://app.cal.com/embed/embed.js';
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={`transition-all duration-1000 ease-out transform
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
          Revolutionize Customer Interactions with <span className="text-[#9b87f5]">AI Voice Chat</span>
        </h1>
        <p className="text-xl text-gray-300">
          Automate conversations, convert leads faster, and deliver instant support—24/7.
        </p>
        <div className="flex flex-col items-start md:items-start pt-4 space-y-6">
          <div>
            <p className="text-gray-300 font-bold mb-2 text-left">See for yourself:</p>
            <div className="flex flex-wrap gap-3 self-start">
              <Button 
                className="bg-black hover:bg-gray-900 text-white px-6 py-4 text-base rounded-md flex items-center border-2 border-white"
                onClick={handleTryDemo}
              >
                <Mic className="mr-2 h-5 w-5" /> Try Demo
              </Button>
            </div>
          </div>

          <Button 
            className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-5 text-base rounded-md flex items-center"
            onClick={handleGetStarted}
          >
            Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          {/* Hidden Cal.com button */}
          <button
            className="hidden"
            data-cal-link="team-powered-by-dfbtbb/get-started-today"
            data-cal-config='{"layout":"month_view"}'
          />
        </div>
      </div>

      {/* Video Dialog */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black">
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/A4PPY9idmpo?si=Ku1bYt3Q1E79oJqW&autoplay=1"
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
