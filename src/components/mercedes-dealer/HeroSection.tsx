import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { getCalApi } from "@calcom/embed-react";

export const HeroSection = () => {
  // Initialize Cal.com
  useEffect(() => {
    (async function () {
      try {
        console.log("Initializing Cal.com embed in Mercedes Dealer Hero");
        const cal = await getCalApi();
        cal("ui", {
          theme: "dark",
          cssVarsPerTheme: {
            light: {"cal-brand": "#8B5CF6"},
            dark: {"cal-brand": "#8B5CF6"}
          },
          hideEventTypeDetails: false,
          layout: "column_view"
        });
      } catch (error) {
        console.error("Error initializing Cal.com in Mercedes Dealer Hero:", error);
      }
    })();
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/mercedes-showroom.jpg"
          alt="Mercedes Showroom"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-[5rem] leading-tight font-extrabold">
            <span className="text-[#8B5CF6]">AI Agents</span> for<br />
            Mercedes Dealers
          </h1>
          
          <p className="text-gray-700 text-xl md:text-2xl max-w-2xl mx-auto">
            Transform your dealership with intelligent AI agents that handle inquiries,
            schedule test drives, and qualify leads 24/7.
          </p>

          <div className="pt-4">
            <button
              data-cal-link="team-powered-by-dfbtbb/get-started-today"
              data-cal-config='{"layout":"column_view","theme":"dark"}'
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white 
                bg-[#8B5CF6] rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 
                transform transition-all duration-200 ease-out"
            >
              Get Your Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
