
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Play } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface HeroSectionProps {
  initialLoad: boolean;
  handleContact: () => void;
}

const HeroSection = ({ initialLoad, handleContact }: HeroSectionProps) => {
  const [videoOpen, setVideoOpen] = useState(false);

  // Adding Calendly script when component mounts
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
    
    // Initialize Calendly widget after script loads
    script.onload = () => {
      if (window.Calendly) {
        window.Calendly.initBadgeWidget({
          url: 'https://calendly.com/d/cnbc-rvx-4vd?hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=ff0025',
          text: 'Schedule',
          color: '#ff0025',
          textColor: '#ffffff'
        });
      }
    };
    
    // Load Tally script
    const tallyScript = document.createElement('script');
    tallyScript.src = 'https://tally.so/widgets/embed.js';
    tallyScript.async = true;
    document.body.appendChild(tallyScript);
    
    // Clean up
    return () => {
      if (document.head.contains(linkElem)) {
        document.head.removeChild(linkElem);
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      if (document.body.contains(tallyScript)) {
        document.body.removeChild(tallyScript);
      }
      // Remove the Calendly widget if it exists
      const calendlyWidget = document.querySelector('.calendly-badge-widget');
      if (calendlyWidget && calendlyWidget.parentNode) {
        calendlyWidget.parentNode.removeChild(calendlyWidget);
      }
    };
  }, []);

  return (
    <section className="pt-8 pb-0 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-0">
        {/* Left side - Hero content */}
        <div className="lg:col-span-6">
          <div className={`space-y-6 transition-all duration-1000 ease-out transform
            ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            <h1>
              <span className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#ea384c] block">
                Virtual SE
              </span>
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Force-Multiply Your Sales Engineering Team
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              <strong>Virtual SE</strong> gives SaaS sales organizations the ability to deploy AI pre-sales engineers to unlimited meetings with minimal incremental expense. Free up your scarce human SE resources for the highest value customer activities by utilizing super-intelligent, tireless SE agents.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
              {/* Watch overview button - Added white border */}
              <Button 
                className="order-3 sm:order-1 h-12 bg-black hover:bg-gray-900 text-white px-4 py-0 rounded-md text-sm font-medium flex items-center justify-center gap-2 w-full sm:w-auto border-2 border-white"
                onClick={() => setVideoOpen(true)}
              >
                <Play className="h-4 w-4" /> Watch overview
              </Button>
              {/* Schedule Demo button - Updated to use red color */}
              <Button 
                className="order-1 sm:order-2 h-12 bg-[#ea384c] hover:bg-[#d42e40] text-white px-4 py-0 rounded-md text-sm font-medium flex items-center w-full sm:w-auto"
                onClick={() => {
                  if (window.Calendly) {
                    window.Calendly.initPopupWidget({
                      url: 'https://calendly.com/teampoweredby/powered_by-demo-virtual-se?hide_gdpr_banner=1'
                    });
                  }
                }}
              >
                Schedule a Demo <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Right side - Form */}
        <div className="lg:col-span-6">
          <div className={`mt-8 lg:mt-0 transition-all duration-1000 delay-300 ease-out transform
            ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            
            {/* Form */}
            <div className="rounded-[2rem] border border-white/50 p-5 overflow-hidden">
              {/* Added e-book text above the form - Changed underline from purple to red */}
              <div className="mb-3 text-white">
                <h3 className="font-semibold text-xl mb-2">Read our comprehensive e-book <span className="border-b-2 border-[#ea384c]">A Virtual SE in the Modern SaaS Sales Organization</span></h3>
                <p className="text-gray-300 mb-1">Learn how to guarantee SE coverage in every sales meeting using an AI-enabled pre-sales engineer.</p>
                <p className="text-gray-200 italic text-sm">Enter your details below to access the report:</p>
              </div>
              
              {/* Updated Tally form with new data attributes approach */}
              <div className="mt-4">
                <button 
                  data-tally-open="mOE8RK" 
                  data-tally-hide-title="1" 
                  data-tally-auto-close="0"
                  className="bg-[#ea384c] hover:bg-[#d42e40] text-white px-4 py-2 rounded-md text-sm font-medium w-full"
                >
                  Access the e-book
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Video Dialog */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-4xl p-0 border-none bg-transparent" closeButton={false}>
          <div className="aspect-video w-full">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/MgEj8njkT74?si=OE0h0TqU76nwmSD8&autoplay=1" 
              title="Virtual SE Overview Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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
