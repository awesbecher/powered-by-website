import PageLayout from "@/components/layout/PageLayout";
import { HeroSection } from "@/components/auto-dealer/HeroSection";
import { MetricsSection } from "@/components/auto-dealer/MetricsSection";
import { FeaturesGrid } from "@/components/auto-dealer/FeaturesGrid";
import { PlayHtAgent } from "@/components/auto-dealer/PlayHtAgent";
import { SEO } from "@/components/shared/SEO";

const AutoDealer = () => {
  return (
    <>
      <SEO 
        title="AI Agents for Auto Dealers | Powered By"
        description="Transform your dealership with intelligent AI agents that handle inquiries, schedule test drives, and qualify leads 24/7."
      />
      <PageLayout>
        <div className="min-h-screen bg-gradient-to-b from-black to-[#1E1E1E] px-4 py-12">
          <div className="container mx-auto space-y-12">
            <HeroSection />
            <MetricsSection />
            <FeaturesGrid />
            <PlayHtAgent />
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default AutoDealer;
