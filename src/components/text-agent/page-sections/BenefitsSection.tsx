import React, { useEffect } from 'react';
import { Clock, DollarSign, Target, ThumbsUp, CheckCircle2, ArrowRight } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";

export const BenefitsSection = () => {
  // Initialize Cal.com
  useEffect(() => {
    (async function () {
      try {
        console.log("Initializing Cal.com embed in TextAgent BenefitsSection");
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
        console.error("Error initializing Cal.com in TextAgent BenefitsSection:", error);
      }
    })();
  }, []);

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
          <div className="space-y-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="p-2 bg-[#9b87f5]/10 rounded-lg">
                      <Icon className="h-6 w-6 text-[#9b87f5]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                    <p className="text-gray-300">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-8">
            <button 
              data-cal-link="team-powered-by-dfbtbb/get-started-today"
              data-cal-config='{"layout":"column_view","theme":"dark"}'
              className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-4 text-lg rounded-md inline-flex items-center gap-2"
            >
              Experience the Benefits
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right column - Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {keyStats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white/5 rounded-xl">
              <div className="text-3xl font-bold text-[#9b87f5] mb-2">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
