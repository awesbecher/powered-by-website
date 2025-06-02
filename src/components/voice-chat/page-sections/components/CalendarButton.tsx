import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { getCalApi } from "@calcom/embed-react";

export const CalendarButton = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"get-started-today"});
      cal("ui", {"theme":"dark","cssVarsPerTheme":{"light":{"cal-brand":"#292929"},"dark":{"cal-brand":"#fafafa"}},"hideEventTypeDetails":false,"layout":"column_view"});
    })();
  }, []);

  const handleGetStarted = () => {
    const calBtn = document.querySelector('[data-cal-link="team-powered-by-dfbtbb/get-started-today"]');
    if (calBtn instanceof HTMLElement) {
      console.log("Cal.com button found, triggering click");
      calBtn.click();
    } else {
      console.error("Cal.com button not found in DOM, navigating to /contact as fallback");
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
