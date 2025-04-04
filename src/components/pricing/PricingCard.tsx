
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, HelpCircle, Star, Rocket, Award, Asterisk } from "lucide-react";

interface PricingCardProps {
  type: "starter" | "growth" | "enterprise";
  isPopular?: boolean;
}

const PricingCard = ({ type, isPopular = false }: PricingCardProps) => {
  // Define card content based on type
  const getIcon = () => {
    switch (type) {
      case "starter":
        return <Star className="text-[#9b87f5] mr-2" size={24} />;
      case "growth":
        return <Rocket className="text-[#9b87f5] mr-2" size={24} />;
      case "enterprise":
        return <Award className="text-[#9b87f5] mr-2" size={24} />;
    }
  };

  const getTitle = () => {
    switch (type) {
      case "starter":
        return "Starter";
      case "growth":
        return "Growth";
      case "enterprise":
        return "Enterprise";
    }
  };

  const getPrice = () => {
    switch (type) {
      case "starter":
        return "$299";
      case "growth":
        return "$599";
      case "enterprise":
        return null;
    }
  };

  const getPriceSuffix = () => {
    switch (type) {
      case "starter":
        return "/month/agent";
      case "growth":
        return "/month/agent";
      case "enterprise":
        return null;
    }
  };

  const getDescription = () => {
    switch (type) {
      case "starter":
        return "Perfect for small businesses just getting started with AI agents.";
      case "growth":
        return "For businesses ready to expand their AI agent capabilities.";
      case "enterprise":
        return "For businesses with complex AI agent needs and higher volume.";
    }
  };

  const getFeatures = () => {
    switch (type) {
      case "starter":
        return [
          "Up to 1,000 interactions/month",
          "Premium latency",
          "Basic support",
          "Basic customization",
          { text: "Deployment & integration services for additional fee", isAsterisk: true }
        ];
      case "growth":
        return [
          "Up to 2,500 interactions/month",
          "Ultra-low latency",
          "Priority support",
          "Advanced customization",
          { text: "Deployment & integration services for additional fee", isAsterisk: true }
        ];
      case "enterprise":
        return [
          "All AI Agent Types",
          "Unlimited interactions",
          "24/7 dedicated support",
          "Full customization",
          "Advanced analytics & reporting",
          "API access"
        ];
    }
  };

  // Render features
  const renderFeatures = () => {
    const features = getFeatures();
    return (
      <ul className="text-left text-gray-300 space-y-4 mb-10">
        {features.map((feature, index) => {
          if (typeof feature === "string") {
            return (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-[#9b87f5] mr-2 mt-0.5 shrink-0" />
                <span>{feature}</span>
              </li>
            );
          } else {
            return (
              <li key={index} className="flex items-start">
                <Asterisk className="h-5 w-5 text-[#9b87f5] mr-2 mt-0.5 shrink-0" />
                <span className="text-xs">{feature.text}</span>
              </li>
            );
          }
        })}
      </ul>
    );
  };

  return (
    <div className="bg-black rounded-xl p-8 hover:bg-black/80 transition-all relative flex flex-col h-full">
      {isPopular && (
        <div className="absolute -top-3 right-8 bg-[#9b87f5] text-white text-xs font-bold px-4 py-1 rounded">
          MOST POPULAR
        </div>
      )}

      <div className="flex items-center mb-4">
        {getIcon()}
        <h2 className="text-2xl font-bold text-white">{getTitle()}</h2>
      </div>

      <div className="flex-grow">
        {type !== "enterprise" ? (
          <>
            <p className="text-4xl font-bold text-white mb-2">
              {getPrice()}<span className="text-xs text-gray-400">{getPriceSuffix()}</span>
            </p>
            <p className="text-gray-300 mb-8">{getDescription()}</p>
            {renderFeatures()}
          </>
        ) : (
          <>
            <p className="text-gray-300 mb-8">{getDescription()}</p>
            {renderFeatures()}
          </>
        )}
      </div>

      <div className="mt-auto">
        {type !== "enterprise" ? (
          <Button asChild className="w-full bg-[#9b87f5] hover:bg-[#8a75e3] text-white">
            <Link to="/contact">Get Started</Link>
          </Button>
        ) : (
          <Button asChild className="w-full bg-white hover:bg-gray-100 text-[#6342ff]">
            <Link to="/contact">Contact Sales</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default PricingCard;
