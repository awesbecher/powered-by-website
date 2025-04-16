
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

interface FinalCTASectionProps {
  handleContact: () => void;
}

export const FinalCTASection = ({ handleContact }: FinalCTASectionProps) => {
  // Initialize Cal.com with robust error handling
  useEffect(() => {
    (async function () {
      try {
        console.log("Initializing Cal.com embed in EmailAgent FinalCTASection");
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
        console.log("Cal.com embed initialized successfully in EmailAgent FinalCTASection");
      } catch (error) {
        console.error("Error initializing Cal.com embed in EmailAgent FinalCTASection:", error);
      }
    })();
  }, []);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      {/* CTA Card with gradient background */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6342ff] to-[#9b87f5] opacity-90"></div>
        
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
        
        <div className="relative z-10 px-8 py-16">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white/20 p-3 rounded-full">
              <Mail className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center max-w-3xl mx-auto">
            Ready to transform your business communication with AI email agents?
          </h2>
          
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto text-center">
            Join the businesses revolutionizing how they engage customers and streamline operations with intelligent email automation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => {
                console.log("Get Started button clicked in EmailAgent FinalCTASection");
                try {
                  // Direct modal trigger approach
                  (window as any).Cal?.('ui', {
                    styles: { branding: { brandColor: '#000000' } },
                    hideEventTypeDetails: false,
                    layout: 'month_view',
                  });
                  (window as any).Cal?.('showModal', {
                    calLink: "team-powered-by-dfbtbb/get-started-with-ai-email-agents",
                    config: {
                      layout: 'month_view',
                    },
                  });
                } catch (err) {
                  console.error("Failed to open Cal.com modal directly in FinalCTASection:", err);
                  // Fallback to parent's handler
                  handleContact();
                }
              }}
              className="bg-white hover:bg-gray-100 text-[#6342ff] px-8 py-6 text-lg rounded-xl font-bold flex items-center w-full sm:w-auto"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            {/* Hidden Cal.com button that will be triggered programmatically */}
            <button
              data-cal-link="team-powered-by-dfbtbb/get-started-with-ai-email-agents"
              data-cal-config='{"layout":"month_view"}'
              className="hidden"
            ></button>
          </div>
        </div>
      </div>
    </section>
  );
}