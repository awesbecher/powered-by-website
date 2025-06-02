import React, { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { HeroSection } from "@/components/ai-agency/HeroSection";
import { BusinessValueSection } from "@/components/ai-agency/BusinessValueSection";
import { UseCasesSection } from "@/components/ai-agency/UseCasesSection";
import { ProjectApproachSection } from "@/components/ai-agency/ProjectApproachSection";
import { LiveAgentSection } from "@/components/ai-agency/LiveAgentSection";
import { FinalCTABanner } from "@/components/ai-agency/FinalCTABanner";
import { EducateSection } from "@/components/ai-agency/EducateSection";
import { CustomAgentsSection } from "@/components/ai-agency/CustomAgentsSection";
import { SEO } from "@/components/shared/SEO";
import { getCalApi } from "@calcom/embed-react";

const Index = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Initialize Cal.com at the page level for better reliability
    (async function () {
      try {
        console.log("Initializing Cal.com embed at Index page level");
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
          
          // Preload the calendar link
          cal("preload", { calLink: "team-powered-by-dfbtbb/get-started-today" });
          
          console.log("Cal.com embed initialized successfully at Index page level");
        } else {
          console.error("Cal API not available in Index page");
        }
      } catch (error) {
        console.error("Error initializing Cal.com embed at Index page level:", error);
      }
    })();
  }, []);

  return (
    <PageLayout>
      <SEO />
      <main>
        <section id="hero-section" className="relative">
          <HeroSection initialLoad={initialLoad} />
        </section>
        
        <section id="custom-agents-section">
          <CustomAgentsSection />
        </section>
        
        <section id="educate-section">
          <EducateSection />
        </section>
        
        <section id="use-cases-section">
          <UseCasesSection />
        </section>
        
        <section id="live-agent-section">
          <LiveAgentSection />
        </section>
        
        <section id="project-approach-section">
          <ProjectApproachSection />
        </section>
        
        <section id="business-value-section">
          <BusinessValueSection />
        </section>
        
        <section id="cta-section">
          <FinalCTABanner />
        </section>
      </main>
    </PageLayout>
  );
};

export default Index;
