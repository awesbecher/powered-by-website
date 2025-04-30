import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Users, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface AboutPageButtonsProps {
  onScrollToSection?: (ref: React.RefObject<HTMLElement>) => void;
  sectionRef?: React.RefObject<HTMLElement>;
}

export const AboutPageButtons = ({ onScrollToSection, sectionRef }: AboutPageButtonsProps) => {
  const [showVideoDialog, setShowVideoDialog] = useState(false);

  const handleWhoWeAreClick = () => {
    if (onScrollToSection && sectionRef) {
      onScrollToSection(sectionRef);
    }
  };

  const handleWatchVideoClick = () => {
    setShowVideoDialog(true);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-5 justify-center mt-8 mx-auto max-w-xl">
        {/* Watch Launch Video Button */}
        <Button 
          className="bg-[#6342ff] hover:bg-[#7352ff] text-white px-8 py-6 rounded-lg text-lg font-medium flex items-center justify-center gap-3 shadow-md shadow-purple-700/20 transition-colors"
          onClick={handleWatchVideoClick}
        >
          <Play className="h-5 w-5" />
          Watch Launch Video
        </Button>
        
        {/* Meet Our Team Button */}
        <Button 
          className="bg-[#6342ff] hover:bg-[#7352ff] text-white px-8 py-6 rounded-lg text-lg font-medium flex items-center justify-center gap-3 shadow-md shadow-purple-700/20 transition-colors"
          onClick={handleWhoWeAreClick}
        >
          <Users className="h-5 w-5" />
          Meet Our Team
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
