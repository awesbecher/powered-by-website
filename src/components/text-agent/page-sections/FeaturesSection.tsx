import React, { useEffect } from 'react';
import { BadgeCheck, MessageSquare, Users, BarChart3, Zap, ShieldCheck } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { getCalApi } from "@calcom/embed-react";

export const FeaturesSection = () => {
  // Initialize Cal.com
  useEffect(() => {
    (async function () {
      try {
        console.log("Initializing Cal.com embed in TextAgent FeaturesSection");
        const cal = await getCalApi();
        cal("ui", {
          theme: "dark",
          cssVarsPerTheme: {
            light: {"cal-brand": "#292929"},
            dark: {"cal-brand": "#fafafa"}
          },
          hideEventTypeDetails: false,
          layout: "column_view"
        });
      } catch (error) {
        console.error("Error initializing Cal.com in TextAgent FeaturesSection:", error);
      }
    })();
  }, []);

  const features = [
    {
      icon: MessageSquare,
      title: "AI-Powered Conversations",
      description: "Engage in human-like text conversations with leads and customers using advanced natural language processing."
    },
    {
      icon: Users,
      title: "CRM Integration",
      description: "Seamlessly connect with your existing CRM systems including Salesforce, HubSpot, and more."
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track engagement metrics, conversion rates, and campaign performance in real-time."
    },
    {
      icon: Zap,
      title: "Automated Campaigns",
      description: "Set up trigger-based text campaigns that automatically nurture leads through your sales funnel."
    },
    {
      icon: BadgeCheck,
      title: "Personalization at Scale",
      description: "Customize messages based on user behavior, demographics, and interaction history."
    },
    {
      icon: ShieldCheck,
      title: "Compliance & Security",
      description: "Built-in TCPA compliance features and enterprise-grade security protocols."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Powerful Features for Modern Businesses
        </h2>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Our AI Text Agent comes packed with everything you need to automate and scale your text communication.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
              <Icon className="h-8 w-8 text-[#9b87f5] mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <button 
          data-cal-link="team-powered-by-dfbtbb/get-started-today"
          data-cal-config='{"layout":"column_view","theme":"dark"}'
          className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-4 text-lg rounded-md inline-flex items-center gap-2"
        >
          See Features in Action
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
