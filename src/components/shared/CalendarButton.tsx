import React, { useEffect, useCallback } from 'react';
import { getCalApi } from "@calcom/embed-react";

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
  // Track if Cal.com API is initialized
  const handleCalendarClick = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      // Get fresh instance of Cal API
      const cal = await getCalApi({"namespace":"get-started-today"});
      
      // Configure UI
      cal("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#292929"},"dark":{"cal-brand":"#fafafa"}},"hideEventTypeDetails":false,"layout":"month_view"});
      
      // Explicitly open the calendar modal for the specified link
      cal("modal", { calLink });
      
      console.log("Cal.com modal triggered for", calLink);
    } catch (error) {
      console.error("Failed to open Cal.com modal:", error);
    }
  }, [calLink]);

  // Still initialize on component mount for better performance
  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({"namespace":"get-started-today"});
        cal("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#292929"},"dark":{"cal-brand":"#fafafa"}},"hideEventTypeDetails":false,"layout":"month_view"});
        
        // Preload the calendar link for faster loading when clicked
        cal("preload", { calLink });
      } catch (error) {
        console.error("Failed to initialize Cal.com:", error); 
      }
    })();
  }, [calLink]);

  return (
    <button
      data-cal-namespace="get-started-today"
      data-cal-link={calLink}
      data-cal-config='{"layout":"month_view"}'
      className={className}
      onClick={handleCalendarClick}
    >
      {children}
    </button>
  );
};

export default CalendarButton;
