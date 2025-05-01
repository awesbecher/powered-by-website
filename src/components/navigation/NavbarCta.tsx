import React, { useEffect } from 'react';
import { getCalApi } from "@calcom/embed-react";

interface NavbarCtaProps {
  className?: string;
  children?: React.ReactNode;
}

export const NavbarCta: React.FC<NavbarCtaProps> = ({
  className = '',
  children = 'Get Started'
}) => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"get-started-today"});
      cal("ui", {
        "cssVarsPerTheme": {
          "light": {"cal-brand": "#8B5CF6"},
          "dark": {"cal-brand": "#8B5CF6"}
        },
        "hideEventTypeDetails": false,
        "layout": "week_view"
      });
    })();
  }, []);

  return (
    <button
      data-cal-namespace="get-started-today"
      data-cal-link="team-powered-by-dfbtbb/get-started-today"
      data-cal-config='{"layout":"week_view"}'
      className={`
        ml-auto 
        px-4 py-2 
        md:px-5 md:py-2.5 
        text-sm font-medium 
        leading-5
        text-[#8B5CF6] 
        border-2 
        border-[#8B5CF6] 
        rounded-full 
        hover:bg-[#8B5CF6] 
        hover:text-white 
        transition-colors 
        duration-200 
        ease-in-out
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {children}
    </button>
  );
};
