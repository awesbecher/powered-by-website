
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

interface CalendarButtonProps {
  onClick?: () => void;
  className?: string;
}

export const CalendarButton = ({ onClick, className = "" }: CalendarButtonProps) => {
  // Ensure Cal.com is initialized when this component mounts
  useEffect(() => {
    (async function () {
      try {
        console.log("Initializing Cal.com embed in CalendarButton component");
        const cal = await getCalApi();
        cal("ui", {
          "cssVarsPerTheme": {
            "light": {"cal-brand":"#292929"},
            "dark": {"cal-brand":"#fafafa"}
          },
          "hideEventTypeDetails": false,
          "layout": "month_view"
        });
        console.log("Cal.com embed initialized successfully in CalendarButton component");
      } catch (error) {
        console.error("Error initializing Cal.com embed in CalendarButton component:", error);
      }
    })();
  }, []);

  return (
    <Button
      data-cal-link="team-powered-by-dfbtbb/get-started-with-voice-ai-chat"
      data-cal-config='{"layout":"month_view"}'
      onClick={(e) => {
        console.log("Calendar button clicked in CalendarButton component");
        try {
          // Direct modal trigger approach
          (window as any).Cal?.('ui', {
            styles: { branding: { brandColor: '#000000' } },
            hideEventTypeDetails: false,
            layout: 'month_view',
          });
          (window as any).Cal?.('showModal', {
            calLink: "team-powered-by-dfbtbb/get-started-with-voice-ai-chat",
            config: {
              layout: 'month_view',
            },
          });
          if (onClick) onClick();
        } catch (err) {
          console.error("Failed to open Cal.com modal directly from CalendarButton:", err);
          if (onClick) onClick();
        }
      }}
      className={`bg-[#6342ff] hover:bg-[#5233e0] text-white px-6 py-4 text-base rounded-md flex items-center ${className}`}
    >
      <Calendar className="mr-2 h-5 w-5" />
      Get Started
    </Button>
  );
};
