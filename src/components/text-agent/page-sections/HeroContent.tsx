import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Tv } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getCalApi } from "@calcom/embed-react";

interface HeroContentProps {
  initialLoad: boolean;
  handleContact: () => void;
}

export const HeroContent = ({ initialLoad, handleContact }: HeroContentProps) => {
  const [videoOpen, setVideoOpen] = useState(false);

  // Initialize Cal.com at the component level
  useEffect(() => {
    (async function () {
      try {
        console.log("Initializing Cal.com embed in TextAgent HeroContent");
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
        console.log("Cal.com embed initialized successfully in TextAgent HeroContent");
      } catch (error) {
        console.error("Error initializing Cal.com embed in TextAgent HeroContent:", error);
      }
    })();
  }, []);

  return (
    <div className={`w-full space-y-6 transition-all duration-1000 ease-out transform
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      
      {/* Tag line */}
      <div className="inline-block px-3 py-1 bg-[#9b87f5]/10 rounded-full border border-[#9b87f5]/20">
        <p className="text-sm text-[#9b87f5] font-medium">AI Agent Powered Text Communication for SMBs</p>
      </div>
      
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
        Transform Your Business with <span className="text-[#9b87f5] relative">
          AI Text Agents
          <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 358 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9C118.957 4.47226 238.5 4.47231 355 9" stroke="#9b87f5" strokeWidth="6" strokeLinecap="round"/>
          </svg>
        </span>
      </h1>
      
      <p className="text-xl text-gray-300">
        Automate text conversations, convert leads faster, and deliver instant support—24/7.
      </p>
      
      {/* CTA buttons */}
      <div className="flex flex-wrap gap-4 pt-2">
        <button 
          data-cal-link="team-powered-by-dfbtbb/get-started-today"
          data-cal-config='{"layout":"column_view","theme":"dark"}'
          className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-5 text-base rounded-md flex items-center"
        >
          <ArrowRight className="mr-2 h-5 w-5" /> Get Started
        </button>
        
        <Button 
          className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-6 py-5 text-base rounded-md flex items-center"
          onClick={() => setVideoOpen(true)}
        >
          <Tv className="mr-2 h-5 w-5" /> Watch Overview
        </Button>
      </div>
      
      {/* YouTube Video Dialog */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-3xl p-1 bg-black">
          <div className="aspect-video">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/MJLj44VGheQ?si=MRRhTwZsw9jIINAV&autoplay=1" 
              title="AI Text Agent Introduction" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};