
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";

interface CalendarButtonProps {
  className?: string;
}

export const CalendarButton: React.FC<CalendarButtonProps> = ({ className }) => {
  useEffect(() => {
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
  }, []);

  return (
    <Button 
      data-cal-namespace="get-started-with-voice-ai-chat"
      data-cal-link="team-powered-by-dfbtbb/get-started-with-voice-ai-chat"
      data-cal-config='{"layout":"month_view"}'
      className={`bg-[#6342ff] hover:bg-[#5233e0] text-white px-6 py-4 text-base rounded-md flex items-center ${className || ""}`}
    >
      <Calendar className="mr-2 h-5 w-5" /> Get Started
    </Button>
  );
};
