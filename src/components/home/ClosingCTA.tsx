import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";
import Cal, { getCalApi as getCalApiInline } from "@calcom/embed-react";

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
}: ClosingCTAProps) => {
  // Cal.com initialization state
  const [calLoaded, setCalLoaded] = useState(false);
  
  // Initialize Cal.com API
  useEffect(() => {
    // Initialize Cal.com API
    (async function() {
      try {
        const cal = await getCalApi();
        // Configure event listeners
        cal("on", {
          action: "*",
          callback: (data: any) => {
            console.log("Cal event:", data);
            // You can handle various Cal events here
            if (data.event === "BOOKING_CREATED" || data.event === "booking_created") {
              console.log("Booking created successfully!");
              // You could trigger additional actions here
            }
          }
        });
        
        // Preload the calendar
        cal("preload", { calLink: "team-powered-by-dfbtbb/get-started-today" });
        
        // Mark as loaded
        setCalLoaded(true);
        console.log("Cal.com API initialized successfully");
      } catch (error) {
        console.error("Error initializing Cal API:", error);
      }
    })();
  }, []);

  const handleButtonClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (useCalendly || externalLink) {
      if (externalLink) {
        window.location.href = externalLink;
      } else if (onContactClick) {
        onContactClick();
      }
      return;
    }

    try {
      // Use the direct API approach - this is more reliable than toggling component visibility
      const cal = await getCalApi();
      if (cal) {
        console.log("Opening Cal modal programmatically");
        cal("modal", {
          calLink: "team-powered-by-dfbtbb/get-started-today",
          config: {
            layout: "month_view",
            theme: 'light',
          }
        });
      } else {
        throw new Error("Cal API not available");
      }
    } catch (error) {
      console.error("Error opening Cal modal:", error);
      // Fallback: open Cal.com in new tab as last resort
      window.open("https://cal.com/team-powered-by-dfbtbb/get-started-today", "_blank");
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
            className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white px-8 py-6 text-lg rounded-md cal-btn"
            onClick={handleButtonClick}
            asChild
          >
            <a href={externalLink} target="_blank" rel="noopener noreferrer">
              {customButtonText} <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        ) : useCalendly || onContactClick ? (
          <Button
            className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white px-8 py-6 text-lg rounded-md cal-btn"
            onClick={handleButtonClick}
          >
            {customButtonText} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        ) : (
          <Button
            className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white px-8 py-6 text-lg rounded-md cal-btn"
            onClick={handleButtonClick}
          >
            {customButtonText} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        )}
        {/* Preloaded Cal Component */}
        <Cal
          calLink="team-powered-by-dfbtbb/get-started-today" 
          config={{
            layout: "month_view",
            theme: 'light',
          }}
          embedJsUrl="https://app.cal.com/embed/embed.js"
          style={{ width: '0', height: '0', position: 'absolute', opacity: 0 }}
        />
      </div>
    </section>
  );
};

// Export is handled via named export above

// No need to redeclare Window.Cal as it's handled by @calcom/embed-react
