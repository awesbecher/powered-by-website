
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Play } from "lucide-react";
import { TallyFormEmbed } from "@/components/voice-chat/TallyFormEmbed";
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
          url: 'https://calendly.com/teampoweredby/powered_by-demo-virtual-se?hide_gdpr_banner=1',
          text: 'Schedule Demo',
          color: '#9b87f5',
          textColor: '#ffffff'
        });
      }
    };
    
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
    <section className="pt-8 pb-0 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-0">
        {/* Left side - Hero content */}
        <div className="lg:col-span-6">
          <div className={`space-y-6 transition-all duration-1000 ease-out transform
            ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            <h1>
              <span className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#9b87f5] block">
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
              {/* Watch overview button */}
              <Button 
                className="order-3 sm:order-1 h-12 bg-black hover:bg-gray-900 text-white px-4 py-0 rounded-md text-sm font-medium flex items-center justify-center gap-2 w-full sm:w-auto"
                onClick={() => setVideoOpen(true)}
              >
                <Play className="h-4 w-4" /> Watch overview
              </Button>
              {/* Schedule Demo button */}
              <Button 
                className="order-1 sm:order-2 h-12 bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-4 py-0 rounded-md text-sm font-medium flex items-center w-full sm:w-auto"
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
              {/* Added e-book text above the form */}
              <div className="mb-3 text-white">
                <h3 className="font-semibold text-xl mb-2">Read our comprehensive e-book <span className="border-b-2 border-[#9b87f5]">A Virtual SE in the Modern SaaS Sales Organization</span></h3>
                <p className="text-gray-300 mb-1">Learn how to guarantee SE coverage in every sales meeting using an AI-enabled pre-sales engineer.</p>
                <p className="text-gray-200 italic text-sm">Enter your details below to access the report:</p>
              </div>
              <TallyFormEmbed 
                formId="wdz0QD"
                height={380}
                transparentBackground={true}
                alignLeft={true}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Video thumbnail and whitepaper button */}
      <div className="max-w-3xl mx-auto mt-8">
        {/* Video thumbnail */}
        <div className="mb-4 relative cursor-pointer rounded-xl overflow-hidden" onClick={() => setVideoOpen(true)}>
          <img 
            src="/lovable-uploads/af385cca-993d-4bd3-9376-89f61ac2b284.png" 
            alt="Video call with multiple participants" 
            className="w-full rounded-xl"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="h-20 w-20 bg-[#9b87f5] rounded-full flex items-center justify-center">
              <Play className="h-10 w-10 text-white" />
            </div>
          </div>
        </div>
        
        {/* Download whitepaper button moved above the ContentSections component */}
        <div className="flex justify-center mb-8">
          <button 
            data-tally-open="3y1q74" 
            data-tally-layout="modal" 
            data-tally-hide-title="1"
            className="h-12 bg-white hover:bg-gray-100 text-[#6342ff] px-6 py-0 rounded-md text-sm font-medium flex items-center justify-center gap-2 whitespace-nowrap leading-none w-auto"
          >
            <Download className="h-4 w-4" /> 
            <span className="inline-flex flex-col leading-none">Download whitepaper</span>
          </button>
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
