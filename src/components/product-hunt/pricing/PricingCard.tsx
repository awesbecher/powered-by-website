
import React from "react";
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
  description: string;
  features: Feature[];
  popular?: boolean;
  buttonText: string;
  contactSalesEmail?: string;
  usePopularButtonStyle?: boolean;
}

export const PricingCard = ({ 
  title, 
  price, 
  description, 
  features, 
  popular = false,
  buttonText,
  contactSalesEmail,
  usePopularButtonStyle = false
}: PricingCardProps) => {
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

  return (
    <div className={`${
      popular 
        ? "bg-gradient-to-b from-[#6342ff]/20 to-[#a87cff]/10 backdrop-blur-xl border border-[#9b87f5]/30" 
        : "bg-white/5 backdrop-blur-xl border border-white/10"
      } rounded-2xl p-8 transition-all duration-300 hover:bg-white/10 relative`}>
      {popular && (
        <div className="absolute top-0 right-0 bg-[#9b87f5] text-white text-xs font-bold px-4 py-1 rounded-bl-lg rounded-tr-lg">
          MOST POPULAR
        </div>
      )}
      <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
        {getTitleIcon()}
        {title}
      </h3>
      
      {/* Pricing or Contact Button Section */}
      <div className="flex items-end mb-6">
        {price ? (
          <>
            <span className="text-4xl font-bold text-white">{price}</span>
            <span className="text-gray-400 ml-1 mb-1">/month</span>
          </>
        ) : contactSalesEmail ? (
          <a href={`mailto:${contactSalesEmail}`} className="w-full">
            <Button className="w-full bg-white hover:bg-gray-100 text-[#6342ff] font-bold">
              {buttonText}
            </Button>
          </a>
        ) : (
          <div className="h-10"></div> // Empty space fallback
        )}
      </div>
      
      <p className="text-gray-300 mb-8">{description}</p>
      <ul className="space-y-4 mb-10">
        {features.map((feature, index) => renderFeatureItem(feature, index))}
      </ul>
      
      {/* Only show button at bottom if not already shown at top */}
      {!contactSalesEmail && (
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
  );
};
