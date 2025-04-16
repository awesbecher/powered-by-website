
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, Play, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface AboutPageButtonsProps {
  onScrollToSection?: (ref: React.RefObject<HTMLElement>) => void;
  sectionRef?: React.RefObject<HTMLElement>;
}

export const AboutPageButtons = ({ onScrollToSection, sectionRef }: AboutPageButtonsProps) => {
  const navigate = useNavigate();
  const [showVideoDialog, setShowVideoDialog] = useState(false);

  const handleWhoWeAreClick = () => {
    if (onScrollToSection && sectionRef) {
      onScrollToSection(sectionRef);
    }
  };

  const handleCareersClick = () => {
    navigate('/careers');
  };

  const handleWatchVideoClick = () => {
    setShowVideoDialog(true);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 mx-auto max-w-xl">
        <Button 
          variant="gradient" 
          size="xl"
          className="group relative overflow-hidden shadow-lg shadow-purple-700/20"
          onClick={handleWatchVideoClick}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Play className="mr-2 h-5 w-5" />
          Watch Launch Video
        </Button>
        
        <Button 
          variant="gradient" 
          size="xl"
          className="group shadow-lg shadow-purple-700/20"
          onClick={handleWhoWeAreClick}
        >
          <Users className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
          Meet Our Team
        </Button>
        
        <Button 
          variant="outline"
          size="xl"
          className="border-[#9b87f5]/30 bg-white/5 hover:bg-white/10 hover:border-[#9b87f5]/50 group transition-all"
          onClick={handleCareersClick}
        >
          <Briefcase className="mr-2 h-5 w-5" />
          Join Us
          <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
        </Button>
      </div>

      <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
        <DialogContent className="sm:max-w-4xl p-0 bg-transparent border-none">
          <div className="aspect-video">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/EGR10-TIQS8?si=GzJHlThADVQIsnl2&autoplay=1" 
              title="Powered by AI Launch Video" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
