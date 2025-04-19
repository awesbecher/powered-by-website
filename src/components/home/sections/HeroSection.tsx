
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useVideoDialog } from "@/hooks/useVideoDialog";

export const HeroSection = () => {
  const { open: openVideo, VideoDialog } = useVideoDialog();
  
  const handleOpenVoiceDialog = () => {
    document.dispatchEvent(new CustomEvent('open-voice-dialog'));
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Custom AI Agents <br />for SMBs
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              Launch AI agents that close deals, support customers, and scale operations — without writing code.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={openVideo}
                className="bg-white hover:bg-gray-100 text-[#8B5CF6] font-medium"
              >
                What's an AI Agent?
                <Play className="ml-2 h-4 w-4" />
              </Button>
              <Button asChild className="bg-[#8B5CF6] hover:bg-[#7c4deb] text-white">
                <Link to="/demo">
                  Try Demos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                onClick={handleOpenVoiceDialog}
                className="border-2 border-[#8B5CF6] bg-transparent hover:bg-[#8B5CF6]/10 text-white"
              >
                Talk to an AI Agent Now
                <Phone className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="bg-gradient-to-br from-[#8B5CF6] to-[#6342ff] p-1 rounded-2xl">
              <div className="bg-[#1a0b2e] rounded-2xl p-6">
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#8B5CF6] flex items-center justify-center text-white mr-3">
                    AI
                  </div>
                  <div className="bg-[#2f1c4a] p-4 rounded-xl max-w-md">
                    <p className="text-white">Hello! I'm your AI assistant. How can I help your business today?</p>
                  </div>
                </div>
                <div className="flex items-start justify-end">
                  <div className="bg-[#8B5CF6]/20 p-4 rounded-xl max-w-md">
                    <p className="text-white">I need help automating our customer support.</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white ml-3">
                    You
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-center">
                  <div className="animate-pulse flex gap-1">
                    <div className="bg-[#8B5CF6] h-2 w-2 rounded-full"></div>
                    <div className="bg-[#8B5CF6] h-2 w-2 rounded-full animation-delay-200"></div>
                    <div className="bg-[#8B5CF6] h-2 w-2 rounded-full animation-delay-400"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <VideoDialog />
    </section>
  );
};
