import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mic } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { getCalApi } from "@calcom/embed-react";
import { useCalendarInitialization } from "@/utils/calendarUtils";

interface HeroContentProps {
  initialLoad: boolean;
  handleContact: () => void;
}

export const HeroContent = ({ initialLoad, handleContact }: HeroContentProps) => {
  const [videoOpen, setVideoOpen] = useState(false);
  const navigate = useNavigate();

  // Use the centralized calendar initialization hook
  useCalendarInitialization();

  const handleTryDemo = () => {
    const triggerButton = document.getElementById('voice-chat-trigger');
    if (triggerButton) {
      triggerButton.click();
    }
  };

  const handleGetStarted = async () => {
    try {
      console.log("Get Started button clicked in VoiceChat HeroContent");
      // Get fresh instance of Cal API
      const cal = await getCalApi({"namespace":"get-started-today"});
      
      // Configure UI
      cal("ui", {
        "cssVarsPerTheme": {
          "light": {"cal-brand":"#292929"},
          "dark": {"cal-brand":"#fafafa"}
        },
        "hideEventTypeDetails": false,
        "layout": "month_view"
      });
      
      // Directly open the calendar modal
      cal("modal", { calLink: "team-powered-by-dfbtbb/get-started-today" });
      console.log("Cal.com modal opened from VoiceChat HeroContent");
    } catch (error) {
      console.error("Failed to open Cal.com modal from VoiceChat HeroContent:", error);
      // Fallback if Cal.com fails
      window.location.href = '/contact';
    }
  };

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
            <div className="flex flex-wrap gap-3">
              <Button 
                className="bg-black hover:bg-gray-900 text-white px-6 py-4 text-base rounded-md flex items-center border-2 border-white"
                onClick={handleTryDemo}
              >
                <Mic className="mr-2 h-5 w-5" /> Try Demo
              </Button>
              
              <Button 
                className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-4 text-base rounded-md flex items-center"
                onClick={handleGetStarted}
              >
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Hidden Cal.com button using the new format */}
          <button
            className="hidden"
            data-cal-namespace="get-started-today"
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
