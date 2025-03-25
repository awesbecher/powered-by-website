
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tv } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface HeroContentProps {
  initialLoad: boolean;
  handleContact: () => void;
}

export const HeroContent = ({ initialLoad, handleContact }: HeroContentProps) => {
  const [videoOpen, setVideoOpen] = useState(false);
  
  const scrollToForm = () => {
    // First find the Tally form container
    const formContainer = document.querySelector('.border.border-white.rounded-3xl');
    if (formContainer) {
      // Scroll to the form
      formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // After scrolling, find and focus on the first input field in the Tally form
      setTimeout(() => {
        const tallyIframe = document.querySelector('iframe[data-tally-src]');
        if (tallyIframe) {
          // Try to access iframe content and focus the first input
          try {
            const iframeDoc = (tallyIframe as HTMLIFrameElement).contentDocument || 
                             (tallyIframe as HTMLIFrameElement).contentWindow?.document;
            if (iframeDoc) {
              const firstInput = iframeDoc.querySelector('input, textarea, select');
              if (firstInput) {
                (firstInput as HTMLElement).focus();
              }
            }
          } catch (error) {
            console.log("Could not focus on form input due to cross-origin restrictions");
            // If we can't access the iframe content due to cross-origin restrictions,
            // at least we've scrolled to the form
          }
        }
      }, 1000); // Wait for the scroll to complete and iframe to fully load
    }
  };

  return (
    <div className={`w-full lg:w-1/2 space-y-4 transition-all duration-1000 ease-out transform
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
        Meet Your New <span className="text-[#9b87f5]">AI Receptionist</span>
      </h1>
      <p className="text-lg text-gray-300">
        With an AI Receptionist by <span className="bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md">Powered_by</span>, you get the same personable experience customers expect from a traditional receptionist—only now it never sleeps, forgets, or drops a call. Sign up now to start building your own AI Receptionist.
      </p>
      <div className="space-y-3 text-gray-300">
        <p className="text-lg">Our AI Receptionist adapts to your business needs:</p>
        <ul className="list-disc list-inside space-y-1 pl-2 text-sm">
          <li>Restaurant: Automate reservations and answer menu questions</li>
          <li>Auto Dealership: Pre-screen leads for test drives</li>
          <li>Retail: Answer product questions and handle order inquiries</li>
          <li>Small Business: Capture every lead, 24/7/365</li>
        </ul>
      </div>
      
      {/* New "See for yourself" section with video button */}
      <div className="flex flex-col items-start">
        <p className="text-gray-300 font-bold mb-1 text-left">See for yourself:</p>
        <div className="flex flex-wrap gap-3 self-start">
          <Button 
            className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-4 text-base rounded-md flex items-center"
            onClick={() => setVideoOpen(true)}
          >
            <Tv className="mr-2 h-5 w-5" /> Watch our intro to Voice AI
          </Button>
        </div>
      </div>
      
      {/* YouTube Video Dialog */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-3xl p-1 bg-black">
          <div className="aspect-video">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/A4PPY9idmpo?si=yq0epPxXt2cThg_2&autoplay=1" 
              title="Voice AI Introduction" 
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
