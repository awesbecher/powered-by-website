
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

// Define the Tally interface
interface TallyWindow extends Window {
  Tally?: {
    loadEmbeds: () => void;
    openPopup?: (formId: string) => void;
  };
}

interface PricingFeature {
  text: string;
  hasAsterisk?: boolean;
}

interface PricingCardProps {
  title: string;
  price?: string;
  priceSuffix?: string;
  description: string;
  features: Array<string | PricingFeature>;
  buttonText: string;
  popular?: boolean;
  usePopularButtonStyle?: boolean;
  tallyFormId?: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  priceSuffix,
  description,
  features,
  buttonText,
  popular = false,
  usePopularButtonStyle = true,
  tallyFormId
}) => {
  useEffect(() => {
    // Load Tally script if a form ID is provided
    if (tallyFormId) {
      const script = document.createElement("script");
      script.src = "https://tally.so/widgets/embed.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [tallyFormId]);

  const handleButtonClick = () => {
    if (tallyFormId) {
      const tallyWindow = window as TallyWindow;
      if (tallyWindow.Tally && tallyWindow.Tally.openPopup) {
        tallyWindow.Tally.openPopup(tallyFormId);
      }
      return;
    }
    
    // Default action if no form ID
    window.location.href = "/contact";
  };

  return (
    <div 
      className={`rounded-xl overflow-hidden backdrop-blur-sm bg-white/5 border ${
        popular ? "border-[#9b87f5]" : "border-white/10"
      } p-6 transition-transform duration-300 hover:-translate-y-1 relative`}
    >
      {popular && (
        <div className="absolute top-0 right-0">
          <div className="bg-[#9b87f5] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
            Most Popular
          </div>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm mb-4">{description}</p>
        
        {price && (
          <div className="flex items-baseline mt-4">
            <span className="text-4xl font-bold text-white">{price}</span>
            {priceSuffix && <span className="text-gray-400 ml-2">{priceSuffix}</span>}
          </div>
        )}
      </div>

      <div className="mb-8">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckIcon className="h-5 w-5 text-[#9b87f5] mr-2 shrink-0 mt-0.5" />
              <span className="text-gray-200 text-sm">
                {typeof feature === "string" 
                  ? feature 
                  : (
                    <>
                      {feature.text}
                      {feature.hasAsterisk && <span className="text-[#9b87f5] ml-1">*</span>}
                    </>
                  )
                }
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Button
        onClick={handleButtonClick}
        className={`w-full py-2 px-4 rounded-md transition-colors duration-200 ${
          (popular && usePopularButtonStyle) 
            ? "bg-[#9b87f5] hover:bg-[#8976d9] text-white" 
            : "bg-white/10 hover:bg-white/20 text-white"
        }`}
      >
        {buttonText}
      </Button>
    </div>
  );
};
