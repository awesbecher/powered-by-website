
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useVideoDialog } from "@/hooks/useVideoDialog";

export const FinalCTASection = () => {
  const { open: openVideo } = useVideoDialog();
  
  const handleOpenVoiceDialog = () => {
    document.dispatchEvent(new CustomEvent('open-voice-dialog'));
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1a0b2e] to-[#2f1c4a]">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Build Your AI Agent?
        </h2>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Transform your business operations with AI agents that work around the clock, delivering exceptional customer experiences.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            onClick={openVideo}
            className="bg-white hover:bg-gray-100 text-[#8B5CF6] font-medium px-6 py-4 text-lg"
          >
            What's an AI Agent?
            <Play className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            asChild
            className="bg-[#8B5CF6] hover:bg-[#7c4deb] text-white px-6 py-4 text-lg"
          >
            <Link to="/demo">
              Try Demos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button 
            onClick={handleOpenVoiceDialog}
            className="border-2 border-white bg-transparent hover:bg-white/10 text-white px-6 py-4 text-lg"
          >
            Talk to an AI Agent Now
            <Phone className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
