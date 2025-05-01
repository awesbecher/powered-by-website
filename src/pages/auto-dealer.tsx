import React from 'react';
import PageLayout from "@/components/layout/PageLayout";
import { PlayHtAgent } from "@/components/auto-dealer/PlayHtAgent";
import { SEO } from "@/components/shared/SEO";

const AutoDealer: React.FC = () => {
  return (
    <>
      <SEO 
        title="AI Agents for Auto Dealers | Powered By"
        description="Transform your dealership with intelligent AI agents that handle inquiries, schedule test drives, and qualify leads 24/7."
      />
      <PageLayout>
        <div className="min-h-screen bg-white px-4 py-12">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold mb-8">Auto Dealer Demo</h1>
            <PlayHtAgent />
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default AutoDealer;
