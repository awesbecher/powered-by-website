
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

interface FinalCTASectionProps {
  handleContact: () => void;
}

export const FinalCTASection = ({ handleContact }: FinalCTASectionProps) => {
  // Initialize Cal.com at the component level for redundancy
  useEffect(() => {
    (async function () {
      try {
        console.log("Initializing Cal.com embed in TextAgent FinalCTASection");
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
        console.log("Cal.com embed initialized successfully in TextAgent FinalCTASection");
      } catch (error) {
        console.error("Error initializing Cal.com embed in TextAgent FinalCTASection:", error);
      }
    })();
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-6xl text-center">
      {/* CTA Card with gradient background */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6342ff] to-[#9b87f5] opacity-90"></div>
        
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
        
        <div className="relative z-10 px-8 py-16">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white/20 p-3 rounded-full">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
            Ready to transform your SMB with AI agents?
          </h2>
          
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            Join the businesses revolutionizing the way they work, communicate, & engage customers.
          </p>
          
          <div className="flex justify-center items-center">
            <Button 
              onClick={() => {
                console.log("Get Started button clicked in TextAgent FinalCTASection");
                try {
                  // Direct modal trigger approach
                  (window as any).Cal?.('ui', {
                    styles: { branding: { brandColor: '#000000' } },
                    hideEventTypeDetails: false,
                    layout: 'month_view',
                  });
                  (window as any).Cal?.('showModal', {
                    calLink: "team-powered-by-dfbtbb/get-started-with-ai-sms-text-agents",
                    config: {
                      layout: 'month_view',
                    },
                  });
                } catch (err) {
                  console.error("Failed to open Cal.com modal from FinalCTASection:", err);
                  // Fallback to parent's handler
                  handleContact();
                }
              }}
              className="bg-white hover:bg-gray-100 text-[#6342ff] px-8 py-6 text-lg rounded-xl font-bold flex items-center"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Hidden Cal.com button that will be triggered programmatically */}
      <button
        data-cal-link="team-powered-by-dfbtbb/get-started-with-ai-sms-text-agents"
        data-cal-config='{"layout":"month_view"}'
        className="hidden"
      ></button>
    </section>
  );
};