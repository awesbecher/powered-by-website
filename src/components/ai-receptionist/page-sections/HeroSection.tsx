import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowRight, Calendar, Headset, Phone, Clock, MessageCircle } from "lucide-react";
import { AIReceptionistCard } from "@/components/ai-receptionist/page-sections/AIReceptionistCard";

interface HeroSectionProps {
  initialLoad: boolean;
  handleVoiceChatClick: () => void;
  handleTryVoiceDemo: () => void;
  videoOpen: boolean;
  setVideoOpen: (open: boolean) => void;
}

export const HeroSection = ({ 
  initialLoad, 
  handleVoiceChatClick, 
  handleTryVoiceDemo, 
  videoOpen, 
  setVideoOpen 
}: HeroSectionProps) => {
  const handleGetStarted = () => {
    const calBtn = document.querySelector('[data-cal-link="team-powered-by-dfbtbb/get-started-today"]');
    if (calBtn instanceof HTMLElement) {
      console.log("Cal.com button found, triggering click");
      calBtn.click();
    } else {
      console.error("Cal.com button not found in DOM, navigating to /contact as fallback");
      window.location.href = '/contact';
    }
  };

  return (
    <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-20 right-10 w-96 h-96 rounded-full bg-[#7100ff]/10 blur-3xl"></div>
        <div className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-[#9b87f5]/10 blur-2xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-[#5c00d6]/15 blur-2xl"></div>
        
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dotPattern" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#9b87f5" fillOpacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotPattern)" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className={`w-full transition-all duration-1000 ease-out transform
            ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#6342ff]/20 border border-[#6342ff]/40">
                <p className="text-sm text-[#9b87f5] font-medium flex items-center">
                  <Phone className="h-3.5 w-3.5 mr-1.5" />
                  <span>Never miss a call again</span>
                </p>
              </div>
              
              <div className="relative">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Meet Your New{" "}
                  <div className="relative inline-block">
                    <span className="relative z-10 text-[#9b87f5]">AI Receptionist</span>
                    <span className="absolute -bottom-2 left-0 w-full h-3 bg-gradient-to-r from-[#7100ff]/30 to-[#9b87f5]/30 rounded-full z-0 blur-sm"></span>
                  </div>
                </h1>
              </div>
              
              <p className="text-xl text-gray-300 relative z-10 max-w-2xl">
                Save time and money by automating inbound calls 24/7. Our AI Receptionist greets callers, 
                qualifies leads, answers FAQs, and schedules appointments — all without human intervention.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex items-start space-x-3">
                  <Phone className="text-[#9b87f5] h-6 w-6 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-medium text-lg">Never Miss a Call</h3>
                    <p className="text-gray-400 text-sm">Your AI receptionist answers every call 24/7</p>
                  </div>
                </div>
                
                <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex items-start space-x-3">
                  <Calendar className="text-[#9b87f5] h-6 w-6 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-medium text-lg">Automate Scheduling</h3>
                    <p className="text-gray-400 text-sm">Book appointments with calendar integration</p>
                  </div>
                </div>
                
                <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex items-start space-x-3">
                  <MessageCircle className="text-[#9b87f5] h-6 w-6 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-medium text-lg">Natural Conversations</h3>
                    <p className="text-gray-400 text-sm">Human-like voice interactions with customers</p>
                  </div>
                </div>
                
                <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex items-start space-x-3">
                  <Clock className="text-[#9b87f5] h-6 w-6 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-medium text-lg">Save Up To 60%</h3>
                    <p className="text-gray-400 text-sm">Reduce receptionist costs dramatically</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <Button 
                  className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-5 text-base rounded-md flex items-center"
                  onClick={handleGetStarted}
                >
                  <ArrowRight className="mr-2 h-5 w-5" /> Get Started
                </Button>
                
                <Button 
                  className="w-full sm:w-auto bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-4 text-base rounded-md flex items-center justify-center"
                  onClick={handleVoiceChatClick}
                >
                  <Headset className="mr-2 h-5 w-5" />
                  Try Live Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-5 flex items-center justify-center">
          <AIReceptionistCard handleVoiceChatClick={handleVoiceChatClick} initialLoad={initialLoad} />
        </div>
      </div>

      {/* Hidden Cal.com button */}
      <button
        className="hidden"
        data-cal-link="team-powered-by-dfbtbb/get-started-today"
        data-cal-config='{"layout":"month_view"}'
      />

      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-3xl p-1 bg-black">
          <div className="aspect-video">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/wCSt1ZTXJSc?si=A4PPY9idmpo&autoplay=1" 
              title="AI Receptionist Overview" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};