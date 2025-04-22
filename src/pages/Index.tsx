
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { StatsSection } from "@/components/home/StatsSection";
import { WorkflowSection } from "@/components/home/WorkflowSection";
import { UseCaseGrid } from "@/components/home/UseCaseGrid";
import { getCalApi } from "@calcom/embed-react";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { CallToActionButtons } from "@/components/home/CallToActionButtons";
import { HomeCard } from "@/components/home/HomeCard";
import { GlobalVoiceChatDialog } from "@/components/shared/GlobalVoiceChatDialog";

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
    <div className="min-h-screen w-full bg-[#120b26] pb-12">
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>

      <div className="flex justify-center mt-8">
        <Button 
          onClick={() => navigate("/agent-gpt")}
          variant="outline"
          className="flex items-center gap-2 border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10 shadow-lg shadow-[#9b87f5]/10"
          size="lg"
        >
          <Bot size={20} />
          Agent Builder
        </Button>
      </div>

      {/* New Hero Section 2025 */}
      <HeroSection initialLoad={initialLoad} />

      <main className="mx-auto w-full max-w-5xl px-4 md:px-6 flex flex-col gap-8 mt-8">
        <HomeCard className="bg-[#232149]/60 p-6 md:p-10 flex flex-col items-center">
          <CallToActionButtons />
        </HomeCard>

        {WorkflowSection && (
          <HomeCard className="p-0 bg-gradient-to-br from-[#232149]/80 via-[#251949]/70 to-[#1a0b2e]/80">
            <WorkflowSection />
          </HomeCard>
        )}

        <HomeCard className="bg-gradient-to-br from-[#252148] to-[#181129]">
          <UseCaseGrid />
        </HomeCard>

        <HomeCard className="p-0 bg-gradient-to-br from-[#252148]/90 via-[#242145]/90 to-[#181129]/95">
          <StatsSection />
        </HomeCard>

        <HomeCard className="bg-[#232149]/80 text-white">
          <ClosingCTA useCalendly={true} />
        </HomeCard>
      </main>

      <Footer />
      
      <GlobalVoiceChatDialog />
    </div>
  );
};

export default Index;
