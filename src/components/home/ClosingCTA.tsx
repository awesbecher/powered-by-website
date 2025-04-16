
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

interface ClosingCTAProps {
  customHeading?: string;
  customButtonText?: string;
  useCalendly?: boolean;
  externalLink?: string | null;
  onContactClick?: () => void;
}

export const ClosingCTA: React.FC<ClosingCTAProps> = ({
  customHeading,
  customButtonText,
  useCalendly = false,
  externalLink = null,
  onContactClick
}) => {
  useEffect(() => {
    // Initialize Cal.com
    (async function () {
      const cal = await getCalApi({"namespace":"get-started-today"});
      cal("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#292929"},"dark":{"cal-brand":"#fafafa"}},"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, []);

  const handleClick = () => {
    if (onContactClick) {
      onContactClick();
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {customHeading || "Transform Your Business with AI Agents"}
        </h2>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Unlock the potential of AI-powered communication and streamline your business operations today.
        </p>
        {externalLink ? (
          <Button
            className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white px-8 py-6 text-lg rounded-md"
            onClick={handleClick}
            asChild
          >
            <a href={externalLink} target="_blank" rel="noopener noreferrer">
              {customButtonText || "Get Started"} <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        ) : useCalendly || onContactClick ? (
          <Button
            className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white px-8 py-6 text-lg rounded-md"
            onClick={handleClick}
          >
            {customButtonText || "Get Started"} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        ) : (
          <Button
            data-cal-namespace="get-started-today"
            data-cal-link="team-powered-by-dfbtbb/get-started-today"
            data-cal-config='{"layout":"month_view"}'
            className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white px-8 py-6 text-lg rounded-md"
          >
            {customButtonText || "Get Started"} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        )}
      </div>
    </section>
  );
};

export default ClosingCTA;
