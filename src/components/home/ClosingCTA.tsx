import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

interface ClosingCTAProps {
  customHeading?: string;
  customButtonText?: string;
  useCalendly?: boolean;
  externalLink?: string | null;
  onContactClick?: () => void;
}

export const ClosingCTA: React.FC<ClosingCTAProps> = ({
  customHeading,
  customButtonText = "Get Started",
  useCalendly = false,
  externalLink = null,
  onContactClick
}) => {
  useEffect(() => {
    (async function () {
      try {
        console.log("Initializing Cal.com embed in ClosingCTA");
        const cal = await getCalApi({"namespace":"get-started-today"});
        cal("ui", {
          "cssVarsPerTheme": {
            "light": {"cal-brand":"#292929"},
            "dark": {"cal-brand":"#fafafa"}
          },
          "hideEventTypeDetails": false,
          "layout": "month_view"
        });
        
        // Preload the calendar link
        cal("preload", { calLink: "team-powered-by-dfbtbb/get-started-today" });
        console.log("Cal.com embed initialized successfully in ClosingCTA");
      } catch (error) {
        console.error("Error initializing Cal.com embed in ClosingCTA:", error);
      }
    })();
  }, []);

  const handleClick = async () => {
    if (onContactClick) {
      onContactClick();
      return;
    }
    
    console.log("Get Started button clicked in ClosingCTA");
    
    try {
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
      
      // Directly open the calendar modal with the correct method name
      cal("modal", { calLink: "team-powered-by-dfbtbb/get-started-today" });
      console.log("Cal.com modal opened from ClosingCTA");
    } catch (error) {
      console.error("Failed to open Cal.com modal from ClosingCTA:", error);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {customHeading || "Ready to Transform Your Business with AI agents?"}
        </h2>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Unlock the potential of AI-powered communication and streamline your business operations today.
        </p>
        {externalLink ? (
          <Button
            className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white px-8 py-6 text-lg rounded-md"
            onClick={handleClick}
            asChild
          >
            <a href={externalLink} target="_blank" rel="noopener noreferrer">
              {customButtonText} <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        ) : useCalendly || onContactClick ? (
          <Button
            className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white px-8 py-6 text-lg rounded-md"
            onClick={handleClick}
            data-cal-link="team-powered-by-dfbtbb/get-started-today"
            data-cal-config='{"layout":"month_view"}'
          >
            {customButtonText} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        ) : (
          <Button
            className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white px-8 py-6 text-lg rounded-md"
            onClick={handleClick}
            data-cal-link="team-powered-by-dfbtbb/get-started-today"
            data-cal-config='{"layout":"month_view"}'
          >
            {customButtonText} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        )}
      </div>
    </section>
  );
};

export default ClosingCTA;
