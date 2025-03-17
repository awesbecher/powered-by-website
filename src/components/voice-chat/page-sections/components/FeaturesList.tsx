
import React from "react";

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
          <div className="text-[#9b87f5] mt-1">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 5L26.5 11.5L33 5L26.5 -1.5L20 5Z" fill="#9b87f5"/>
              <path d="M20 18L13.5 11.5L7 18L13.5 24.5L20 18Z" fill="#9b87f5"/>
              <path d="M33 18L26.5 24.5L33 31L39.5 24.5L33 18Z" fill="#9b87f5"/>
              <path d="M20 31L13.5 24.5L7 31L13.5 37.5L20 31Z" fill="#9b87f5"/>
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">State-of-the-art AI Voices</h3>
            <p className="text-gray-300 mt-2">Deploy AI voice agents with astoundingly human speech & cadence.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="text-[#9b87f5] mt-1">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 10L25 15L20 10L25 5L30 10Z" fill="#9b87f5"/>
              <path d="M20 20L15 15L10 20L15 25L20 20Z" fill="#9b87f5"/>
              <path d="M10 10L15 5L10 0L5 5L10 10Z" fill="#9b87f5"/>
              <path d="M30 20L25 25L30 30L35 25L30 20Z" fill="#9b87f5"/>
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Fully Customizable</h3>
            <p className="text-gray-300 mt-2">Voice agents that trained on your business & customer needs and learn & adapt.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="text-[#9b87f5] mt-1">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="10" stroke="#9b87f5" strokeWidth="2"/>
              <path d="M20 10L20 30" stroke="#9b87f5" strokeWidth="2"/>
              <path d="M30 20L10 20" stroke="#9b87f5" strokeWidth="2"/>
              <path d="M26 14L14 26" stroke="#9b87f5" strokeWidth="2"/>
              <path d="M26 26L14 14" stroke="#9b87f5" strokeWidth="2"/>
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">24/7 Scalability</h3>
            <p className="text-gray-300 mt-2">Run voice agents day or night, making as many calls as needed simultaneously.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="text-[#9b87f5] mt-1">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="10" width="20" height="20" stroke="#9b87f5" strokeWidth="2"/>
              <rect x="14" y="14" width="4" height="4" fill="#9b87f5"/>
              <rect x="22" y="14" width="4" height="4" fill="#9b87f5"/>
              <rect x="14" y="22" width="4" height="4" fill="#9b87f5"/>
              <rect x="22" y="22" width="4" height="4" fill="#9b87f5"/>
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Built-in Compliance & Security</h3>
            <p className="text-gray-300 mt-2">Developed from the ground up with TCPA & SOC 2 compliance in mind.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="text-[#9b87f5] mt-1">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 5L15 15H25L20 5Z" fill="#9b87f5"/>
              <path d="M5 20L15 15V25L5 20Z" fill="#9b87f5"/>
              <path d="M20 35L25 25H15L20 35Z" fill="#9b87f5"/>
              <path d="M35 20L25 25V15L35 20Z" fill="#9b87f5"/>
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Omni-channel Follow-up</h3>
            <p className="text-gray-300 mt-2">Trigger automated follow-up actions across email, SMS, and internal workflows.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
