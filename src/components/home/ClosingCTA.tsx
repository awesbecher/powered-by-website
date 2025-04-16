
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";

interface ClosingCTAProps {
  customHeading?: string;
  customButtonText?: string;
  useCalendly?: boolean;
  externalLink?: string | null;
  onContactClick?: () => void;
}

export const ClosingCTA: React.FC<ClosingCTAProps> = ({
  customHeading = "Ready to transform your SMB with AI agents?",
  customButtonText = "Get Started",
  useCalendly = false,
  externalLink = null,
  onContactClick,
}) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Initialize Cal.com if useCalendly is true
    if (useCalendly) {
      (async function () {
        const cal = await getCalApi({"namespace":"get-started-with-voice-ai-chat"});
        cal("ui", {
          "cssVarsPerTheme": {
            "light": {"cal-brand":"#292929"},
            "dark": {"cal-brand":"#fafafa"}
          },
          "hideEventTypeDetails": false,
          "layout": "month_view"
        });
      })();
    }
  }, [useCalendly]);

  const handleClick = () => {
    if (externalLink) {
      window.open(externalLink, '_blank');
    } else if (onContactClick) {
      onContactClick();
    } else if (!useCalendly) {
      navigate('/contact');
    }
    // For Cal.com, the button handles the interaction directly
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
        {customHeading}
      </h2>
      <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
        Join the businesses revolutionizing the way they work, communicate, & engage customers.
      </p>
      
      {useCalendly ? (
        <Button 
          data-cal-namespace="get-started-with-voice-ai-chat"
          data-cal-link="team-powered-by-dfbtbb/get-started-with-voice-ai-chat"
          data-cal-config='{"layout":"month_view"}'
          className="bg-[#6342ff] hover:bg-[#5233e0] text-white px-8 py-6 text-lg rounded-md mx-auto flex items-center"
        >
          {customButtonText} <Calendar className="ml-2 h-5 w-5" />
        </Button>
      ) : (
        <Button 
          className="bg-[#6342ff] hover:bg-[#5233e0] text-white px-8 py-6 text-lg rounded-md mx-auto flex items-center"
          onClick={handleClick}
        >
          {customButtonText} <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      )}
    </section>
  );
};
