
import React from "react";
import { FAQItem } from "./FAQItem";

interface FAQSectionProps {
  initialLoad?: boolean;
}

export const FAQSection: React.FC<FAQSectionProps> = () => {
  return (
    <section id="faq" className="py-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <FAQItem 
          question="How human-like are your AI agents?"
          answer="Our AI agents are designed to be indistinguishable from human representatives. They can understand context, handle complex conversations, and adapt their tone to match your brand voice."
        />

        <FAQItem 
          question="What kind of businesses do you work with?"
          answer="We work with SMBs across various industries, including real estate, healthcare, retail, professional services, and more. Our solutions are customized to fit each industry's specific needs."
        />

        <FAQItem 
          question="Can I try before I buy?"
          answer="Yes! We offer a demo where you can experience our AI agents in action. Contact us to schedule a personalized demonstration tailored to your business."
        />

        <FAQItem 
          question="How long does implementation take?"
          answer="Typically, we can have your AI agents up and running within 1-2 weeks (sometime even in a day or two), depending on the complexity of your requirements and the number of agents you need."
        />
      </div>
    </section>
  );
};
