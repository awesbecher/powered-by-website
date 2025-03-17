
import React from "react";
import { Mic, Settings, Clock, ShieldCheck, Share2 } from "lucide-react";
import { FeatureIcon } from "./FeatureIcon";

interface FeaturesListProps {
  initialLoad: boolean;
}

export const FeaturesList: React.FC<FeaturesListProps> = ({ initialLoad }) => {
  return (
    <div className={`w-full lg:w-[45%] transition-all duration-1000 ease-out transform pt-0
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
        Remarkably Human-like<br />Voice AI For Your Website
      </h2>
      
      <div className="space-y-8 mt-8">
        <div className="flex items-start gap-4">
          <FeatureIcon icon={Mic} />
          <div>
            <h3 className="text-2xl font-bold text-white">State-of-the-art AI Voices</h3>
            <p className="text-gray-300 mt-2">Deploy AI voice agents with astoundingly human speech & cadence.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <FeatureIcon icon={Settings} />
          <div>
            <h3 className="text-2xl font-bold text-white">Fully Customizable</h3>
            <p className="text-gray-300 mt-2">Voice agents that trained on your business & customer needs and learn & adapt.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <FeatureIcon icon={Clock} />
          <div>
            <h3 className="text-2xl font-bold text-white">24/7 Scalability</h3>
            <p className="text-gray-300 mt-2">Run voice agents day or night, making as many calls as needed simultaneously.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <FeatureIcon icon={ShieldCheck} />
          <div>
            <h3 className="text-2xl font-bold text-white">Built-in Compliance & Security</h3>
            <p className="text-gray-300 mt-2">Developed from the ground up with TCPA & SOC 2 compliance in mind.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <FeatureIcon icon={Share2} />
          <div>
            <h3 className="text-2xl font-bold text-white">Omni-channel Follow-up</h3>
            <p className="text-gray-300 mt-2">Trigger automated follow-up actions across email, SMS, and internal workflows.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
