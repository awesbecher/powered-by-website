
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CalendarClock } from "lucide-react";

export const CalendlyButton = () => {
  useEffect(() => {
    // Load Calendly widget CSS
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.appendChild(linkElement);

    // Load Calendly widget JS
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://assets.calendly.com/assets/external/widget.js';
    scriptElement.async = true;
    document.body.appendChild(scriptElement);

    // Initialize badge widget after script loads
    scriptElement.onload = () => {
      if (window.Calendly) {
        window.Calendly.initBadgeWidget({
          url: 'https://calendly.com/d/cq7r-5v8-qvw?hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=8e00ff',
          text: 'Get Started Now!',
          color: '#ac00ff',
          textColor: '#ffffff'
        });
      }
    };

    // Cleanup on component unmount
    return () => {
      document.head.removeChild(linkElement);
      if (document.body.contains(scriptElement)) {
        document.body.removeChild(scriptElement);
      }
      // Remove the Calendly badge if it exists
      const badges = document.querySelectorAll('.calendly-badge-widget');
      badges.forEach(badge => {
        if (badge.parentNode) {
          badge.parentNode.removeChild(badge);
        }
      });
    };
  }, []);

  // Custom button that opens Calendly popup when clicked
  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/d/cq7r-5v8-qvw?hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=8e00ff'
      });
    }
  };

  return (
    <Button 
      onClick={openCalendly}
      className="bg-[#ac00ff] hover:bg-[#9200d6] text-white px-10 py-6 text-xl rounded-xl flex items-center shadow-lg hover:shadow-xl transition-all"
    >
      <CalendarClock className="mr-2 h-6 w-6" />
      Get Started Now!
    </Button>
  );
};
