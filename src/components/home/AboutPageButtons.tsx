
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, Play } from "lucide-react";
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
          onClick={handleWhoWeAreClick}
        >
          <Users className="mr-2 h-5 w-5" />
          Our Team
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
