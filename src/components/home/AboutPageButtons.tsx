
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, Play, PresentationIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { VideoSection } from "@/components/product-hunt/video/VideoSection";

interface AboutPageButtonsProps {
  onScrollToSection?: (ref: React.RefObject<HTMLElement>) => void;
  sectionRef?: React.RefObject<HTMLElement>;
}

export const AboutPageButtons = ({ onScrollToSection, sectionRef }: AboutPageButtonsProps) => {
  const navigate = useNavigate();
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const [showPresentationDialog, setShowPresentationDialog] = useState(false);

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

  const handlePresentationClick = () => {
    setShowPresentationDialog(true);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <Button 
          variant="gradient" 
          size="lg"
          onClick={handleWatchVideoClick}
        >
          <Play className="mr-2 h-5 w-5" />
          Watch Launch Video
        </Button>
        
        <Button 
          variant="gradient" 
          size="lg"
          onClick={handlePresentationClick}
        >
          <PresentationIcon className="mr-2 h-5 w-5" />
          Read our Overview Presentation
        </Button>
        
        <Button 
          variant="gradient" 
          size="lg"
          onClick={handleWhoWeAreClick}
        >
          <Users className="mr-2 h-5 w-5" />
          Who We Are
        </Button>
        
        <Button 
          variant="gradient" 
          size="lg"
          onClick={handleCareersClick}
        >
          <Briefcase className="mr-2 h-5 w-5" />
          Careers
        </Button>
      </div>

      <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
        <DialogContent className="sm:max-w-4xl p-0 bg-transparent border-none">
          <VideoSection />
        </DialogContent>
      </Dialog>

      <Dialog open={showPresentationDialog} onOpenChange={setShowPresentationDialog}>
        <DialogContent className="sm:max-w-5xl bg-white p-0 overflow-hidden">
          <iframe 
            src="https://custom-ai-agent-solution-nq1xz3i.gamma.site/" 
            className="w-full h-[80vh]" 
            title="Overview Presentation"
            allow="fullscreen"
          ></iframe>
        </DialogContent>
      </Dialog>
    </>
  );
};
