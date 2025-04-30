import React from 'react';
import { BadgeCheck, MessageSquare, Users, BarChart3, Zap, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const FeaturesSection = () => {
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

  const handleGetStarted = () => {
    const calBtn = document.querySelector('[data-cal-link="team-powered-by-dfbtbb/get-started-today"]');
    if (calBtn instanceof HTMLElement) {
      console.log("Cal.com button found, triggering click");
      calBtn.click();
    } else {
      console.error("Cal.com button not found in DOM, navigating to /contact as fallback");
      window.location.href = '/contact';
    }
  };

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#6342ff]/10 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[#6342ff]/10 rounded-full blur-3xl z-0"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Feature Highlights</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to automate and scale your sales outreach text messaging
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br from-[#1e1230] to-[#13151a] p-6 rounded-xl border border-white/5 hover:border-[#6342ff]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#6342ff]/10"
            >
              <div className="mb-4 p-3 bg-[#6342ff]/20 rounded-lg inline-block">
                <feature.icon className="w-6 h-6 text-[#9b87f5]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-5 text-base rounded-md flex items-center"
            onClick={handleGetStarted}
          >
            <ArrowRight className="mr-2 h-5 w-5" />
            See Features in Action
          </Button>

          {/* Hidden Cal.com button */}
          <button
            className="hidden"
            data-cal-link="team-powered-by-dfbtbb/get-started-today"
            data-cal-config='{"layout":"month_view"}'
          />
        </div>
      </div>
    </section>
  );
};
