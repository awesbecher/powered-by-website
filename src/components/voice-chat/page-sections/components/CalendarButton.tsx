import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const CalendarButton = () => {
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
        data-cal-link="team-powered-by-dfbtbb/get-started-today"
        data-cal-config='{"layout":"month_view"}'
      />
    </div>
  );
};
