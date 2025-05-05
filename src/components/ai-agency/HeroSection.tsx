import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, MessageCircle, Play, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { getCalApi } from "@calcom/embed-react";
import VideoModal from '@/components/shared/VideoModal';

interface HeroSectionProps {
  initialLoad: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ initialLoad }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({"namespace":"get-started-today"});
        cal("ui", {"theme":"dark","cssVarsPerTheme":{"light":{"cal-brand":"#292929"},"dark":{"cal-brand":"#fafafa"}},"hideEventTypeDetails":false,"layout":"column_view"});
      } catch (error) {
        console.error("Error initializing Cal.com:", error);
      }
    })();
  }, []);

  const handleTalkToAgent = () => {
    document.dispatchEvent(new CustomEvent('open-voice-dialog'));
  };
  
  const handleCalendarClick = () => {
    console.log("Calendar button clicked in AI Agency HeroSection");
    
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
      console.log("Called Cal.com showModal directly from HeroSection");
      return;
    } catch (err) {
      console.error("Failed to open Cal.com modal directly from HeroSection:", err);
    }
    
    // Try to find and click the Cal button
    const calBtn = document.querySelector('[data-cal-link="team-powered-by-dfbtbb/get-started-today"]');
    if (calBtn instanceof HTMLElement) {
      console.log("Cal.com button found in HeroSection, triggering click");
      calBtn.click();
    } else {
      console.error("Cal.com button not found in DOM from HeroSection");
      // Try clicking the global backup button
      const globalBtn = document.getElementById('cal-button-global');
      if (globalBtn) {
        console.log("Found global Cal.com button, clicking it");
        globalBtn.click();
      }
    }
  };

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
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
              AI Agents That Work as Hard as You Do
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
              Custom AI Agents <br className="hidden md:block" />
              for <span className="text-[#9b87f5]">SMBs</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Deploy AI voice, email, & SMS-text agents that automate your customer interactions. Our AI agents are custom-trained on your business and can handle support, sales, and scheduling.
            </p>
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Button 
                size="lg" 
                variant="outline"
                className="bg-transparent border-2 border-[#9b87f5] text-white hover:bg-[#9b87f5]/20 px-8 py-6 text-lg rounded-md group"
                onClick={() => window.location.href = '/demo'}
              >
                See Demos
                <ArrowRightIcon className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              {/* Hidden Cal.com button */}
              <button
                className="hidden"
                data-cal-namespace="get-started-today"
                data-cal-link="team-powered-by-dfbtbb/get-started-today"
                data-cal-config='{"layout":"column_view","theme":"dark"}'
              />

              <Button 
                size="lg" 
                className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white px-8 py-6 text-lg rounded-md group"
                onClick={handleCalendarClick}
              >
                Get Started
                <Calendar className="ml-2 group-hover:scale-110 transition-transform" />
              </Button>
              
              <Button 
                onClick={handleTalkToAgent}
                size="lg" 
                variant="outline" 
                className="bg-transparent border-2 border-[#9b87f5] text-white hover:bg-[#9b87f5]/20 px-8 py-6 text-lg rounded-md group"
              >
                <MessageCircle className="mr-2 group-hover:scale-110 transition-transform" />
                Talk to AI Agent
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoId="w6juT92KdRo"
      />
    </section>
  );
};

export default HeroSection;
