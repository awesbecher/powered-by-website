
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { DemoHero } from "@/components/demo/DemoHero";
import { InteractiveDemoSection } from "@/components/demo/InteractiveDemoSection";
import { KeyBenefitsSection } from "@/components/demo/KeyBenefitsSection";
import { TechnicalSection } from "@/components/demo/TechnicalSection";
import { DemoFAQSection } from "@/components/demo/DemoFAQSection";
import { FinalCTASection } from "@/components/demo/FinalCTASection";
import { getCalApi } from "@calcom/embed-react";

const Demo = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  // Initialize Cal.com when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    setInitialLoad(false);
    
    (async function () {
      try {
        console.log("Initializing Cal.com embed on Demo page");
        const cal = await getCalApi();
        cal("ui", {
          "cssVarsPerTheme": {
            "light": {"cal-brand":"#292929"},
            "dark": {"cal-brand":"#fafafa"}
          },
          "hideEventTypeDetails": false,
          "layout": "month_view"
        });
        console.log("Cal.com embed initialized successfully on Demo page");
      } catch (error) {
        console.error("Error initializing Cal.com embed on Demo page:", error);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0f0a19] text-white relative">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[#6342ff]/10 blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#9b87f5]/10 blur-[100px]"></div>
      </div>

      <div className="relative z-10">
        <Navbar />
        
        {/* Main content sections */}
        <DemoHero initialLoad={initialLoad} />
        <InteractiveDemoSection />
        <KeyBenefitsSection />
        <TechnicalSection />
        <DemoFAQSection />
        <FinalCTASection />
        
        <Footer />
      </div>
      
      {/* Hidden Cal.com button that will be triggered programmatically */}
      <button
        data-cal-link="team-powered-by-dfbtbb/get-started-today"
        data-cal-config='{"layout":"month_view"}'
        className="hidden"
      ></button>
    </div>
  );
};

export default Demo;
