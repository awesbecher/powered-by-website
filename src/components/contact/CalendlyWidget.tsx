
import { useEffect } from "react";

interface CalendlyWidgetProps {
  url?: string;
  height?: number;
  initialLoad?: boolean;
}

export const CalendlyWidget = ({ 
  url = "https://calendly.com/teampoweredby/powered_by-demo-virtual-se?hide_event_type_details=1&hide_gdpr_banner=1", 
  height = 700,
  initialLoad
}: CalendlyWidgetProps) => {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      // Clean up script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="bg-neutral-900/50 p-0 rounded-xl backdrop-blur mb-0">
      <div 
        className="calendly-inline-widget" 
        data-url={url}
        style={{ minWidth: "320px", height: `${height}px` }}
      ></div>
    </div>
  );
};
