import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from '@heroicons/react/24/solid';
import { getCalApi } from "@calcom/embed-react";

const smoothScroll = (targetId: string) => {
  const element = document.getElementById(targetId);
  if (!element) return;
  
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = elementPosition - startPosition;
  const duration = 1500;
  let start: number | null = null;

  const animation = (currentTime: number) => {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const progress = Math.min(timeElapsed / duration, 1);
    
    const easeInOutCubic = progress => {
      return progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    };

    window.scrollTo(0, startPosition + (distance * easeInOutCubic(progress)));

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

const handleCalendarClick = () => {
  console.log("Calendar button clicked in AgencyHeroSection");
  
  // First try direct method
  try {
    (window as any).Cal?.('ui', {
      styles: { branding: { brandColor: '#000000' } },
      hideEventTypeDetails: false,
      layout: 'month_view',
    });
    (window as any).Cal?.('showModal', {
      calLink: "team-powered-by-dfbtbb/get-started-today",
      config: {
        layout: 'month_view',
      },
    });
    console.log("Called Cal.com showModal directly from AgencyHeroSection");
    return;
  } catch (err) {
    console.error("Failed to open Cal.com modal directly from AgencyHeroSection:", err);
  }
  
  // Try to find and click the Cal button
  const calBtn = document.querySelector('[data-cal-link="team-powered-by-dfbtbb/get-started-today"]');
  if (calBtn instanceof HTMLElement) {
    console.log("Cal.com button found in AgencyHeroSection, triggering click");
    calBtn.click();
  } else {
    console.error("Cal.com button not found in DOM from AgencyHeroSection");
  }
};

interface AgencyHeroSectionProps {
  initialLoad?: boolean;
}

export const AgencyHeroSection: React.FC<AgencyHeroSectionProps> = ({ initialLoad = false }) => {
  const isVisible = true;

  useEffect(() => {
    (async function () {
      try {
        console.log("Initializing Cal.com embed in AgencyHeroSection");
        const cal = await getCalApi();
        if (cal) {
          cal("ui", {
            "cssVarsPerTheme": {
              "light": {"cal-brand":"#292929"},
              "dark": {"cal-brand":"#fafafa"}
            },
            "hideEventTypeDetails": false,
            "layout": "month_view"
          });
          
          // Preload the calendar link
          cal("preload", { calLink: "team-powered-by-dfbtbb/get-started-today" });
          
          console.log("Cal.com embed initialized successfully in AgencyHeroSection");
        } else {
          console.error("Cal API not available in AgencyHeroSection");
        }
      } catch (error) {
        console.error("Error initializing Cal.com embed in AgencyHeroSection:", error);
      }
    })();
  }, []);

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-black to-[#1a1a1a] overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="container relative mx-auto px-4 py-20 text-center z-10">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-4 text-[#9b87f5] border border-[#9b87f5]/30"
          >
            Custom AI Agents, Built for You
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Why Should Those Silicon Valley <span className="text-[#9b87f5]">Nerds</span> Have All The Fancy AI Toys?
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            SMBs generate 43.5% of U.S. GDP & employ about 46% of all private-sector workers. Our mission is to empower this critically important sector by delivering cutting-edge AI agent solutions that can transform the way businesses work, communicate, & engage customers.
          </p>
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-2 border-[#b4a4f4] text-white hover:bg-[#b4a4f4]/20 px-8 py-6 text-lg rounded-md group"
              onClick={() => smoothScroll('project-approach-section')}
            >
              Learn how we work
            </Button>
            <Button
              size="lg"
              className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white px-8 py-6 text-lg rounded-md group"
              onClick={handleCalendarClick}
              data-cal-link="team-powered-by-dfbtbb/get-started-today"
              data-cal-config='{"layout":"month_view"}'
            >
              <CalendarIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Get Started
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AgencyHeroSection;
