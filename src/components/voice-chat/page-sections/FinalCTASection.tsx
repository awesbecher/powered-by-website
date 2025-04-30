import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

export const FinalCTASection = () => {
  const handleCalendarClick = () => {
    console.log("Calendar button clicked in FinalCTASection");
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
      console.error("Failed to open Cal.com modal from FinalCTASection:", err);
      // Fallback to finding and clicking the button
      const calBtn = document.querySelector('[data-cal-link="team-powered-by-dfbtbb/get-started-today"]');
      if (calBtn instanceof HTMLElement) {
        calBtn.click();
      }
    }
  };

  // Initialize Cal.com with robust error handling
  useEffect(() => {
    (async function () {
      try {
        console.log("Initializing Cal.com embed in VoiceChat FinalCTASection");
        const cal = await getCalApi();
        cal("ui", {
          "cssVarsPerTheme": {
            "light": {"cal-brand":"#292929"},
            "dark": {"cal-brand":"#fafafa"}
          },
          "hideEventTypeDetails": false,
          "layout": "month_view"
        });
        console.log("Cal.com embed initialized successfully in VoiceChat FinalCTASection");
      } catch (error) {
        console.error("Error initializing Cal.com embed in VoiceChat FinalCTASection:", error);
      }
    })();
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl text-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#9b87f5]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#6342ff]/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        <div className="inline-block mb-6 px-3 py-1 bg-[#9b87f5]/10 rounded-full border border-[#9b87f5]/20">
          <span className="text-[#9b87f5] font-medium">Ready to transform your business?</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8">
          Start Engaging Customers with Voice AI Today
        </h2>
        
        <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Join the businesses revolutionizing the way they work, communicate, and engage customers.
          Experience the future of customer interactions now.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            className="bg-[#6342ff] hover:bg-[#5233e0] text-white px-8 py-6 text-lg rounded-md flex items-center shadow-lg shadow-[#6342ff]/20 w-full sm:w-auto"
            onClick={handleCalendarClick}
            data-cal-link="team-powered-by-dfbtbb/get-started-today"
            data-cal-config='{"layout":"month_view"}'
          >
            Schedule a Demo <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            className="bg-black hover:bg-gray-900 text-white px-8 py-6 text-lg rounded-md flex items-center border-2 border-[#6342ff]/50 w-full sm:w-auto"
            onClick={() => window.open('https://www.poweredby.agency/real-estate', '_blank')}
          >
            Try Live Demo <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
