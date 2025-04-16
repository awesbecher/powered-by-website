
import { Check, MessageSquare, Settings, UserPlus, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HowItWorksSection = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Import Your Contacts",
      description: "Import your leads and customers from any CRM or upload a spreadsheet of contacts.",
    },
    {
      icon: Settings,
      title: "Configure Your Campaign",
      description: "Set your messaging strategy, create personalized templates, and establish triggers for follow-ups.",
    },
    {
      icon: MessageSquare,
      title: "AI Takes Over",
      description: "Our AI handles all conversations, personalizing each message and responding intelligently to inquiries.",
    },
    {
      icon: BarChart3,
      title: "Track Results & Optimize",
      description: "Monitor engagement metrics, conversion rates, and optimize your campaign performance over time.",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How Text Agent Works</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Get started in minutes with our simple setup process and start seeing results immediately.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            {/* Step number */}
            <div className="absolute -left-4 -top-4 w-8 h-8 rounded-full bg-[#6342ff] flex items-center justify-center text-white font-bold z-10">
              {index + 1}
            </div>
            
            {/* Connection line between steps */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-12 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#6342ff] to-transparent z-0"></div>
            )}
            
            {/* Step card */}
            <div className="bg-[#222222]/80 backdrop-blur-lg p-6 rounded-xl h-full border border-white/10 hover:border-[#6342ff]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#6342ff]/20">
              <div className="mb-4 p-3 bg-[#6342ff]/20 rounded-lg inline-block">
                <step.icon className="w-6 h-6 text-[#9b87f5]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <Button 
          data-cal-link="team-powered-by-dfbtbb/get-started-with-ai-sms-text-agents"
          data-cal-config='{"layout":"month_view"}'
          className="bg-[#6342ff] hover:bg-[#7352ff] text-white px-6 py-3 text-lg rounded-xl"
          onClick={() => {
            console.log("Get Started Today button clicked in HowItWorksSection");
            try {
              // Direct modal trigger approach
              (window as any).Cal?.('ui', {
                styles: { branding: { brandColor: '#000000' } },
                hideEventTypeDetails: false,
                layout: 'month_view',
              });
              (window as any).Cal?.('showModal', {
                calLink: "team-powered-by-dfbtbb/get-started-with-ai-sms-text-agents",
                config: {
                  layout: 'month_view',
                },
              });
            } catch (err) {
              console.error("Failed to open Cal.com modal from HowItWorksSection:", err);
            }
          }}
        >
          Get Started Today
        </Button>
      </div>
    </section>
  );
};
