
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Tv, Phone, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { PoweredByText } from "@/components/shared/PoweredByText";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface HeroContentProps {
  initialLoad: boolean;
  handleContact: () => void;
}

export const HeroContent = ({ initialLoad, handleContact }: HeroContentProps) => {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div className={`w-full space-y-6 transition-all duration-1000 ease-out transform
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <div className="inline-block px-4 py-1.5 rounded-full bg-[#6342ff]/20 border border-[#6342ff]/40 mb-4">
        <p className="text-sm text-[#9b87f5] font-medium flex items-center">
          <Zap className="h-3.5 w-3.5 mr-1.5" />
          <span>Scale Your Sales with AI-Powered Texting</span>
        </p>
      </div>
      
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
        Automate Your <span className="text-[#9b87f5]">Sales Outreach</span> with Text Agent AI
      </h1>
      
      <p className="text-xl text-gray-300 max-w-2xl">
        Reach more leads faster without adding headcount. Our AI Text Agent delivers hyper-personalized texting at scale, 
        reduces manual labor, and accelerates your top-of-funnel activities with intelligent automation.
      </p>
      
      <div className="flex flex-wrap gap-4 pt-2">
        <Button 
          className="bg-[#6342ff] hover:bg-[#7352ff] text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg"
          data-cal-namespace="get-started-with-ai-sms-text-agents"
          data-cal-link="team-powered-by-dfbtbb/get-started-with-ai-sms-text-agents"
          data-cal-config='{"layout":"month_view"}'
        >
          <ArrowRight className="w-5 h-5" />
          Request Demo
        </Button>
        
        <Button 
          className="bg-transparent hover:bg-white/10 text-white py-3 px-6 text-lg rounded-xl flex items-center justify-center border-2 border-white"
          onClick={() => setVideoOpen(true)}
        >
          <Tv className="mr-2 h-5 w-5" /> Watch Product Tour
        </Button>
      </div>
      
      <div className="pt-4 flex items-center">
        <div className="flex -space-x-2">
          {[1, 2, 3, 4].map(index => (
            <div key={index} className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 border-2 border-[#1a0b2e] flex items-center justify-center overflow-hidden">
              <span className="text-xs text-white font-bold">
                {String.fromCharCode(64 + index)}
              </span>
            </div>
          ))}
        </div>
        <span className="ml-3 text-sm text-gray-400">
          <span className="text-white font-medium">200+ businesses</span> are already using <PoweredByText /> Text Agent
        </span>
      </div>

      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-3xl p-1 bg-black">
          <div className="aspect-video">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/sl0F_AGsCxg?autoplay=1" 
              title="AI SMS-Text Agents Introduction" 
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
