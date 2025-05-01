import React, { useEffect } from 'react';
import PageLayout from "@/components/layout/PageLayout";
import { HeroSection } from "@/components/auto-dealer/HeroSection";
import { FeaturesGrid } from "@/components/auto-dealer/FeaturesGrid";
import { MetricsSection } from "@/components/auto-dealer/MetricsSection";
import { SEO } from "@/components/shared/SEO";
import { getCalApi } from "@calcom/embed-react";

const AutoDealer = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Initialize Cal.com at the page level for better reliability
    (async function () {
      try {
        console.log("Initializing Cal.com embed at Auto Dealer page level");
        const cal = await getCalApi();
        if (cal) {
          cal("ui", {
            "cssVarsPerTheme": {
              "light": {"cal-brand":"#8B5CF6"},
              "dark": {"cal-brand":"#8B5CF6"}
            },
            "hideEventTypeDetails": false,
            "layout": "month_view"
          });
          
          // Preload the calendar link
          cal("preload", { calLink: "team-powered-by-dfbtbb/get-started-today" });
          
          console.log("Cal.com embed initialized successfully at Auto Dealer page level");
        } else {
          console.error("Cal API not available in Auto Dealer page");
        }
      } catch (error) {
        console.error("Error initializing Cal.com embed at Auto Dealer page level:", error);
      }
    })();
  }, []);

  return (
    <PageLayout>
      <SEO 
        title="AI Agents for Auto Dealers | Powered By"
        description="Transform your dealership with intelligent AI agents that handle inquiries, schedule test drives, and qualify leads 24/7."
      />
      <main className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
        <HeroSection />
        <FeaturesGrid />
        <MetricsSection />
      </main>
    </PageLayout>
  );
};

export default AutoDealer;
