
import { useEffect } from "react";

interface CalendlyWidgetProps {
  initialLoad: boolean;
}

export const CalendlyWidget = ({ initialLoad }: CalendlyWidgetProps) => {
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
        data-url="https://calendly.com/teampoweredby/powered_by-free-consultation?hide_event_type_details=1&hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff" 
        style={{ minWidth: "320px", height: "700px" }}
      ></div>
    </div>
  );
};
