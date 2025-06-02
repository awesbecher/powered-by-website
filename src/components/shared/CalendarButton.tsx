import React, { useEffect } from 'react';
import { getCalApi } from "@calcom/embed-react";
import { initializeCalendar, calendarConfigString } from '@/utils/calendarUtils';

interface CalendarButtonProps {
  className?: string;
  calLink?: string;
  children?: React.ReactNode;
}

export const CalendarButton: React.FC<CalendarButtonProps> = ({
  className = '',
  calLink = 'team-powered-by-dfbtbb/get-started-today',
  children = 'Get Started'
}) => {
  useEffect(() => {
    (async function () {
      await initializeCalendar();
    })();
  }, []);

  return (
    <button
      data-cal-namespace="get-started-today"
      data-cal-link={calLink}
      data-cal-config={calendarConfigString}
      className={className}
    >
      {children}
    </button>
  );
};

export default CalendarButton;
