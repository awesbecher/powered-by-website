import { Button } from "@/components/ui/button";
import { ArrowRight, Tv, Play, Mic } from "lucide-react";
import { useState, useEffect } from "react";
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
        console.log("Initializing Cal.com embed in EmailAgent HeroContent");
        // Remove namespace parameter
        const cal = await getCalApi();
        cal("ui", {
          "cssVarsPerTheme": {
            "light": {"cal-brand":"#292929"},
            "dark": {"cal-brand":"#fafafa"}
          },
          "hideEventTypeDetails": false,
          "layout": "month_view"
        });
        console.log("Cal.com embed initialized successfully in EmailAgent HeroContent");
      } catch (error) {
        console.error("Error initializing Cal.com embed in EmailAgent HeroContent:", error);
      }
    })();
  }, []);
  
  const handleDemoClick = () => {
    console.log("Get Started button clicked in EmailAgent HeroContent");
    try {
      // Direct modal trigger approach
      (window as any).Cal?.('ui', {
        styles: { branding: { brandColor: '#000000' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
      (window as any).Cal?.('showModal', {
        calLink: "team-powered-by-dfbtbb/get-started-with-ai-email-agents",
        config: {
          layout: 'month_view',
        },
      });
    } catch (err) {
      console.error("Failed to open Cal.com modal from HeroContent:", err);
      // Fallback to parent's handler
      handleContact();
    }
  };
  
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
    <div className={`w-full space-y-6 transition-all duration-1000 ease-out transform
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      
      {/* Tag line */}
      <div className="inline-block px-3 py-1 bg-[#9b87f5]/10 rounded-full border border-[#9b87f5]/20">
        <p className="text-sm text-[#9b87f5] font-medium">AI Agent Powered Email Communication for SMBs</p>
      </div>
      
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
        Transform Your Inbox with <span className="text-[#9b87f5] relative">
          AI Email Agents
          <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 358 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9C118.957 4.47226 238.5 4.47231 355 9" stroke="#9b87f5" strokeWidth="6" strokeLinecap="round"/>
          </svg>
        </span>
      </h1>
      
      <p className="text-xl text-gray-300">
        Automate conversations, convert leads faster, and deliver instant support—24/7.
      </p>
      
      <div className="space-y-4 text-gray-300">
        <p className="text-xl">Imagine an AI that:</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
          {[
            "Responds to inquiries in seconds, not hours",
            "Handles customer queries with human-like understanding",
            "Updates CRM and systems automatically",
            "Learns from every interaction to improve over time",
            "Provides consistent messaging across all communications",
            "Frees your team to focus on high-value tasks"
          ].map((item, i) => (
            <li key={i} className="flex items-start">
              <div className="mr-2 mt-1 text-[#9b87f5]">•</div>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* CTA buttons */}
      <div className="flex flex-wrap gap-4 pt-2">
        <Button 
          className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-5 text-base rounded-md flex items-center"
          onClick={handleGetStarted}
        >
          <ArrowRight className="mr-2 h-5 w-5" /> Get Started
        </Button>
      </div>
      
      {/* Hidden Cal.com button */}
      <button
        className="hidden"
        data-cal-link="team-powered-by-dfbtbb/get-started-today"
        data-cal-config='{"layout":"month_view"}'
      />
      
      {/* YouTube Video Dialog */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-3xl p-1 bg-black">
          <div className="aspect-video">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/MJLj44VGheQ?si=MRRhTwZsw9jIINAV&autoplay=1" 
              title="AI Email Agent Introduction" 
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