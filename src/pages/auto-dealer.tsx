import React from 'react';
import PageLayout from "@/components/layout/PageLayout";
import { HeroSection } from "@/components/auto-dealer/HeroSection";
import { FeaturesGrid } from "@/components/auto-dealer/FeaturesGrid";
import { MetricsSection } from "@/components/auto-dealer/MetricsSection";
import { PlayHtAgent } from "@/components/auto-dealer/PlayHtAgent";
import { SEO } from "@/components/shared/SEO";
import Script from 'next/script';

const AutoDealer = () => {
  return (
    <PageLayout>
      <SEO 
        title="AI Agents for Auto Dealers | Powered By"
        description="Transform your dealership with intelligent AI agents that handle inquiries, schedule test drives, and qualify leads 24/7."
      />
      <Script src="https://cdn.jsdelivr.net/npm/@play-ai/agent-web-sdk@ht" />
      <Script id="playht-init">
        {`
          addEventListener("load", () => {
            PlayAI.open('MxWrNcBzfCl2Aqf7j61CR');
          });
        `}
      </Script>
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
