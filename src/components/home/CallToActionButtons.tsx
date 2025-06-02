
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

  console.log('DEBUG_VIDEO_UPDATE: Rendering CallToActionButtons with h-rpV6f0JJs');
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
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/h-rpV6f0JJs?autoplay=1&si=1tjQiaso7Fs1aqgr" 
              title="What's an AI Agent?" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>

      <VapiCallDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
};

