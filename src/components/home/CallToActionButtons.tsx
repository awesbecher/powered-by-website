
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Tv } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getCalApi } from "@calcom/embed-react";

interface CallToActionButtonsProps {
  handleNavigation: (path: string) => void;
  setShowDialog: (show: boolean) => void;
}

export const CallToActionButtons = ({ handleNavigation, setShowDialog }: CallToActionButtonsProps) => {
  const [videoOpen, setVideoOpen] = useState(false);
  
  const handleTalkToAgent = () => {
    console.log("Talk to Agent button clicked in CallToActionButtons");
    // Dispatch the open-voice-dialog event
    document.dispatchEvent(new CustomEvent('open-voice-dialog'));
  };

  useEffect(() => {
    // Initialize Cal.com
    (async function () {
      const cal = await getCalApi({"namespace":"get-started-today"});
      cal("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#292929"},"dark":{"cal-brand":"#fafafa"}},"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, []);
  
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-4xl">
      <Button
        onClick={() => setVideoOpen(true)}
        className="relative z-20 text-white bg-[#6E59A5] hover:bg-[#6E59A5]/80 px-3 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
      >
        What's an AI agent?
        <Tv className="ml-2 h-5 w-5" />
      </Button>
      <Button
        data-cal-namespace="get-started-today"
        data-cal-link="team-powered-by-dfbtbb/get-started-today"
        data-cal-config='{"layout":"month_view"}'
        className="relative z-20 bg-accent hover:bg-accent-dark text-white px-3 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
      >
        Get Started
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
              src="https://www.youtube.com/embed/w6juT92KdRo?si=NKIDvf5BdRGp2zzx&autoplay=1" 
              title="What's an AI Agent?" 
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
