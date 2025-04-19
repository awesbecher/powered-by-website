
import { ArrowRight } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      title: "Trigger",
      description: "Customer initiates contact via voice, email, or chat"
    },
    {
      title: "AI Agent Responds",
      description: "Intelligent processing and natural conversation"
    },
    {
      title: "Outcome",
      description: "Leads converted, support resolved, operations scaled"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-[#1a1a2e] rounded-2xl p-8 border border-white/10 hover:border-[#8B5CF6]/50 transition-colors">
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="w-8 h-8 text-[#8B5CF6]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
