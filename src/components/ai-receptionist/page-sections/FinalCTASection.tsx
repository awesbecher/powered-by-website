
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

export const FinalCTASection = () => {
  // Initialize Cal.com
  useEffect(() => {
    (async function () {
      try {
        console.log("Initializing Cal.com embed in FinalCTASection");
        // Remove namespace parameter
        const cal = await getCalApi();
        cal("ui", {
          "cssVarsPerTheme": {
            "light": {"cal-brand":"#292929"},
            "dark": {"cal-brand":"#fafafa"}
          },
          "hideEventTypeDetails": false,
          "layout": "month_view"
        });
        console.log("Cal.com embed initialized successfully in FinalCTASection");
      } catch (error) {
        console.error("Error initializing Cal.com embed in FinalCTASection:", error);
      }
    })();
  }, []);
  
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl relative">
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#6342ff]/20 blur-3xl"></div>
      </div>
      
      <div className="relative z-10 bg-gradient-to-r from-[#1f1235]/80 to-[#2a1d45]/80 backdrop-blur-lg p-12 rounded-3xl border border-[#9b87f5]/30 shadow-xl text-center max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Ready to transform your SMB with AI agents?
        </h2>
        
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join the businesses revolutionizing the way they work, communicate, & engage customers.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            className="w-full sm:w-auto bg-[#6342ff] hover:bg-[#5835e0] text-white px-8 py-6 text-lg rounded-xl flex items-center justify-center gap-2"
            data-cal-link="team-powered-by-dfbtbb/get-started-with-ai-receptionist"
            data-cal-config='{"layout":"month_view"}'
            onClick={() => {
              console.log("Get Started button clicked in FinalCTASection");
              try {
                // Direct modal trigger approach
                (window as any).Cal?.('ui', {
                  styles: { branding: { brandColor: '#000000' } },
                  hideEventTypeDetails: false,
                  layout: 'month_view',
                });
                (window as any).Cal?.('showModal', {
                  calLink: "team-powered-by-dfbtbb/get-started-with-ai-receptionist",
                  config: {
                    layout: 'month_view',
                  },
                });
              } catch (err) {
                console.error("Failed to open Cal.com modal from FinalCTASection:", err);
              }
            }}
          >
            <ArrowRight className="w-5 h-5" />
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};
