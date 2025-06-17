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
      id="get-started-btn"
      href={`https://cal.com/${calLink}`}
      rel="nofollow noopener"
      data-cal-link={calLink}
      data-cal-namespace="poweredby"
      data-cal-config='{"layout":"month_view","hideEventTypeDetails":false}'
      className={className}
    >
      {children}
    </a>
  );
};

export default CalendarButton;
