
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Target, LineChart } from "lucide-react";

interface MissionSectionProps {
  initialLoad: boolean;
}

export const MissionSection = ({ initialLoad }: MissionSectionProps) => {
  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all duration-1000 delay-200 ease-out transform
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      
      <div className="text-center mb-12">
        <Badge className="mb-3 px-3 py-1 text-sm border-purple-400/30 bg-purple-400/10 text-purple-200">
          Our Mission
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why We Exist</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#9b87f5] to-[#6342ff] mx-auto"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="backdrop-blur-sm bg-[#2a1a47]/30 p-6 rounded-xl border border-[#9b87f5]/20 transition hover:border-[#9b87f5]/40 hover:bg-[#2a1a47]/40 duration-300">
          <div className="h-12 w-12 bg-gradient-to-br from-[#9b87f5] to-[#6342ff] rounded-lg flex items-center justify-center mb-5">
            <Lightbulb className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Empowering SMBs</h3>
          <p className="text-gray-300">
            We believe every business deserves access to world-class AI, not just tech giants with unlimited resources. Our mission is to democratize AI technology for the businesses that make up the backbone of our economy.
          </p>
        </div>
        
        <div className="backdrop-blur-sm bg-[#2a1a47]/30 p-6 rounded-xl border border-[#9b87f5]/20 transition hover:border-[#9b87f5]/40 hover:bg-[#2a1a47]/40 duration-300">
          <div className="h-12 w-12 bg-gradient-to-br from-[#9b87f5] to-[#6342ff] rounded-lg flex items-center justify-center mb-5">
            <Target className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Building AI Responsibly</h3>
          <p className="text-gray-300">
            We create AI solutions that are transparent, ethical, and designed with human oversight. Our technology empowers businesses without replacing the human touch that makes them special.
          </p>
        </div>
        
        <div className="backdrop-blur-sm bg-[#2a1a47]/30 p-6 rounded-xl border border-[#9b87f5]/20 transition hover:border-[#9b87f5]/40 hover:bg-[#2a1a47]/40 duration-300">
          <div className="h-12 w-12 bg-gradient-to-br from-[#9b87f5] to-[#6342ff] rounded-lg flex items-center justify-center mb-5">
            <LineChart className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Delivering Real Results</h3>
          <p className="text-gray-300">
            We focus on practical applications that deliver measurable ROI, not just fancy tech demos. Our AI solutions solve real business problems and create tangible value for our clients.
          </p>
        </div>
      </div>
    </section>
  );
};
