
import React, { useState, useEffect } from 'react';
import Navbar from "@/components/layout/Navbar";
import AnnouncementBanner from "@/components/layout/AnnouncementBanner";
import Footer from "@/components/layout/Footer";
import { HeroSection } from "@/components/ai-agency/HeroSection";
import { UniqueAgencySection } from "@/components/ai-agency/UniqueAgencySection";
import { DifferenceSection } from "@/components/ai-agency/DifferenceSection";
import { ProjectApproachSection } from "@/components/ai-agency/ProjectApproachSection";
import { PartnershipSection } from "@/components/ai-agency/PartnershipSection";
import { FinalCTASection } from "@/components/ai-agency/FinalCTASection";
import { SocialProofSection } from "@/components/product-hunt/social-proof/SocialProofSection";
import { TestimonialSection } from "@/components/ai-agency/TestimonialSection";
import { ComparisonSection } from "@/components/ai-agency/ComparisonSection";
import { getCalApi } from "@calcom/embed-react";

const AIAgency = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Initialize Cal.com at the page level for better reliability
    (async function () {
      try {
        console.log("Initializing Cal.com embed at AIAgency page level");
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
          
          console.log("Cal.com embed initialized successfully at AIAgency page level");
        } else {
          console.error("Cal API not available in AIAgency page");
        }
      } catch (error) {
        console.error("Error initializing Cal.com embed at AIAgency page level:", error);
      }
    })();
    
    // Force load the Cal.com script if it's not already loaded
    const loadCalScript = () => {
      if (document.querySelector('script[src="https://app.cal.com/embed/embed.js"]')) {
        console.log("Cal.com script already exists");
        return;
      }
      
      console.log("Loading Cal.com script manually");
      const script = document.createElement('script');
      script.src = "https://app.cal.com/embed/embed.js";
      script.async = true;
      script.onload = () => console.log("Cal.com script loaded manually");
      script.onerror = (e) => console.error("Error loading Cal.com script:", e);
      document.head.appendChild(script);
    };
    
    loadCalScript();
  }, []);

  // Function to manually trigger Cal.com modal
  const triggerCalModal = () => {
    try {
      console.log("Attempting to trigger Cal.com modal manually");
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
    } catch (error) {
      console.error("Failed to trigger Cal.com modal manually:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="sticky top-0 z-50 w-full">
        <AnnouncementBanner />
        <Navbar />
      </div>
      
      <div id="hero">
        <HeroSection initialLoad={initialLoad} />
      </div>
      
      <UniqueAgencySection />
      
      <DifferenceSection />
      
      <ProjectApproachSection />
      
      <TestimonialSection />
      
      <ComparisonSection />
      
      <PartnershipSection />
      
      <SocialProofSection />
      
      <FinalCTASection />
      
      <Footer />

      {/* Background decorations */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20 pointer-events-none z-0" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20 pointer-events-none z-0" />
      
      {/* Hidden Cal.com button that will be triggered programmatically if needed as fallback */}
      <button
        id="cal-button-global"
        onClick={triggerCalModal}
        data-cal-link="team-powered-by-dfbtbb/get-started-today"
        data-cal-config='{"layout":"month_view"}'
        className="hidden"
      ></button>
    </div>
  );
};

export default AIAgency;
