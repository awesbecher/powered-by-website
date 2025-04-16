
import React from "react";

interface CollaborationSectionProps {
  scrollPosition: number;
  collaborationRef: React.RefObject<HTMLDivElement>;
}

export const CollaborationSection = ({ scrollPosition, collaborationRef }: CollaborationSectionProps) => {
  return (
    <div 
      ref={collaborationRef}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 transition-all duration-1000 ease-out transform
        border border-[#9b87f5]/30 rounded-xl overflow-hidden py-10 backdrop-blur-md bg-[#2a1a47]/50 shadow-xl"
    >
      <div className="max-w-4xl mx-auto">
        {/* Added Image */}
        <div className="mb-10 max-w-4xl mx-auto">
          <img 
            src="/lovable-uploads/55940d61-20dd-4c93-8911-5bfcbb287aca.png" 
            alt="AI Agent Architecture" 
            className="w-full h-auto rounded-2xl shadow-xl object-cover"
          />
        </div>
        
        <div className="space-y-6">
          <p className="text-3xl md:text-4xl font-semibold leading-tight text-white">
            <span className="bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md">Powered_by</span> is the perfect AI agent development partner for forward-thinking SMBs.
          </p>
          
          <p className="text-3xl md:text-4xl font-semibold leading-tight text-white">
            We believe the latest AI innovation should be available to any organization, no matter its size, industry, or budget.
          </p>
          
          <div className="space-y-6">
            <p className={`text-3xl md:text-4xl font-semibold leading-tight transition-all duration-500
              ${scrollPosition > 170 ? 'text-white' : 'text-gray-600'}`}>
              Our team of experts brings years of experience in AI implementation across industries.
            </p>
            
            <p className={`text-3xl md:text-4xl font-semibold leading-tight transition-all duration-500
              ${scrollPosition > 200 ? 'text-white' : 'text-gray-600'}`}>
              We ensure solutions that are both state-of-the-art and practical for real-world business challenges.
            </p>
          </div>
          
          <div className="space-y-6">
            <p className={`text-3xl md:text-4xl font-semibold leading-tight transition-all duration-500
              ${scrollPosition > 230 ? 'text-white' : 'text-gray-600'}`}>
              By combining deep human expertise with cutting-edge AI agent technology, we ensure that your AI agent vision can be realized on-time and at budget.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
