import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Tv, Mic } from "lucide-react";
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
    window.open('/real-estate', '_blank');
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
    (async function () {
      try {
        console.log("Initializing Cal.com embed");
        const cal = await getCalApi({"namespace":"get-started-today"});
        cal("ui", {
          "theme": "dark",
          "cssVarsPerTheme": {
            "light": {"cal-brand": "#292929"},
            "dark": {"cal-brand": "#fafafa"}
          },
          "hideEventTypeDetails": false,
          "layout": "column_view"
        });
      } catch (error) {
        console.error("Error initializing Cal.com:", error);
      }
    })();
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
                className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-4 text-base rounded-md flex items-center"
                onClick={() => setVideoOpen(true)}
              >
                <Tv className="mr-2 h-5 w-5" /> Watch Overview
              </Button>
              
              <Button 
                className="bg-black hover:bg-gray-900 text-white px-6 py-4 text-base rounded-md flex items-center border-2 border-white"
                onClick={handleTryDemo}
              >
                <Mic className="mr-2 h-5 w-5" /> Try Demo
              </Button>
            </div>
          </div>

          <button
            data-cal-namespace="get-started-today"
            data-cal-link="team-powered-by-dfbtbb/get-started-today"
            data-cal-config='{"layout":"column_view","theme":"dark"}'
            className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-5 text-base rounded-md flex items-center"
          >
            Schedule a Demo <ArrowRight className="ml-2 h-5 w-5" />
          </button>
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
