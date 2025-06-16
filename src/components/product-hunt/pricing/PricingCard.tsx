import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";

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
  calLink?: string;
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
  tallyFormId,
  calLink = "team-powered-by-dfbtbb/get-started-today"
}) => {
  useEffect(() => {
    // Initialize Cal.com with direct approach
    (async function() {
      try {
        const cal = await getCalApi({"namespace":"get-started-today"});
        cal("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#292929"},"dark":{"cal-brand":"#fafafa"}},"hideEventTypeDetails":false,"layout":"month_view"});
        
        // Preload the calendar link
        if (calLink) {
          cal("preload", { calLink });
        }
      } catch (error) {
        console.error("Error initializing Cal.com in PricingCard:", error);
      }
    })();
  }, [calLink]);

  const handleButtonClick = async () => {
    // If Tally form ID is provided, use Tally
    if (tallyFormId) {
      const tallyWindow = window as TallyWindow;
      if (tallyWindow.Tally && tallyWindow.Tally.openPopup) {
        tallyWindow.Tally.openPopup(tallyFormId);
      }
      return;
    }
    
    // Otherwise use Cal.com
    try {
      // Get fresh instance of Cal API
      const cal = await getCalApi({"namespace":"get-started-today"});
      
      // Configure UI
      cal("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#292929"},"dark":{"cal-brand":"#fafafa"}},"hideEventTypeDetails":false,"layout":"month_view"});
      
      // Directly open the calendar modal
      cal("modal", { calLink });
      console.log("Cal.com modal opened from PricingCard");
    } catch (error) {
      console.error("Failed to open Cal.com modal from PricingCard:", error);
      // Fallback if Cal.com fails
      window.location.href = "/contact";
    }
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
        data-tally-open={tallyFormId}
        data-tally-layout="modal"
        data-tally-width="476"
        data-tally-hide-title="1" 
        data-tally-overlay="1"
        data-cal-namespace="get-started-today"
        data-cal-link={calLink}
        data-cal-config='{"layout":"month_view"}'
      >
        {buttonText}
      </Button>
    </div>
  );
};
