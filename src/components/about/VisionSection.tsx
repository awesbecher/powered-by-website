import React from 'react';
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/shared/OptimizedImage";
import "@/components/ui/animations.css";

interface VisionSectionProps {
  initialLoad: boolean;
}

export const VisionSection = ({ initialLoad }: VisionSectionProps) => {
  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all duration-1000 delay-400 ease-out transform
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}
      aria-labelledby="vision-heading">
      
      {/* Reduced Size Image Section */}
      <div className="mb-12 max-w-3xl mx-auto">
        <OptimizedImage 
          src="/assets/images/fd6bacaa-f5ae-46d3-ad21-ca95b78e1537.png" 
          alt="AI Agents for SMBs Presentation - Visual representation of our vision" 
          className="w-full h-auto rounded-2xl shadow-xl object-cover animate-fade-in"
        />
      </div>
      
      <div className="backdrop-blur-md bg-gradient-to-br from-[#2a1a47]/40 to-[#1a0b2e]/40 rounded-2xl border border-[#9b87f5]/20 p-8 md:p-12 animate-scale-in">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-purple-400/30 bg-purple-400/10 text-purple-200 shadow-sm shadow-purple-500/20">
            Our Vision
          </div>
          
          <h2 id="vision-heading" className="text-3xl md:text-4xl font-bold text-white mb-8">The Future We're Building</h2>
          
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            We're not just building agents. We're building a future where your systems work for you—on voice, text, email, and beyond. A future where AI seamlessly integrates into your business processes, empowers your team, and creates exceptional experiences for your customers.
          </p>
          
          <p className="text-xl text-[#9b87f5] font-medium">
            This is the democratization of AI—making enterprise-grade technology accessible, affordable, and actionable for businesses of all sizes.
          </p>
        </div>
      </div>
    </section>
  );
};
