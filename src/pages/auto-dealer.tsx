import React, { useEffect } from 'react';
import PageLayout from "@/components/layout/PageLayout";
import { HeroSection } from "@/components/auto-dealer/HeroSection";
import { FeaturesGrid } from "@/components/auto-dealer/FeaturesGrid";
import { MetricsSection } from "@/components/auto-dealer/MetricsSection";
import { PlayHtAgent } from "@/components/auto-dealer/PlayHtAgent";
import { SEO } from "@/components/shared/SEO";

const AutoDealer = () => {
  useEffect(() => {
    // Load Play.ht script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.jsdelivr.net/npm/@play-ai/agent-web-sdk@ht';
    script.onload = () => {
      // Initialize agent after script loads
      const initScript = document.createElement('script');
      initScript.type = 'text/javascript';
      initScript.text = `
        PlayAI.open('MxWrNcBzfCl2Aqf7j61CR');
      `;
      document.body.appendChild(initScript);
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup scripts when component unmounts
      const scripts = document.querySelectorAll('script[src="https://cdn.jsdelivr.net/npm/@play-ai/agent-web-sdk@ht"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return (
    <PageLayout>
      <SEO 
        title="AI Agents for Auto Dealers | Powered By"
        description="Transform your dealership with intelligent AI agents that handle inquiries, schedule test drives, and qualify leads 24/7."
      />
      <main className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
        <PlayHtAgent />
        <HeroSection />
        <FeaturesGrid />
        <MetricsSection />
      </main>
    </PageLayout>
  );
};

export default AutoDealer;
