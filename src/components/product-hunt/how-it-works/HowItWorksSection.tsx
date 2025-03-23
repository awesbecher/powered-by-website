
import React from "react";
import { StepItem } from "./StepItem";

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="pt-6 pb-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          How It Works
        </h2>
        <p className="text-xl text-gray-300">
          Getting started with Powered_by AI agents is simple
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <StepItem 
          number={1}
          title="Consultation"
          description="We'll discuss your business needs and determine which AI agents are right for you."
        />

        <StepItem 
          number={2}
          title="Customization"
          description="We customize your AI agents to match your brand voice and specific business requirements."
        />

        <StepItem 
          number={3}
          title="Deployment"
          description="We handle all the technical setup and integration with your existing systems."
        />

        <StepItem 
          number={4}
          title="Optimization"
          description="We continuously monitor and improve your AI agents' performance based on real interactions."
        />
      </div>
    </section>
  );
};
