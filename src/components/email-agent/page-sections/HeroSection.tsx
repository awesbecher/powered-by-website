
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { HeroContent } from "./HeroContent";
import { CalendarClock } from "lucide-react";

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
        url: 'https://calendly.com/d/cm48-q4x-c3v?hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=7100ff'
      });
    }
  };

  return (
    <section className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl overflow-hidden">
      {/* Background gradients similar to AI Agency page */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-[#9b87f5]/20 blur-3xl opacity-20 z-0" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#9b87f5]/30 blur-3xl opacity-20 z-0" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 relative z-10">
        {/* Left side - Hero content */}
        <div className="lg:col-span-6">
          <HeroContent initialLoad={initialLoad} handleContact={handleContact} />
        </div>
        
        {/* Right side - New Calendly widget placeholder styled like the image */}
        <div className="lg:col-span-6">
          <div className={`mt-8 lg:mt-0 transition-all duration-1000 delay-300 ease-out transform
            ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            <div className="rounded-[2rem] border border-purple-800/50 p-8 bg-[#110d24]/70 backdrop-blur-sm shadow-xl shadow-purple-900/20">
              {/* Purple radial pattern image (using the uploaded image) */}
              <div className="flex justify-center mb-6">
                <img 
                  src="/lovable-uploads/e98a55f9-0098-4d67-82fe-3c301de6a9cb.png" 
                  alt="Pattern" 
                  className="w-32 h-32 object-contain"
                />
              </div>
              
              {/* Heading with star icon */}
              <div className="flex items-center justify-center gap-2 mb-5">
                <span className="text-purple-400 text-2xl">✧</span>
                <h3 className="text-2xl font-bold text-white text-center">Ready to See How It Works?</h3>
              </div>
              
              {/* Get Started Button */}
              <button 
                onClick={openCalendly}
                className="w-full bg-[#6342ff] hover:bg-[#7352ff] text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <CalendarClock className="w-6 h-6" />
                Get Started Now!
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
