
import React from 'react';
import { Clock, DollarSign, Target, ThumbsUp, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const BenefitsSection = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Save 20+ Hours Per Week",
      description: "Eliminate repetitive manual texting and follow-ups that consume your team's valuable time."
    },
    {
      icon: DollarSign,
      title: "Reduce Cost Per Lead",
      description: "Lower your acquisition costs by automating top-of-funnel activities and qualification."
    },
    {
      icon: Target,
      title: "Boost Response Rates",
      description: "Increase engagement by 2-3x with perfectly timed, personalized messages that resonate."
    },
    {
      icon: ThumbsUp,
      title: "Improve Customer Experience",
      description: "Deliver consistent, helpful communication that enhances your brand perception."
    }
  ];

  const keyStats = [
    { value: "280%", label: "Average increase in response rates" },
    { value: "73%", label: "Reduction in manual follow-up time" },
    { value: "2.5x", label: "More qualified leads" }
  ];

  return (
    <section className="py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left column - Benefits */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Why Choose AI Text Agent</h2>
          
          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-4">
                <div className="p-2 bg-[#6342ff]/20 rounded-lg h-fit">
                  <benefit.icon className="w-6 h-6 text-[#9b87f5]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <Button 
              data-cal-namespace="get-started-with-ai-sms-text-agents"
              data-cal-link="team-powered-by-dfbtbb/get-started-with-ai-sms-text-agents"
              data-cal-config='{"layout":"month_view"}'
              className="bg-[#6342ff] hover:bg-[#7352ff] text-white px-6 py-3 text-lg rounded-xl"
            >
              Experience the Benefits
            </Button>
          </div>
        </div>
        
        {/* Right column - Stats and proof */}
        <div className="bg-gradient-to-br from-[#2a1e43] to-[#1a0b2e] p-8 rounded-2xl border border-[#6342ff]/30">
          <h3 className="text-2xl font-bold text-white mb-6">Real Results for Businesses Like Yours</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {keyStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#9b87f5] mb-2">{stat.value}</div>
                <p className="text-gray-300 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#9b87f5] mt-0.5" />
              <p className="text-gray-300">Texts sent at optimal times based on recipient behavior</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#9b87f5] mt-0.5" />
              <p className="text-gray-300">Personalized content based on user data and context</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#9b87f5] mt-0.5" />
              <p className="text-gray-300">Human-like conversations that build rapport and trust</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#9b87f5] mt-0.5" />
              <p className="text-gray-300">Precise qualification to identify sales-ready leads</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
