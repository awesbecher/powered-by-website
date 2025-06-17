import React from 'react';

interface CalendarButtonProps {
  className?: string;
  calLink?: string;
  children?: React.ReactNode;
}

const CalendarButton: React.FC<CalendarButtonProps> = ({
  className = '',
  calLink = 'team-powered-by-dfbtbb/get-started-today',
  children = 'Get Started'
}) => {
  return (
    <a
      className={`cta cal-trigger ${className}`}
      href={`https://cal.com/${calLink}`}
      data-cal-link={calLink}
      data-cal-namespace="poweredby"
      data-cal-config='{"layout":"month_view"}'
    >
      {children}
    </a>
  );
};

export default CalendarButton;
