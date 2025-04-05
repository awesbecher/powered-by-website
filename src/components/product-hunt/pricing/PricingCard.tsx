
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Star, Rocket, Award, Asterisk } from "lucide-react";

interface FeatureItem {
  text: string;
  hasAsterisk?: boolean;
}

type Feature = string | FeatureItem;

interface PricingCardProps {
  title: string;
  price?: string;
  priceSuffix?: string;
  description: string;
  features: Feature[];
  popular?: boolean;
  buttonText: string;
  contactSalesEmail?: string;
  usePopularButtonStyle?: boolean;
  tallyFormId?: string;
}

export const PricingCard = ({ 
  title, 
  price, 
  priceSuffix,
  description, 
  features, 
  popular = false,
  buttonText,
  contactSalesEmail,
  usePopularButtonStyle = false,
  tallyFormId
}: PricingCardProps) => {
  // Load Tally embed script if tallyFormId is provided
  useEffect(() => {
    if (tallyFormId && typeof window !== 'undefined') {
      // Check if script is already loaded
      if (!document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) {
        const script = document.createElement('script');
        script.src = "https://tally.so/widgets/embed.js";
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, [tallyFormId]);
  
  // Function to determine which icon to show based on the title
  const getTitleIcon = () => {
    switch (title) {
      case "Starter":
        return <Star className="inline-block mr-2 text-[#9b87f5]" size={22} />;
      case "Growth":
        return <Rocket className="inline-block mr-2 text-[#9b87f5]" size={22} />;
      case "Enterprise":
        return <Award className="inline-block mr-2 text-[#9b87f5]" size={22} />;
      default:
        return null;
    }
  };

  // Helper function to render feature item with appropriate icon
  const renderFeatureItem = (feature: Feature, index: number) => {
    if (typeof feature === 'string') {
      return (
        <li key={index} className="flex items-start">
          <Check className="text-[#9b87f5] w-5 h-5 mr-2 mt-0.5" />
          <span className="text-gray-300">{feature}</span>
        </li>
      );
    } else {
      return (
        <li key={index} className="flex items-start">
          {feature.hasAsterisk ? (
            <Asterisk className="text-[#9b87f5] w-5 h-5 mr-2 mt-0.5" />
          ) : (
            <Check className="text-[#9b87f5] w-5 h-5 mr-2 mt-0.5" />
          )}
          <span className={`text-gray-300 ${feature.hasAsterisk ? 'text-xs' : ''}`}>{feature.text}</span>
        </li>
      );
    }
  };

  // Determine if button should use the popular style
  const shouldUsePopularStyle = popular || usePopularButtonStyle;

  // Handle button click for Tally form
  const handleButtonClick = () => {
    if (tallyFormId && window.Tally?.openPopup) {
      window.Tally.openPopup(tallyFormId, {
        width: 540,
        height: 640, // Increased height to show more of the form
        hideTitle: false,
        layout: "modal"
      });
      return;
    }
  };

  return (
    <div className={`${
      popular 
        ? "bg-gradient-to-b from-[#6342ff]/20 to-[#a87cff]/10 backdrop-blur-xl border-2 border-[#9b87f5] shadow-lg shadow-[#9b87f5]/20" 
        : "bg-white/5 backdrop-blur-xl border border-white/10"
      } rounded-2xl p-8 transition-all duration-300 hover:bg-white/10 relative flex flex-col h-full`}>
      {popular && (
        <div className="absolute top-0 right-0 bg-[#9b87f5] text-white text-xs font-bold px-4 py-1 rounded-bl-lg rounded-tr-lg">
          MOST POPULAR
        </div>
      )}
      <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
        {getTitleIcon()}
        {title}
      </h3>
      
      {price ? (
        <p className="text-4xl font-bold text-white mb-2">
          {price}<span className="text-xs text-gray-400">{priceSuffix}</span>
        </p>
      ) : (
        <div className="h-10"></div> // Empty space for alignment
      )}
      
      <p className="text-gray-300 mb-8">{description}</p>
      
      <ul className="space-y-4 mb-10 flex-grow">
        {features.map((feature, index) => renderFeatureItem(feature, index))}
      </ul>
      
      <div className="mt-auto">
        {tallyFormId ? (
          <Button 
            onClick={handleButtonClick}
            className={`w-full ${
              shouldUsePopularStyle 
                ? "bg-[#9b87f5] hover:bg-[#8a75e3] text-white" 
                : "bg-white hover:bg-gray-100 text-[#6342ff]"
              } font-bold`}
          >
            {buttonText}
          </Button>
        ) : contactSalesEmail ? (
          <a href={`mailto:${contactSalesEmail}`} className="w-full">
            <Button className="w-full bg-white hover:bg-gray-100 text-[#6342ff] font-bold">
              {buttonText}
            </Button>
          </a>
        ) : (
          <Link to="/contact">
            <Button className={`w-full ${
              shouldUsePopularStyle 
                ? "bg-[#9b87f5] hover:bg-[#8a75e3] text-white" 
                : "bg-white hover:bg-gray-100 text-[#6342ff]"
              } font-bold`}>
              {buttonText}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
