
import React from "react";
import { Users } from "lucide-react";

interface WhoWeAreSectionProps {
  initialLoad: boolean;
  whoWeAreRef: React.RefObject<HTMLDivElement>;
}

export const WhoWeAreSection = ({ initialLoad, whoWeAreRef }: WhoWeAreSectionProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div ref={whoWeAreRef} className={`transition-all duration-1000 delay-200 ease-out transform
        ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
        
        {/* Team Photo */}
        <div className="mb-8 max-w-2xl mx-auto">
          <img 
            src="/lovable-uploads/573aa598-a658-44ab-a9bd-9048d21051df.png" 
            alt="Powered By Team" 
            className="w-full h-auto rounded-2xl shadow-xl object-cover"
          />
        </div>

        <div className="flex items-center mb-6">
          <Users className="h-8 w-8 text-[#9b87f5] mr-3" />
          <h2 className="text-3xl font-bold text-white">Who We Are</h2>
        </div>
        
        <div className="space-y-6 text-gray-300 backdrop-blur-sm bg-[#2a1a47]/30 p-6 rounded-xl border border-[#9b87f5]/20">
          <p className="text-lg">
            <span className="bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md">Powered_by</span> is an agency that designs and builds bespoke AI agent solutions for diverse industries. From auto dealerships to real estate agencies, retail stores to hospitality providers, our team has a proven track record of delivering AI agent solutions that empower our clients to thrive and compete.
          </p>
          <p className="text-lg">
            Our founding thesis is that SMBs deserve the same access to the advanced AI systems currently deployed across the Fortune 500. We take the cutting-edge AI agent technology pioneered in Silicon Valley and make it deadly simple and economical to operate.
          </p>
          <p className="text-lg">
            Our team is composed of seasoned AI builders, forward deployed engineers, and SaaS startup executives with decades of combined software experience. We've mastered the intricacies of natural language processing, speech synthesis, and multi-channel communication systems, allowing us to build AI agents that seamlessly integrate into your existing workflows. We're experts in voice AI, email agents, process automation, and how to stack them together for a seamless experience.
          </p>
        </div>
      </div>
    </div>
  );
};
