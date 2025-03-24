
import React from "react";
import { TestimonialCard } from "./TestimonialCard";
import { Star } from "lucide-react";

interface TestimonialsSectionProps {
  initialLoad?: boolean;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#1a0b2e] via-[#2f1c4a]/80 to-[#1a0b2e] border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            What Our Customers Say
          </h2>
        </div>

        {/* Social Proof Stats - Moved from separate section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center justify-center py-2">
              <div className="flex items-center mb-1">
                <Star className="text-yellow-400 w-5 h-5 mr-1" fill="#facc15" />
                <Star className="text-yellow-400 w-5 h-5 mr-1" fill="#facc15" />
                <Star className="text-yellow-400 w-5 h-5 mr-1" fill="#facc15" />
                <Star className="text-yellow-400 w-5 h-5 mr-1" fill="#facc15" />
                <div className="relative w-5 h-5 mr-1">
                  <Star className="text-yellow-400 w-5 h-5 absolute top-0 left-0" />
                  <div className="absolute top-0 left-0 w-3/4 h-5 overflow-hidden">
                    <Star className="text-yellow-400 w-5 h-5" fill="#facc15" />
                  </div>
                </div>
              </div>
              <span className="text-white text-lg font-medium">4.75/5 Rating</span>
            </div>
            
            <div className="flex flex-col items-center justify-center py-2">
              <span className="font-bold text-white text-2xl mb-1">50+</span>
              <span className="text-gray-300">SMBs Powered_by</span>
            </div>
            
            <div className="flex flex-col items-center justify-center py-2">
              <span className="font-bold text-white text-2xl mb-1">$2M</span>
              <span className="text-gray-300">in revenue generated</span>
            </div>
            
            <div className="flex flex-col items-center justify-center py-2">
              <span className="font-bold text-white text-2xl mb-1">96%</span>
              <span className="text-gray-300">customer satisfaction</span>
            </div>
          </div>
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
            quote="I am truly impressed with the quality of the AI voice agents we have implemented to handle incoming customer calls. The tech is getting better every day."
            name="Ahmet Demir"
            role="IT Consultancy"
            initials="AD"
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
