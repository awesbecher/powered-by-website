import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowRight, Calendar, Headset, Phone, Clock, MessageCircle } from "lucide-react";
import { AIReceptionistCard } from "@/components/ai-receptionist/page-sections/AIReceptionistCard";
import { getCalApi } from "@calcom/embed-react";

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
  const [demoDialogOpen, setDemoDialogOpen] = useState(false);

  // Initialize Cal.com
  React.useEffect(() => {
    (async function () {
      try {
        console.log("Initializing Cal.com embed");
        const cal = await getCalApi();
        cal("ui", {
          theme: "dark",
          cssVarsPerTheme: {
            light: {"cal-brand": "#292929"},
            dark: {"cal-brand": "#fafafa"}
          },
          hideEventTypeDetails: false,
          layout: "column_view"
        });
      } catch (error) {
        console.error("Error initializing Cal.com:", error);
      }
    })();

    // Listen for demo dialog open event
    const handleDemoDialogOpen = () => {
      setDemoDialogOpen(true);
    };
    window.addEventListener('openDemoDialog', handleDemoDialogOpen);
    return () => {
      window.removeEventListener('openDemoDialog', handleDemoDialogOpen);
    };
  }, []);

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
                <button
                  data-cal-link="team-powered-by-dfbtbb/get-started-today"
                  data-cal-config='{"layout":"column_view","theme":"dark"}'
                  className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-5 text-base rounded-md flex items-center"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                
                <Button 
                  className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white px-6 py-4 text-base rounded-md flex items-center justify-center border-2 border-white"
                  onClick={() => setVideoOpen(true)}
                >
                  Watch Overview
                </Button>
                
                <Button 
                  className="w-full sm:w-auto bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-4 text-base rounded-md flex items-center justify-center"
                  onClick={() => setDemoDialogOpen(true)}
                >
                  <Headset className="mr-2 h-5 w-5" />
                  Try Live Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-5 flex items-center justify-center">
          <AIReceptionistCard initialLoad={initialLoad} />
        </div>
      </div>

      {/* Demo Numbers Dialog */}
      <Dialog open={demoDialogOpen} onOpenChange={setDemoDialogOpen}>
        <DialogContent className="bg-[#1a0b2e] text-white border border-white/10 p-6 max-w-lg">
          <h2 className="text-2xl font-bold mb-4">Try our AI Receptionist in action now!</h2>
          <p className="text-gray-300 mb-6">
            You can call any of the numbers below and you will be connected to an AI assistant for that business. Don't worry, these are just demo businesses!
          </p>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#9b87f5] mb-1">Real Estate Use Case:</h3>
              <p className="text-gray-300">Call Township Real Estate @ (732) 702-8348</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#9b87f5] mb-1">Auto Dealership Use Case:</h3>
              <p className="text-gray-300">Call Mercedes of Tacoma @ (732) 638-0513</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#9b87f5] mb-1">Insurance Use Case:</h3>
              <p className="text-gray-300">Call Planter's Insurance @ (575) 305-9390</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Dialog */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black">
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/A4PPY9idmpo?si=Ku1bYt3Q1E79oJqW&autoplay=1"
              title="Voice AI Introduction"
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