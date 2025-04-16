
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Show floating CTA after scrolling 500px
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 ease-in-out translate-y-0">
      <Button
        variant="gradient"
        size="lg"
        className="shadow-lg shadow-purple-500/20 flex items-center gap-2"
        data-cal-namespace="floating-cta"
        data-cal-link="team-powered-by-dfbtbb/get-started-today"
        data-cal-config='{"layout":"month_view"}'
      >
        <MessageSquare className="h-4 w-4" />
        Book a Strategy Call
      </Button>
    </div>
  );
};
