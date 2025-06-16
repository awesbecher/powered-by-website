import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { getCalApi } from '@calcom/embed-react';

export const FinalCTASection = () => {
  // Initialize Cal.com with the direct approach
  useEffect(() => {
    (async function() {
      try {
        const cal = await getCalApi({"namespace":"get-started-today"});
        cal("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#292929"},"dark":{"cal-brand":"#fafafa"}},"hideEventTypeDetails":false,"layout":"month_view"});
        
        // Preload the calendar link
        cal("preload", { calLink: "team-powered-by-dfbtbb/get-started-today" });
      } catch (error) {
        console.error("Error initializing Cal.com in AI Receptionist FinalCTASection:", error);
      }
    })();
  }, []);

  const handleGetStarted = async () => {
    try {
      // Get fresh instance of Cal API
      const cal = await getCalApi({"namespace":"get-started-today"});
      
      // Configure UI
      cal("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#292929"},"dark":{"cal-brand":"#fafafa"}},"hideEventTypeDetails":false,"layout":"month_view"});
      
      // Directly open the calendar modal
      cal("modal", { calLink: "team-powered-by-dfbtbb/get-started-today" });
      console.log("Cal.com modal opened from AI Receptionist page");
    } catch (error) {
      console.error("Failed to open Cal.com modal:", error);
      // Fallback to contact page if Cal.com fails
      window.location.href = '/contact';
    }
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="bg-gradient-to-r from-[#6342ff] to-[#9b87f5] rounded-2xl p-8 sm:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Customer Service?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Get started with AI Receptionist today and experience the future of customer service.
          </p>
          <Button 
            className="bg-white hover:bg-gray-100 text-[#6342ff] px-8 py-6 text-lg rounded-md flex items-center gap-2 mx-auto"
            onClick={handleGetStarted}
            data-cal-namespace="get-started-today"
            data-cal-link="team-powered-by-dfbtbb/get-started-today"
            data-cal-config='{"layout":"month_view"}'
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* No need for hidden button with direct Cal API approach */}
    </section>
  );
};
