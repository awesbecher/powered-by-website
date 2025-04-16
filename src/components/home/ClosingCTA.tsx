
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
  customButtonText,
  useCalendly = false,
  externalLink = null,
  onContactClick
}) => {
  useEffect(() => {
    // Initialize Cal.com with correct namespace and team link
    (async function () {
      try {
        console.log("Initializing Cal.com embed in ClosingCTA");
        const cal = await getCalApi();
        if (cal) {
          cal("ui", {
            "cssVarsPerTheme": {
              "light": {"cal-brand":"#292929"},
              "dark": {"cal-brand":"#fafafa"}
            },
            "hideEventTypeDetails": false,
            "layout": "month_view"
          });
          console.log("Cal.com embed initialized successfully in ClosingCTA");
        } else {
          console.error("Cal.com API not available in ClosingCTA");
        }
      } catch (error) {
        console.error("Error initializing Cal.com embed in ClosingCTA:", error);
      }
    })();
  }, []);

  const handleClick = () => {
    if (onContactClick) {
      onContactClick();
      return;
    }
    
    // If no onContactClick provided, try to trigger Cal.com directly
    console.log("Get Started button clicked in ClosingCTA");
    const calBtn = document.querySelector('[data-cal-link="team-powered-by-dfbtbb/get-started-today"]');
    if (calBtn instanceof HTMLElement) {
      console.log("Cal.com button found in ClosingCTA, triggering click");
      calBtn.click();
    } else {
      console.error("Cal.com button not found in DOM from ClosingCTA");
      // Try opening Cal.com directly
      try {
        (window as any).Cal?.('ui', {
          styles: { branding: { brandColor: '#000000' } },
          hideEventTypeDetails: false,
          layout: 'month_view',
        });
        (window as any).Cal?.('showModal', {
          calLink: "team-powered-by-dfbtbb/get-started-today",
          config: {
            layout: 'month_view',
          },
        });
      } catch (err) {
        console.error("Failed to open Cal.com modal directly:", err);
      }
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {customHeading || "Transform Your Business with AI Agents"}
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
              {customButtonText || "Get Started"} <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        ) : useCalendly || onContactClick ? (
          <Button
            className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white px-8 py-6 text-lg rounded-md"
            onClick={handleClick}
            data-cal-link="team-powered-by-dfbtbb/get-started-today"
            data-cal-config='{"layout":"month_view"}'
          >
            {customButtonText || "Get Started"} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        ) : (
          <Button
            className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white px-8 py-6 text-lg rounded-md"
            onClick={handleClick}
            data-cal-link="team-powered-by-dfbtbb/get-started-today"
            data-cal-config='{"layout":"month_view"}'
          >
            {customButtonText || "Get Started"} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        )}
      </div>
    </section>
  );
};

export default ClosingCTA;
