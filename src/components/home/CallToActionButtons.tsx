
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Tv, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { VapiCallDialog } from "@/components/shared/VapiCallDialog";

export const CallToActionButtons = () => {
  const navigate = useNavigate();
  const [videoOpen, setVideoOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleTalkToAgent = () => {
    console.log("CallToActionButtons: Talk to Agent button clicked, opening Vapi call dialog");
    setDialogOpen(true);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-4xl">
      <Button
        onClick={() => setVideoOpen(true)}
        className="relative z-20 text-white bg-[#6342ff] hover:bg-[#6342ff]/80 px-3 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
      >
        What's an AI agent?
        <Tv className="ml-2 h-5 w-5" />
      </Button>
      <Button
        className="relative z-20 bg-accent hover:bg-accent-dark text-white px-3 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
        onClick={() => navigate("/demo")}
      >
        Try Demos
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
      <Button 
        onClick={handleTalkToAgent}
        className="relative z-20 bg-white hover:bg-gray-100 text-accent px-3 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
      >
        Talk to an AI Agent Now
        <Phone className="ml-2 h-5 w-5" />
      </Button>

      {/* YouTube Video Dialog */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-3xl p-1 bg-black">
          <div className="aspect-video">
            <div className="youtube-player w-full h-full relative" onClick={(e) => {
              const iframe = e.currentTarget.querySelector('iframe');
              if (iframe) {
                // Update src to force video to play when clicked
                iframe.src = "https://www.youtube.com/embed/h-rpV6f0JJs?autoplay=1&si=1tjQiaso7Fs1aqgr";
                // Remove thumbnail overlay
                const overlay = e.currentTarget.querySelector('.youtube-thumbnail') as HTMLElement;
                if (overlay) overlay.style.display = 'none';
              }
            }}>
              {/* Thumbnail overlay */}
              <div className="youtube-thumbnail absolute inset-0 flex items-center justify-center">
                <img 
                  src="https://img.youtube.com/vi/h-rpV6f0JJs/maxresdefault.jpg" 
                  alt="What's an AI Agent?"
                  className="w-full h-full object-cover" 
                />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-[#9b87f5]/80 flex items-center justify-center transition-all duration-300 hover:bg-[#6342ff] hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-10 h-10">
                      <path d="M8 5.14v14l11-7-11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="about:blank" // Initial blank source, will be updated on click
                title="What's an AI Agent?"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <VapiCallDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
};

