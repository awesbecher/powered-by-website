import React, { useEffect } from 'react';
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
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"get-started-today"});
      cal("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#292929"},"dark":{"cal-brand":"#fafafa"}},"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, []);

  return (
    <button
      data-cal-namespace="get-started-today"
      data-cal-link={calLink}
      data-cal-config='{"layout":"month_view"}'
      className={className}
    >
      {children}
    </button>
  );
};

export default CalendarButton;
