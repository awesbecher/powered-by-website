
import React from "react";
import { PricingCard } from "./PricingCard";

export const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Simple, Transparent Pricing
        </h2>
        <p className="text-xl text-gray-300">
          Get started quickly & affordable. Just powerful AI agents that grow with your business.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PricingCard 
          title="Starter"
          price="$299"
          description="Perfect for small businesses just getting started with AI agents."
          features={[
            "1 AI Agent Type",
            "Up to 1,000 interactions/month",
            "Business hours support",
            "Basic customization",
            {text: "Deployment & integration services for additional fee", hasAsterisk: true}
          ]}
          buttonText="Get Started"
          usePopularButtonStyle={true}
        />

        <PricingCard 
          title="Growth"
          price="$599"
          description="For businesses ready to expand their AI agent capabilities."
          features={[
            "2 AI Agent Types",
            "Up to 5,000 interactions/month",
            "Priority support",
            "Advanced customization",
            {text: "Deployment & integration services for additional fee", hasAsterisk: true}
          ]}
          popular={true}
          buttonText="Get Started"
        />

        <PricingCard 
          title="Enterprise"
          description="For businesses with complex AI agent needs and higher volume."
          features={[
            "All AI Agent Types",
            "Unlimited interactions",
            "24/7 dedicated support",
            "Full customization",
            "Advanced analytics & reporting",
            "API access",
          ]}
          buttonText="Contact Sales"
          contactSalesEmail="sales@poweredby.agency"
        />
      </div>
    </section>
  );
};
