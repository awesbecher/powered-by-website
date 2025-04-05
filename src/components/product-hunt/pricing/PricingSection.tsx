
import React from "react";
import { PricingCard } from "./PricingCard";

interface PricingSectionProps {
  initialLoad?: boolean;
}

export const PricingSection: React.FC<PricingSectionProps> = () => {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Simple Agent Pricing
        </h2>
        <p className="text-xl text-gray-300">
          Get started quickly & affordable. Just powerful AI agents that grow with your business.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PricingCard 
          title="Starter"
          price="$299"
          priceSuffix="/month/agent"
          description="Perfect for small businesses just getting started with AI agents."
          features={[
            "Up to 1,000 interactions/month",
            "Premium latency",
            "Basic support",
            "Basic customization",
            {text: "Deployment & integration services for additional fee", hasAsterisk: true}
          ]}
          buttonText="Get Started"
          usePopularButtonStyle={false}
        />

        <PricingCard 
          title="Growth"
          price="$599"
          priceSuffix="/month/agent"
          description="For businesses ready to expand their AI agent capabilities."
          features={[
            "Up to 2,500 interactions/month",
            "Ultra-low latency",
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
          tallyFormId="w2og9b"
        />
      </div>
    </section>
  );
};
