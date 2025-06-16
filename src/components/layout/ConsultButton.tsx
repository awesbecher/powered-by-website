import { useState, useEffect } from "react";
import { HeadsetIcon, CalendarIcon } from "lucide-react";
import { VapiCallDialog } from "@/components/shared/VapiCallDialog";
import { getCalApi } from "@calcom/embed-react";

interface ConsultButtonProps {
  show: boolean;
}

const ConsultButton = ({ show }: ConsultButtonProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        console.log("Initializing Cal.com embed in ConsultButton");
        const cal = await getCalApi({"namespace":"get-started-today"});
        cal("ui", {
          "cssVarsPerTheme": {
            "light": {"cal-brand":"#292929"},
            "dark": {"cal-brand":"#fafafa"}
          },
          "hideEventTypeDetails": false,
          "layout": "month_view"
        });
        
        // Preload the calendar link
        cal("preload", { calLink: "team-powered-by-dfbtbb/get-started-today" });
        
        console.log("Cal.com embed initialized successfully in ConsultButton");
      } catch (error) {
        console.error("Error initializing Cal.com embed in ConsultButton:", error);
      }
    })();
  }, []);

  if (!show) return null;

  const handleAIAgentClick = () => {
    console.log("Talk to AI Agent button clicked, opening Vapi call dialog");
    setDialogOpen(true);
  };

  const handleCalendarClick = async () => {
    console.log("Calendar button clicked in ConsultButton");
    
    try {
      // Get fresh instance of Cal API
      const cal = await getCalApi({"namespace":"get-started-today"});
      
      // Configure UI
      cal("ui", {
        "cssVarsPerTheme": {
          "light": {"cal-brand":"#292929"},
          "dark": {"cal-brand":"#fafafa"}
        },
        "hideEventTypeDetails": false,
        "layout": "month_view"
      });
      
      // Directly open the calendar modal with the correct method name
      cal("modal", { calLink: "team-powered-by-dfbtbb/get-started-today" });
      console.log("Cal.com modal opened from ConsultButton");
    } catch (error) {
      console.error("Failed to open Cal.com modal from ConsultButton:", error);
    }
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <button
          onClick={handleAIAgentClick}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#6342ff] hover:bg-[#5331ee] transition-colors duration-200"
        >
          <HeadsetIcon className="w-4 h-4 mr-1.5" />
          Talk to an AI Agent
        </button>
        <button
          onClick={handleCalendarClick}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#9b87f5] hover:bg-[#8b77e5] transition-colors duration-200"
          data-cal-link="team-powered-by-dfbtbb/get-started-today"
          data-cal-config='{"layout":"month_view"}'
        >
          <CalendarIcon className="w-4 h-4 mr-1.5" />
          Get Started
        </button>
      </div>
      {dialogOpen && <VapiCallDialog open={dialogOpen} onOpenChange={setDialogOpen} />}
    </>
  );
};

export default ConsultButton;
