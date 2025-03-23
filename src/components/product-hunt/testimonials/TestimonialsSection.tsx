
import React from "react";
import { TestimonialCard } from "./TestimonialCard";

export const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#1a0b2e] via-[#2f1c4a]/80 to-[#1a0b2e] border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard 
            quote="Our AI receptionist handles over 200 calls daily, scheduling appointments and answering questions. This has freed up our staff to focus on more complex customer needs."
            name="Dr. Helen Tong"
            role="Dental Practice Owner"
            initials="HT"
          />

          <TestimonialCard 
            quote="The email AI agent has transformed our lead response time from days to minutes. We've seen a 40% increase in conversion rates since implementation."
            name="Greg Gilpatrick"
            role="Real Estate Agency"
            initials="GG"
          />

          <TestimonialCard 
            quote="Using Voice AI Agents to automate our phone follow-up to the marketing leads in our CRM has increased our dealership customer return rate five-fold."
            name="Jeremy Tompkins"
            role="Auto Dealership"
            initials="JT"
          />

          <TestimonialCard 
            quote="We implemented the text-based AI for customer service, and it now handles 75% of our inquiries without human intervention. Our customer satisfaction has never been higher."
            name="Stephanie Turner"
            role="Retail Business Owner"
            initials="ST"
          />
        </div>
      </div>
    </section>
  );
};
