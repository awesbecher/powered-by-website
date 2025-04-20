
import React from 'react';
import { Button } from "@/components/ui/button";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";

const Contact = () => {
  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({"namespace":"try-now"});
        cal("ui", {
          "cssVarsPerTheme": {
            "light": {"cal-brand":"#292929"},
            "dark": {"cal-brand":"#fafafa"}
          },
          "hideEventTypeDetails": false,
          "layout": "month_view"
        });
      } catch (error) {
        console.error("Error initializing Cal.com embed:", error);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Book a Consultation
        </h1>
        <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
          Schedule a personalized consultation with our AI experts to explore how our AI agents can transform your business communication.
        </p>
        
        {/* Reduced margin from mb-10 to mb-6 */}
        <div className="w-full max-w-4xl mx-auto mb-6">
          <div 
            data-cal-namespace="try-now"
            data-cal-link="team-powered-by-dfbtbb/get-started-today"
            data-cal-config='{"layout":"month_view"}'
          ></div>
        </div>

        <div className="mt-6">
          <Button 
            className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white px-8 py-6 text-lg rounded-md"
            onClick={() => {
              const calButton = document.querySelector('[data-cal-link="team-powered-by-dfbtbb/get-started-today"]');
              if (calButton instanceof HTMLElement) {
                calButton.click();
              }
            }}
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
