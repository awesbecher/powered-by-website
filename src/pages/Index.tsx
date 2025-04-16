
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import AnnouncementBanner from "@/components/layout/AnnouncementBanner";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { ValuesSection } from "@/components/home/ValuesSection";
import { BlogSection } from "@/components/home/BlogSection";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { CallToActionButtons } from "@/components/home/CallToActionButtons";
import { SectionTitle } from "@/components/home/SectionTitle";
import { AgentTypes } from "@/components/home/AgentTypes";
import AIAgentIllustration from "@/components/home/AIAgentIllustration";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getCalApi } from "@calcom/embed-react";

const Index = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setInitialLoad(false);
    
    // Initialize Cal.com with consistent namespace and team link
    (async function () {
      try {
        console.log("Initializing Cal.com embed at Index page level");
        const cal = await getCalApi({"namespace":"get-started-today"});
        cal("ui", {
          "cssVarsPerTheme": {
            "light": {"cal-brand":"#292929"},
            "dark": {"cal-brand":"#fafafa"}
          },
          "hideEventTypeDetails": false,
          "layout": "month_view"
        });
        console.log("Cal.com embed initialized successfully at Index page level");
      } catch (error) {
        console.error("Error initializing Cal.com embed at Index page level:", error);
      }
    })();
  }, []);

  const handleNavigation = (path: string) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  // Function to handle opening the voice chat dialog
  const handleOpenVoiceDialog = () => {
    console.log("Opening voice dialog from Index page");
    document.dispatchEvent(new CustomEvent('open-voice-dialog'));
  };
  
  // Function to handle Cal.com button click
  const handleCalendarClick = () => {
    console.log("Calendar button clicked in Index page");
    // Try to find and click the Cal.com button
    const calBtn = document.querySelector('[data-cal-link="team-powered-by-dfbtbb/get-started-today"]');
    if (calBtn instanceof HTMLElement) {
      console.log("Cal.com button found in Index page, triggering click");
      calBtn.click();
    } else {
      console.error("Cal.com button not found in DOM from Index page");
      // Fallback to navigate to contact page
      navigate("/contact");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="sticky top-0 z-50 w-full">
        <AnnouncementBanner />
        <Navbar />
      </div>
      
      <div className="w-full flex justify-center mt-4 mb-6">
        <div className={`transition-all duration-1000 ease-out transform ${initialLoad ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <Link to="/agent-gpt" className="inline-block group">
            <Button 
              className="bg-[#0F172A] hover:bg-[#1A1F2C] text-white px-6 py-6 text-lg rounded-md transition-all duration-300 hover:scale-105 border-2 border-white group-hover:shadow-lg group-hover:shadow-[#9b87f5]/30"
              size="xl"
            >
              Build an AI Voice Agent Now
              <ArrowRight className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="pt-0">
        <HeroSection initialLoad={initialLoad} />
      </div>

      <div className="text-center px-6 mb-12 mt-2">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 max-w-4xl mx-auto leading-[1.1]">
          Custom AI Agent Solutions.{" "}
          <span className="text-[#9b87f5] block mt-4 bg-gradient-to-r from-[#9b87f5] to-[#7a6cc5] bg-clip-text text-transparent">
            Quick. Easy. Powerful.
          </span>
        </h2>
      </div>

      <div className="relative z-10 mb-16">
        <FeaturesGrid />
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center px-6 mb-6">
        <CallToActionButtons 
          handleNavigation={handleNavigation}
          setShowDialog={handleOpenVoiceDialog}
        />
      </div>
      
      <div className="relative z-10 mb-8">
        <div className="w-full max-w-xl mx-auto">
          <AIAgentIllustration />
        </div>
      </div>

      <div className="container mx-auto px-4 mb-8">
        <SectionTitle title="Deploy Multi-Channel Agents:" linked={false} />
        <AgentTypes />
      </div>

      <div className="container mx-auto px-4 mb-8">
        <SectionTitle title="Our Approach:" linked={false} />
      </div>

      <ValuesSection />
      <BlogSection />
      <ClosingCTA 
        useCalendly={true}
        onContactClick={() => {
          console.log("Contact button clicked in Index page");
          
          // Try to find and click the Cal.com button
          const calBtn = document.querySelector('[data-cal-link="team-powered-by-dfbtbb/get-started-today"]');
          if (calBtn instanceof HTMLElement) {
            console.log("Cal.com button found in Index page, triggering click");
            calBtn.click();
          } else {
            console.error("Cal.com button not found in DOM from Index page");
            // Fallback navigation to contact page
            navigate("/contact");
          }
        }}
      />
      <Footer />

      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
      
      {/* Hidden Cal.com button that will be triggered programmatically */}
      <button
        data-cal-namespace="get-started-today"
        data-cal-link="team-powered-by-dfbtbb/get-started-today"
        data-cal-config='{"layout":"month_view"}'
        className="hidden"
      ></button>
    </div>
  );
};

export default Index;
