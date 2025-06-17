import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ClosingCTAProps {
  customHeading?: string;
  customButtonText?: string;
  useCalendly?: boolean;
  externalLink?: string | null;
  onContactClick?: () => void;
}

export const ClosingCTA: React.FC<ClosingCTAProps> = ({
  customHeading,
  customButtonText = "Get Started",
  useCalendly = false,
  externalLink = null,
  onContactClick
}: ClosingCTAProps) => {
  
  const calLink = "team-powered-by-dfbtbb/get-started-today";
  const calendarUrl = `https://cal.com/${calLink}`;

  // Only handle direct external links and custom contact click handlers
  const handleExternalClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (externalLink) {
      window.location.href = externalLink;
    } else if (onContactClick) {
      onContactClick();
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {customHeading || "Ready to Transform Your Business with AI agents?"}
        </h2>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Unlock the potential of AI-powered communication and streamline your business operations today.
        </p>
        {externalLink || useCalendly || onContactClick ? (
          <Button
            className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white px-8 py-6 text-lg rounded-md"
            asChild
          >
            <a 
              href={externalLink || "#"} 
              rel="noopener noreferrer"
              className="cta"
              onClick={handleExternalClick}
            >
              {customButtonText} <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        ) : (
          <Button
            className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white px-8 py-6 text-lg rounded-md"
            asChild
          >
            <a
              className="cta cal-trigger"
              href={calendarUrl}
              data-cal-link={calLink}
              data-cal-namespace="poweredby"
              data-cal-config='{"layout":"month_view"}'
            >
              {customButtonText} <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        )}
      </div>
    </section>
  );
};

// Export is handled via named export above

// No need to redeclare Window.Cal as it's handled by @calcom/embed-react
