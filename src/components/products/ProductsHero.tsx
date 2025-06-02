import { cn } from "@/lib/utils";
import { PoweredByText } from "@/components/shared/PoweredByText";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

interface ProductsHeroProps {
  initialLoad: boolean;
  className?: string;
}

const smoothScroll = (targetId: string) => {
  const element = document.getElementById(targetId);
  if (!element) return;
  
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = elementPosition - startPosition;
  const duration = 1500; // 1.5 seconds
  let start: number | null = null;

  const animation = (currentTime: number) => {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const progress = Math.min(timeElapsed / duration, 1);
    
    // Easing function for smoother animation
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
  console.log("Calendar button clicked in ProductsHero");
  
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
    console.log("Called Cal.com showModal directly from ProductsHero");
    return;
  } catch (err) {
    console.error("Failed to open Cal.com modal directly from ProductsHero:", err);
  }
  
  // Try to find and click the Cal button
  const calBtn = document.querySelector('[data-cal-link="team-powered-by-dfbtbb/get-started-today"]');
  if (calBtn instanceof HTMLElement) {
    console.log("Cal.com button found in ProductsHero, triggering click");
    calBtn.click();
  } else {
    console.error("Cal.com button not found in DOM from ProductsHero");
  }
};

export const ProductsHero = ({ initialLoad, className }: ProductsHeroProps) => {
  useEffect(() => {
    (async function () {
      try {
        console.log("Initializing Cal.com embed in ProductsHero");
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
          
          console.log("Cal.com embed initialized successfully in ProductsHero");
        } else {
          console.error("Cal API not available in ProductsHero");
        }
      } catch (error) {
        console.error("Error initializing Cal.com embed in ProductsHero:", error);
      }
    })();
  }, []);

  return (
    <motion.div 
      className={cn("relative overflow-hidden px-6 lg:px-8 pt-20 pb-12", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center relative z-10">
          <motion.h1 
            className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Empower SMB Growth with <span className="text-[#9b87f5]">AI Agent Solutions</span>
          </motion.h1>
          
          <motion.p 
            className="mt-4 text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <PoweredByText /> offers a comprehensive suite of AI agents that transform how businesses operate and engage with their customers.
          </motion.p>
          
          <motion.div 
            className="mt-8 flex justify-center gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <button 
              onClick={() => smoothScroll('featured-solutions')}
              className="bg-gradient-to-r from-[#6342ff] to-[#a87cff] text-white px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-all duration-300 flex items-center gap-2"
            >
              Explore Solutions
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
            
            <button 
              onClick={handleCalendarClick}
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-md font-semibold transition-colors"
              data-cal-link="team-powered-by-dfbtbb/get-started-today"
              data-cal-config='{"layout":"month_view"}'
            >
              Schedule a Demo
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
