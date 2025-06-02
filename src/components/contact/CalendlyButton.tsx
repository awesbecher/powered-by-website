
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

    // Cleanup on component unmount
    return () => {
      if (document.head.contains(linkElement)) {
        document.head.removeChild(linkElement);
      }
      if (document.body.contains(scriptElement)) {
        document.body.removeChild(scriptElement);
      }
      
      // Remove any Calendly badge widgets that might have been created
      const badges = document.querySelectorAll('.calendly-badge-widget');
      badges.forEach(badge => {
        if (badge.parentNode) {
          badge.parentNode.removeChild(badge);
        }
      });
    };
  }, []);

  // Watch for any Calendly badge widgets and remove them immediately
  useEffect(() => {
    // Function to remove badge widgets
    const removeBadges = () => {
      const badges = document.querySelectorAll('.calendly-badge-widget');
      badges.forEach(badge => {
        if (badge.parentNode) {
          badge.parentNode.removeChild(badge);
        }
      });
    };

    // Set up an interval to check for and remove badge widgets
    const intervalId = setInterval(removeBadges, 500);
    
    // Also check immediately
    removeBadges();

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
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
      className="bg-[#ac00ff] hover:bg-[#9200d6] text-white px-6 py-4 text-base rounded-md flex items-center"
    >
      <CalendarClock className="mr-2 h-5 w-5" />
      Get Started Now!
    </Button>
  );
};
