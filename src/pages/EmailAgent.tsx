
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { HeroSection } from '@/components/email-agent/page-sections/HeroSection';
import { FeaturesSection } from '@/components/email-agent/page-sections/FeaturesSection';
import { HowItWorksSection } from '@/components/email-agent/page-sections/HowItWorksSection';
import { ROISection } from '@/components/email-agent/page-sections/ROISection';
import { FAQSection } from '@/components/email-agent/page-sections/FAQSection';
import { FinalCTASection } from '@/components/email-agent/page-sections/FinalCTASection';
import { getCalApi } from "@calcom/embed-react";

const EmailAgent = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  
  // Remove initialLoad state after component mounts
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Initialize Cal.com with robust error handling
  useEffect(() => {
    (async function initializeCalcom() {
      try {
        console.log("Initializing Cal.com embed in EmailAgent page");
        
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
        }
        
        console.log("Cal.com embed initialized successfully in EmailAgent page");
      } catch (error) {
        console.error("Error initializing Cal.com embed in EmailAgent page:", error);
      }
    })();
  }, []);
  
  // Helper function to ensure Cal.com script is loaded
  const loadCalComScript = () => {
    return new Promise<void>((resolve, reject) => {
      // If script already exists, resolve immediately
      if (document.querySelector('script[src="https://app.cal.com/embed/embed.js"]')) {
        console.log("Cal.com script already loaded");
        resolve();
        return;
      }
      
      console.log("Loading Cal.com script");
      const script = document.createElement('script');
      script.src = "https://app.cal.com/embed/embed.js";
      script.onload = () => {
        console.log("Cal.com script loaded successfully");
        resolve();
      };
      script.onerror = (error) => {
        console.error("Failed to load Cal.com script:", error);
        reject(error);
      };
      document.head.appendChild(script);
    });
  };
  
  // Handle contact button clicks - direct Cal.com button trigger approach
  const handleContact = () => {
    console.log("Contact button clicked - triggering Cal.com");
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
      console.error("Failed to open Cal.com modal from EmailAgent:", err);
      // Fallback to button trigger
      const calButton = document.querySelector('[data-cal-link="team-powered-by-dfbtbb/get-started-with-ai-email-agents"]');
      if (calButton instanceof HTMLElement) {
        calButton.click();
      } else {
        console.error("Cal.com button not found in DOM");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0b2e] to-[#13151a]">
      <Navbar />
      <main>
        <HeroSection initialLoad={initialLoad} handleContact={handleContact} />
        <FeaturesSection />
        <HowItWorksSection />
        <ROISection />
        <FAQSection />
        <FinalCTASection handleContact={handleContact} />
      </main>
      <Footer />
      
      {/* Hidden Cal.com button that will be triggered programmatically if needed */}
      <button
        data-cal-link="team-powered-by-dfbtbb/get-started-with-ai-email-agents"
        data-cal-config='{"layout":"month_view"}'
        className="hidden"
      ></button>
    </div>
  );
};

export default EmailAgent;
