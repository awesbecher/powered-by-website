
import { Button } from "@/components/ui/button";
import { ArrowRight, Tv, Mic } from "lucide-react";
import { Link } from "react-router-dom";
import { PoweredByText } from "@/components/shared/PoweredByText";
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface HeroContentProps {
  initialLoad: boolean;
  handleContact: () => void;
}

export const HeroContent = ({ initialLoad, handleContact }: HeroContentProps) => {
  const [videoOpen, setVideoOpen] = useState(false);
  
  // Function to open Calendly popup
  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/d/cm48-q4x-c3v?hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=7100ff'
      });
    }
  };
  
  return (
    <div className={`w-full space-y-4 transition-all duration-1000 ease-out transform
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
        Meet Your New <span className="text-[#9b87f5]">AI Email Agent</span>: Genius unleashed!
      </h1>
      <p className="text-lg text-gray-300">
        Imagine an AI agent that sends and receives emails for your business completely by itself. Sounds scary, right? Well, with the latest in AI agent intelligence, you can now deploy autonomous email agents that think, write, and behave exactly as your most well-trained staff.
      </p>
      <p className="text-lg text-gray-300">
        With an AI Email Agent by <PoweredByText />, you get intelligent email communication that handles follow-ups, inquiries, and customer interactions—all autonomously and compliant with company policies and privacy requirements.
      </p>
      <div className="space-y-3 text-gray-300">
        <p className="text-lg">Our AI Email Agent adapts to your business needs:</p>
        <ul className="list-disc list-inside space-y-1 pl-2 text-sm">
          <li>Follow-up emails after customer calls with personalized summaries</li>
          <li>Appointment scheduling and confirmation emails</li>
          <li>Meeting coordination and document preparation</li>
          <li>Fully "guardrailed" and compliant to your policy guidelines & privacy standards</li>
        </ul>
      </div>
      
      {/* "See for yourself" section with video button and new See Demo button */}
      <div className="flex flex-col items-start">
        <p className="text-gray-300 font-bold mb-1 text-left">See for yourself:</p>
        <div className="flex flex-wrap gap-3 self-start">
          <Button 
            className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-4 text-base rounded-md flex items-center"
            onClick={() => setVideoOpen(true)}
          >
            <Tv className="mr-2 h-5 w-5" /> Watch our intro to AI Email Agents
          </Button>
          
          {/* New "See Demo" button */}
          <Button 
            className="bg-transparent hover:bg-white/10 text-white px-6 py-4 text-base rounded-md flex items-center justify-center border-2 border-white"
            onClick={openCalendly}
          >
            <Mic className="mr-2 h-5 w-5" /> See Demo
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
