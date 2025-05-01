import React from 'react';
import PageLayout from "@/components/layout/PageLayout";
import { HeroSection } from "@/components/auto-dealer/HeroSection";
import { FeaturesGrid } from "@/components/auto-dealer/FeaturesGrid";
import { MetricsSection } from "@/components/auto-dealer/MetricsSection";
import { PlayHtAgent } from "@/components/auto-dealer/PlayHtAgent";
import { SEO } from "@/components/shared/SEO";
import Head from 'next/head';

const AutoDealer = () => {
  return (
    <PageLayout>
      <Head>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@play-ai/agent-web-sdk@ht"></script>
        <script type="text/javascript" dangerouslySetInnerHTML={{
          __html: `
            addEventListener("load", () => {
              PlayAI.open('MxWrNcBzfCl2Aqf7j61CR');
            });
          `
        }} />
      </Head>
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
