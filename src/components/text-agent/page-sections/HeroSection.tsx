
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { HeroContent } from "./HeroContent";
import { Mail, CalendarClock } from "lucide-react";

interface HeroSectionProps {
  initialLoad: boolean;
  handleContact: () => void;
}

export const HeroSection = ({ initialLoad, handleContact }: HeroSectionProps) => {
  const { toast } = useToast();

  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    
    // Add Calendly CSS
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      // Clean up on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  // Function to open Calendly popup
  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/d/crr5-c3g-q3z?hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=7100ff'
      });
    }
  };

  return (
    <section className="relative pt-20 pb-8 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl overflow-hidden">
      {/* Background gradients similar to AI Agency page */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-[#9b87f5]/20 blur-3xl opacity-20 z-0" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#9b87f5]/30 blur-3xl opacity-20 z-0" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        {/* Left side - Hero content */}
        <div className="lg:col-span-7">
          <HeroContent initialLoad={initialLoad} handleContact={handleContact} />
        </div>
        
        {/* Right side - New spiral logo */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center">
          <div className={`flex flex-col items-center transition-all duration-1000 delay-300 ease-out transform
            ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            
            {/* New spiral image */}
            <div className="relative mb-3">
              <img 
                src="/lovable-uploads/9a61c267-112f-464b-9479-2be87bbe7d9b.png" 
                alt="Sarah - AI Text Agent" 
                className="w-64 h-64 object-contain"
              />
            </div>
            
            {/* Ready to see how it works text */}
            <div className="flex items-center justify-center gap-1 mb-4">
              <span className="text-purple-400">✧</span>
              <h3 className="text-xl font-bold text-white text-center">Ready to See How It Works?</h3>
            </div>
            
            <button 
              onClick={openCalendly}
              className="bg-[#6342ff] hover:bg-[#7352ff] text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <CalendarClock className="w-5 h-5" />
              Get Started Now!
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
