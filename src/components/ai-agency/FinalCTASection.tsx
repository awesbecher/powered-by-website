
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";

export const FinalCTASection = () => {
  useEffect(() => {
    // Initialize Cal.com with consistent namespace and team link
    (async function () {
      try {
        console.log("Initializing Cal.com embed in AI Agency FinalCTASection");
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
          
          // Use direct method to ensure it works
          cal("preload", { calLink: "team-powered-by-dfbtbb/get-started-today" });
          
          console.log("Cal.com embed initialized successfully in AI Agency FinalCTASection");
        } else {
          console.error("Cal API not available in AI Agency FinalCTASection");
        }
      } catch (error) {
        console.error("Error initializing Cal.com embed in AI Agency FinalCTASection:", error);
      }
    })();
  }, []);

  const handleClick = () => {
    console.log("Get Started button clicked in AI Agency FinalCTASection");
    
    // First try direct method - this is more reliable
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
      console.log("Called Cal.com showModal directly from AI Agency");
      return;
    } catch (err) {
      console.error("Failed to open Cal.com modal directly from AI Agency:", err);
    }
    
    // Try to find and click the Cal button
    const calBtn = document.querySelector('[data-cal-link="team-powered-by-dfbtbb/get-started-today"]');
    if (calBtn instanceof HTMLElement) {
      console.log("Cal.com button found in AI Agency, triggering click");
      calBtn.click();
    } else {
      console.error("Cal.com button not found in DOM from AI Agency");
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
        Ready to transform your SMB with AI agents?
      </h2>
      <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
        Join the businesses revolutionizing the way they work, communicate, & engage customers.
      </p>
      <Button 
        className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white px-8 py-6 text-lg rounded-md"
        onClick={handleClick}
        data-cal-link="team-powered-by-dfbtbb/get-started-today"
        data-cal-config='{"layout":"month_view"}'
      >
        Get Started <Calendar className="ml-2 h-5 w-5" />
      </Button>

      {/* Hidden Cal.com button that will be clicked programmatically if needed */}
      <button
        id="cal-button-backup"
        data-cal-link="team-powered-by-dfbtbb/get-started-today"
        data-cal-config='{"layout":"month_view"}'
        style={{ display: 'none' }}
      ></button>
    </section>
  );
};

export default FinalCTASection;
