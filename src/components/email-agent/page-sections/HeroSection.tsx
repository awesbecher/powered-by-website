
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { HeroContent } from "./HeroContent";

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
        
        {/* Right side - Calendly widget placeholder */}
        <div className="lg:col-span-6">
          <div className={`mt-8 lg:mt-0 transition-all duration-1000 delay-300 ease-out transform
            ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            <div className="rounded-[2rem] border border-white/50 p-5 bg-black/30 backdrop-blur-sm h-[420px] flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold text-white mb-4">Talk to an AI Specialist</h3>
              <p className="text-gray-300 text-center mb-6">Schedule a free consultation to learn how Email AI can transform your business</p>
              <button 
                onClick={() => {
                  if (window.Calendly) {
                    window.Calendly.initPopupWidget({
                      url: 'https://calendly.com/d/cm48-q4x-c3v?hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=7100ff'
                    });
                  }
                }}
                className="bg-[#7100ff] hover:bg-[#8a75e3] text-white px-6 py-3 rounded-md transition-colors"
              >
                Schedule a Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
