
import { ArrowRight } from "lucide-react";

export const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Setup & Integration",
      description: "Connect your email accounts and CRM systems with a simple API or OAuth authentication. No coding required."
    },
    {
      number: "02",
      title: "Training & Customization",
      description: "Our AI learns your business language, products, and protocols through guided examples and your existing email data."
    },
    {
      number: "03",
      title: "Automated Email Handling",
      description: "The AI Email Agent begins processing incoming emails, generating responses, and handling inquiries based on your guidelines."
    },
    {
      number: "04",
      title: "Performance Optimization",
      description: "Monitor results and fine-tune your agent's behavior through our intuitive dashboard to maximize effectiveness."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl bg-[#1a0b2e]/30" id="how-it-works">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-16 text-center">How It Works</h2>
        
        <div className="relative">
          {/* Vertical line connecting steps */}
          <div className="absolute left-[45px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#9b87f5] to-[#6342ff] z-0 hidden md:block"></div>
          
          {/* Steps */}
          <div className="space-y-20">
            {steps.map((step, index) => (
              <div key={index} className="relative z-10">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Step number */}
                  <div className="flex-shrink-0">
                    <div className="w-[90px] h-[90px] rounded-full bg-gradient-to-br from-[#9b87f5] to-[#6342ff] flex items-center justify-center text-white text-4xl font-bold">
                      {step.number}
                    </div>
                  </div>
                  
                  {/* Step content */}
                  <div className="pt-3">
                    <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-300 text-lg">{step.description}</p>
                  </div>
                </div>
                
                {/* Arrow for all but the last step */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute -bottom-14 left-[45px] transform translate-x-0">
                    <ArrowRight className="h-8 w-8 text-[#9b87f5]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
