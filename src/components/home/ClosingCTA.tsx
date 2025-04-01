
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ClosingCTAProps {
  onContactClick?: () => void;
  externalLink?: string;
  customHeading?: string;
  customButtonText?: string;
  useCalendly?: boolean; // This prop controls whether to use Calendly
}

export const ClosingCTA = ({ 
  onContactClick, 
  externalLink, 
  customHeading, 
  customButtonText, 
  useCalendly = false 
}: ClosingCTAProps) => {
  // Default heading text
  const headingText = customHeading || "Ready to Put AI Agents to Work?";
  // Default button text
  const buttonText = customButtonText || "Get Started";
  
  // Function to open Calendly popup
  const openCalendly = () => {
    if (window.Calendly) {
      // Check the current page to determine which Calendly URL to use
      const isReceptionistPage = window.location.pathname.includes('ai-receptionist');
      const calendlyUrl = isReceptionistPage 
        ? 'https://calendly.com/d/cntp-tg6-f8k?hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=7100ff'
        : 'https://calendly.com/d/cq7r-5v8-qvw?hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=8e00ff';
      
      window.Calendly.initPopupWidget({
        url: calendlyUrl
      });
      
      // Also call the onContactClick if provided
      if (onContactClick) {
        onContactClick();
      }
    }
  };
  
  // If using Calendly functionality
  if (useCalendly) {
    return (
      <div className="bg-gradient-to-r from-[#6342ff] to-[#a87cff] py-20 px-4 sm:px-6 lg:px-8 mt-10 relative z-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            {headingText}
          </h2>
          <Button 
            className="bg-white hover:bg-gray-100 text-[#6342ff] font-bold px-8 py-6 text-lg rounded-md"
            onClick={openCalendly}
          >
            {buttonText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    );
  }
  
  // If an external link is provided, use it instead of the internal route
  if (externalLink) {
    return (
      <div className="bg-gradient-to-r from-[#6342ff] to-[#a87cff] py-20 px-4 sm:px-6 lg:px-8 mt-10 relative z-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            {headingText}
          </h2>
          <a href={externalLink} target="_blank" rel="noopener noreferrer">
            <Button 
              className="bg-white hover:bg-gray-100 text-[#6342ff] font-bold px-8 py-6 text-lg rounded-md"
              onClick={onContactClick}
            >
              {buttonText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </div>
    );
  }

  // Default behavior with internal routing using a direct Link component
  return (
    <div className="bg-gradient-to-r from-[#6342ff] to-[#a87cff] py-20 px-4 sm:px-6 lg:px-8 mt-10 relative z-20">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          {headingText}
        </h2>
        <Link to="/contact">
          <Button 
            className="bg-white hover:bg-gray-100 text-[#6342ff] font-bold px-8 py-6 text-lg rounded-md"
            onClick={onContactClick}
          >
            {buttonText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
