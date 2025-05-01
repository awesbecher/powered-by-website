import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { getCalApi } from "@calcom/embed-react";

export const FinalCTASection = () => {
  // Initialize Cal.com
  useEffect(() => {
    (async function () {
      try {
        console.log("Initializing Cal.com embed in TextAgent FinalCTASection");
        const cal = await getCalApi();
        cal("ui", {
          theme: "dark",
          cssVarsPerTheme: {
            light: {"cal-brand": "#292929"},
            dark: {"cal-brand": "#fafafa"}
          },
          hideEventTypeDetails: false,
          layout: "column_view"
        });
      } catch (error) {
        console.error("Error initializing Cal.com in TextAgent FinalCTASection:", error);
      }
    })();
  }, []);

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="bg-gradient-to-r from-[#6342ff] to-[#9b87f5] rounded-2xl p-8 sm:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Text Communication?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Get started with AI Text Agent today and experience the future of customer service.
          </p>
          <button 
            data-cal-link="team-powered-by-dfbtbb/get-started-today"
            data-cal-config='{"layout":"column_view","theme":"dark"}'
            className="bg-white hover:bg-gray-100 text-[#6342ff] px-8 py-6 text-lg rounded-md flex items-center gap-2 mx-auto"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};