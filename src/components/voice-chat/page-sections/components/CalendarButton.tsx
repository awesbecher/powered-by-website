import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const CalendarButton = () => {
  const calLink = "team-powered-by-dfbtbb/get-started-today";
  const calendarUrl = `https://cal.com/${calLink}`;

  return (
    <div className="flex flex-col items-center gap-4">
      <Button 
        className="bg-white hover:bg-gray-100 text-[#6342ff] px-8 py-6 text-lg rounded-md flex items-center gap-2 mx-auto"
        asChild
      >
        <a
          id="voice-get-started-btn"
          href={calendarUrl}
          rel="nofollow noopener"
          data-cal-link={calLink}
          data-cal-namespace="poweredby"
          data-cal-config='{"layout":"month_view","hideEventTypeDetails":false}'
        >
          Get Started Now!
          <ArrowRight className="w-5 h-5" />
        </a>
      </Button>
    </div>
  );
};
