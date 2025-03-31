
import { useEffect } from "react";

interface CalendlyWidgetProps {
  url?: string;
  height?: number;
  initialLoad?: boolean;
}

export const CalendlyWidget = ({ 
  url = "https://calendly.com/d/crrs-fbd-3hf?background_color=1a1a1a&text_color=ffffff&primary_color=a800ff", 
  height = 900,
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
    <div className="bg-neutral-900/50 p-0 rounded-xl backdrop-blur mb-6">
      <div 
        className="calendly-inline-widget" 
        data-url={url}
        style={{ minWidth: "320px", height: `${height}px` }}
      ></div>
    </div>
  );
};
