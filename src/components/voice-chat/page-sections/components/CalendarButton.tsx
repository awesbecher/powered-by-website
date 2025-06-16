import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { getCalApi } from "@calcom/embed-react";

export const CalendarButton = () => {
  useEffect(() => {
    (async function () {
      try {
        console.log("Initializing Cal.com embed in VoiceChat CalendarButton");
        const cal = await getCalApi({"namespace":"get-started-today"});
        cal("ui", {"theme":"dark","cssVarsPerTheme":{"light":{"cal-brand":"#292929"},"dark":{"cal-brand":"#fafafa"}},"hideEventTypeDetails":false,"layout":"column_view"});
        
        // Preload calendar link
        cal("preload", { calLink: "team-powered-by-dfbtbb/get-started-today" });
        console.log("Cal.com embed initialized successfully in VoiceChat CalendarButton");
      } catch (error) {
        console.error("Error initializing Cal.com in VoiceChat CalendarButton:", error);
      }
    })();
  }, []);

  const handleGetStarted = async () => {
    try {
      console.log("Get Started button clicked in VoiceChat CalendarButton");
      // Get fresh instance of Cal API
      const cal = await getCalApi({"namespace":"get-started-today"});
      
      // Configure UI
      cal("ui", {
        "theme": "dark",
        "cssVarsPerTheme": {
          "light": {"cal-brand":"#292929"},
          "dark": {"cal-brand":"#fafafa"}
        },
        "hideEventTypeDetails": false,
        "layout": "column_view"
      });
      
      // Directly open the calendar modal
      cal("modal", { calLink: "team-powered-by-dfbtbb/get-started-today" });
      console.log("Cal.com modal opened from VoiceChat CalendarButton");
    } catch (error) {
      console.error("Failed to open Cal.com modal from VoiceChat CalendarButton:", error);
      // Fallback if Cal.com fails
      window.location.href = '/contact';
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Button 
        className="bg-white hover:bg-gray-100 text-[#6342ff] px-8 py-6 text-lg rounded-md flex items-center gap-2 mx-auto"
        onClick={handleGetStarted}
      >
        Get Started Now!
        <ArrowRight className="w-5 h-5" />
      </Button>

      {/* Hidden Cal.com button */}
      <button
        className="hidden"
        data-cal-namespace="get-started-today"
        data-cal-link="team-powered-by-dfbtbb/get-started-today"
        data-cal-config='{"layout":"column_view","theme":"dark"}'
      />
    </div>
  );
};
