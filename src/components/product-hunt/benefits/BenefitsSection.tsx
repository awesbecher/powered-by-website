
import React from "react";
import { BenefitItem } from "./BenefitItem";

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Why Small Businesses Choose Us
        </h2>
        <p className="text-xl text-gray-300">
          We make enterprise-grade AI solutions accessible and affordable for SMBs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <BenefitItem 
          title="No Coding Required"
          description="Our platform handles all the technical complexity, letting you focus on your business goals."
        />

        <BenefitItem 
          title="Affordable Plans"
          description="Pay only for what you use, with plans starting as low as $299/month for full AI agent capabilities."
        />

        <BenefitItem 
          title="Quick Deployment"
          description="Get your AI agents up and running in days, not months. Our team handles all the setup and training."
        />

        <BenefitItem 
          title="Full Customization"
          description="Your AI agents are tailored to your specific business needs, brand voice, and industry requirements."
        />
      </div>
    </section>
  );
};
