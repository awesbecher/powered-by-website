
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ClosingCTAProps {
  onContactClick?: () => void;
  externalLink?: string;
  customHeading?: string;
  customButtonText?: string;
}

export const ClosingCTA = ({ onContactClick, externalLink, customHeading, customButtonText }: ClosingCTAProps) => {
  // Default heading text
  const headingText = customHeading || "Ready to Put AI Agents to Work?";
  // Default button text
  const buttonText = customButtonText || "Get Started";
  
  // If an external link is provided, use it instead of the internal route
  if (externalLink) {
    return (
      <div className="bg-gradient-to-r from-[#6342ff] to-[#a87cff] py-20 px-4 sm:px-6 lg:px-8 mt-10">
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

  // Default behavior with internal routing
  return (
    <div className="bg-gradient-to-r from-[#6342ff] to-[#a87cff] py-20 px-4 sm:px-6 lg:px-8 mt-10">
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
