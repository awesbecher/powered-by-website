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

const ClosingCTA = ({
  customHeading,
  customButtonText = "Get Started",
  useCalendly = false,
  externalLink = null,
  onContactClick
}: ClosingCTAProps) => {
  // Set up Cal.com API
  useEffect(() => {
    (async function() {
      try {
        const cal = await getCalApi();
        if (cal) {
          // Initialize Cal with our namespace
          cal("init", {
            origin: "https://cal.com"
          });
          
          // Preload for faster modal opening
          cal("preload", {
            calLink: "team-powered-by-dfbtbb/get-started-today"
          });
          
          // Configure UI
          cal("ui", {
            theme: "light",
            styles: {
              branding: {
                brandColor: "#9b87f5" 
              }
            },
            hideEventTypeDetails: false
          });
          
          console.log("Cal.com API initialized in ClosingCTA");
        }
      } catch (error) {
        console.error("Failed to initialize Cal.com API:", error);
      }
    })();
  }, []);
  
  // Handle clicking the "Get Started" button
  const handleClick = async (e: React.MouseEvent) => {
    if (onContactClick) {
      onContactClick();
      return;
    }
    
    if (externalLink) {
      // Let default link behavior happen
      return;
    }
    
    e.preventDefault();
    
    try {
      // Direct programmatic opening using Cal API
      const cal = await getCalApi();
      if (cal) {
        // Open the modal directly instead of relying on data attributes
        cal("modal", {
          calLink: "team-powered-by-dfbtbb/get-started-today",
          config: {
            layout: "month_view"
          }
        });
        
        console.log("Cal.com modal opened programmatically");
      } else {
        console.error("Cal API not available");
        window.location.href = "/contact";
      }
    } catch (error) {
      console.error("Error opening Cal.com modal:", error);
      window.location.href = "/contact";
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
            onClick={handleClick}
            asChild
          >
            <a href={externalLink} target="_blank" rel="noopener noreferrer">
              {customButtonText} <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        ) : useCalendly || onContactClick ? (
          <Button
            className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white px-8 py-6 text-lg rounded-md cal-btn"
            onClick={handleClick}
          >
            {customButtonText} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        ) : (
          <Button
            className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white px-8 py-6 text-lg rounded-md cal-btn"
            onClick={handleClick}
          >
            {customButtonText} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        )}
      </div>
    </section>
  );
};

export default ClosingCTA;
