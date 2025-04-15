
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Calendar, Clock } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
  return (
    <section className="relative pt-16 pb-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-20 right-10 w-96 h-96 rounded-full bg-[#7100ff]/10 blur-3xl"></div>
        <div className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-[#9b87f5]/10 blur-2xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-[#5c00d6]/15 blur-2xl"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        <div className="lg:col-span-8 flex flex-col justify-center">
          <div className={`w-full transition-all duration-1000 ease-out transform
            ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            <div className="space-y-6">
              <div className="relative">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Transform Your Business With{" "}
                  <div className="relative inline-block">
                    <span className="relative z-10 text-[#9b87f5]">AI Receptionists</span>
                    <span className="absolute -bottom-2 left-0 w-full h-3 bg-gradient-to-r from-[#7100ff]/30 to-[#9b87f5]/30 rounded-full z-0 blur-sm"></span>
                  </div>
                </h1>
              </div>
              
              <p className="text-xl text-gray-300 relative z-10">
                <span className="bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md mr-1">Powered_by</span>
                : AI Receptionists. Automate phone calls, answer questions 24/7, and convert leads into customers. Perfect for businesses of all sizes.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
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
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <Button 
                  className="w-full sm:w-auto bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-4 text-base rounded-md flex items-center justify-center"
                  onClick={() => setVideoOpen(true)}
                >
                  Watch Overview
                </Button>
                
                <Button 
                  className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white px-6 py-4 text-base rounded-md flex items-center justify-center border-2 border-white"
                  onClick={handleTryVoiceDemo}
                >
                  Try Voice Demo
                </Button>
                
                <Button 
                  className="w-full sm:w-auto bg-[#6342ff] hover:bg-[#5835e0] text-white px-6 py-4 text-base rounded-md flex items-center justify-center"
                  data-cal-link="team-powered-by-dfbtbb/get-started-with-ai-receptionist"
                  data-cal-namespace="get-started-with-ai-receptionist"
                  data-cal-config='{"layout":"month_view"}'
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-4 flex items-center justify-center">
          <AIReceptionistCard handleVoiceChatClick={handleVoiceChatClick} initialLoad={initialLoad} />
        </div>
      </div>

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
}
