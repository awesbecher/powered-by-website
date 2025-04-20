import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import AnnouncementBanner from "@/components/layout/AnnouncementBanner";
import Footer from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { NavigationButtons } from "@/components/home/NavigationButtons";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { StatsSection } from "@/components/home/StatsSection";
import { WorkflowSection } from "@/components/home/WorkflowSection";
import { UseCaseGrid } from "@/components/home/UseCaseGrid";
import { getCalApi } from "@calcom/embed-react";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { CallToActionButtons } from "@/components/home/CallToActionButtons";

const Index = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setInitialLoad(false);
    window.scrollTo(0, 0);
    
    (async function () {
      try {
        const cal = await getCalApi();
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
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="sticky top-0 z-50 w-full">
        <AnnouncementBanner />
        <Navbar />
      </div>

      {/* Agent Builder Button */}
      <div className="flex justify-center mt-8">
        <Button 
          onClick={() => navigate("/agent-gpt")}
          variant="outline"
          className="flex items-center gap-2 border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10"
          size="lg"
        >
          <Bot size={20} />
          Agent Builder
        </Button>
      </div>

      {/* Hero Section */}
      <HeroSection initialLoad={initialLoad} />

      {/* Call to Action Buttons */}
      <div className="mt-8 px-4">
        <CallToActionButtons />
      </div>
      
      {/* Navigation Buttons */}
      <NavigationButtons />
      
      {/* Workflow Section */}
      <WorkflowSection />

      {/* Use Cases Grid */}
      <UseCaseGrid />

      {/* Stats Section */}
      <StatsSection />

      {/* Final CTA */}
      <ClosingCTA useCalendly={true} />

      <Footer />
    </div>
  );
};

export default Index;
