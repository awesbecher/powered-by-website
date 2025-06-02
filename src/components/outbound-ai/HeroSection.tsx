
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Tv } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface HeroSectionProps {
  initialLoad: boolean;
  handleContact: () => void;
}

const HeroSection = ({ initialLoad, handleContact }: HeroSectionProps) => {
  const [videoOpen, setVideoOpen] = useState(false);

  // Adding Calendly script when component mounts, but not initializing the badge widget
  useEffect(() => {
    // Load Calendly CSS
    const linkElem = document.createElement('link');
    linkElem.href = "https://assets.calendly.com/assets/external/widget.css";
    linkElem.rel = "stylesheet";
    document.head.appendChild(linkElem);
    
    // Load Calendly Script
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    
    // Clean up
    return () => {
      if (document.head.contains(linkElem)) {
        document.head.removeChild(linkElem);
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      // Remove the Calendly widget if it exists
      const calendlyWidget = document.querySelector('.calendly-badge-widget');
      if (calendlyWidget && calendlyWidget.parentNode) {
        calendlyWidget.parentNode.removeChild(calendlyWidget);
      }
    };
  }, []);

  return (
    <section className="pt-8 pb-8 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Left side - Hero content - Now takes full width */}
        <div className="lg:col-span-12">
          <div className={`relative overflow-hidden px-0 lg:px-4 pt-8 pb-4 lg:pt-12 lg:pb-8 transition-all duration-1000 ease-out transform mx-auto
            ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            <h1 className="text-center">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white block mb-2">
                Introducing
              </span>
              <span className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#9b87f5] block">
                OutboundAI
              </span>
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                AI Voice Agents for Outbound Sales & Marketing
              </span>
            </h1>
            <p className="text-xl text-gray-300 text-center mt-4 max-w-4xl mx-auto">
              Transform high-volume outbound calling with AI voice agents that scale, personalize outreach, cut costs, and sound & act astonishing human-like.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <Button 
                className="order-2 sm:order-1 bg-black hover:bg-gray-900 text-white w-full sm:w-auto flex items-center border-2 border-white"
                onClick={() => setVideoOpen(true)}
              >
                <Tv className="mr-2 h-5 w-5" /> Watch video overview
              </Button>
              {/* Modified to use Calendly's popup widget instead of badge widget */}
              <Button 
                className="order-1 sm:order-2 bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-5 text-base rounded-md flex items-center w-full sm:w-auto"
                onClick={() => {
                  if (window.Calendly) {
                    window.Calendly.initPopupWidget({
                      url: 'https://calendly.com/d/crwx-mj8-x7y?hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=7800ff'
                    });
                  }
                }}
              >
                Schedule a Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* YouTube Video Dialog */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-3xl p-1 bg-black">
          <div className="aspect-video">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/6TIztZIrq7w?si=qNacOKFbMYW1qcSg&autoplay=1" 
              title="OutboundAI Video Overview" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
      
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
    </section>
  );
};

export default HeroSection;
