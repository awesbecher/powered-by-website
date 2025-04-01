import { useState, useEffect } from "react";
import { VoiceChatDialog } from "@/components/voice-business/VoiceChatDialog";
import { useToast } from "@/hooks/use-toast";
import { initiateVapiCall, stopVapiCall } from "@/services/vapiService";
import { HeroContent } from "./HeroContent";
import { ServiceBoxes } from "./ServiceBoxes";
import { Phone } from "lucide-react";

interface HeroSectionProps {
  initialLoad: boolean;
  handleContact: () => void;
}

export const HeroSection = ({ initialLoad, handleContact }: HeroSectionProps) => {
  const { toast } = useToast();
  const [showVoiceChatDialog, setShowVoiceChatDialog] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Assistant ID for Vapi - updated with the provided ID
  const ASSISTANT_ID = "07e97137-ad5c-4846-ab6f-cff48c3e2da9";

  // Load Tally script when component mounts
  useEffect(() => {
    // Load Tally embed script
    if (window.Tally) {
      window.Tally.loadEmbeds();
    } else {
      const script = document.createElement('script');
      script.src = 'https://tally.so/widgets/embed.js';
      script.async = true;
      script.onload = () => {
        if (window.Tally) {
          window.Tally.loadEmbeds();
        }
      };
      document.body.appendChild(script);
    }
  }, []);

  const handleVoiceChatClick = () => {
    setShowVoiceChatDialog(true);
  };

  const handleCloseDialog = () => {
    if (isCallActive) {
      handleEndCall();
    }
    setShowVoiceChatDialog(false);
  };

  const handleStartCall = async () => {
    setIsSubmitting(true);
    try {
      const success = await initiateVapiCall(ASSISTANT_ID);
      if (success) {
        setIsCallActive(true);
        toast({
          title: "Call started successfully",
          description: "You're now connected to our AI voice agent.",
        });
      }
    } catch (error) {
      console.error("Failed to start call:", error);
      toast({
        title: "Failed to start call",
        description: error instanceof Error ? error.message : "Please check your microphone settings and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEndCall = async () => {
    try {
      await stopVapiCall();
      toast({
        title: "Call ended",
        description: "Thank you for trying our AI voice agent.",
      });
    } catch (error) {
      console.error("Error ending call:", error);
    } finally {
      setIsCallActive(false);
      setShowVoiceChatDialog(false);
    }
  };

  return (
    <section className="relative pt-16 pb-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-20 right-10 w-96 h-96 rounded-full bg-[#7100ff]/10 blur-3xl"></div>
        <div className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-[#9b87f5]/10 blur-2xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-[#5c00d6]/15 blur-2xl"></div>
        
        {/* Animated gradient particles */}
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dotPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#9b87f5" fillOpacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotPattern)" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left side: Hero content */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          <HeroContent initialLoad={initialLoad} handleContact={handleContact} />
        </div>
        
        {/* Right side: CTA card in a more compact size */}
        <div className="lg:col-span-4 flex items-center justify-center">
          <div className={`flex flex-col items-center transition-all duration-1000 delay-300 ease-out transform
            ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            {/* Purple spiral logo with vintage phone icon overlay */}
            <div className="relative">
              <img 
                src="/lovable-uploads/fadf21f3-43ca-4db8-aa89-a422bb086eda.png" 
                alt="Purple spiral logo" 
                className="w-48 h-48 object-contain mb-3"
              />
              
              {/* Vintage phone icon with gradient overlay - Properly centered in spiral */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-gradient-to-br from-[#9b87f5] to-[#6342ff] rounded-full p-3" style={{ transform: 'translateX(-2px) translateY(-4px)' }}>
                  <Phone className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            
            {/* Ready to see how it works text */}
            <div className="flex items-center justify-center gap-1 mb-4">
              <span className="text-purple-400">✧</span>
              <h3 className="text-xl font-bold text-white text-center">Ready to See How It Works?</h3>
            </div>
            
            {/* Get Started Button */}
            <button 
              onClick={handleVoiceChatClick}
              className="bg-[#6342ff] hover:bg-[#7352ff] text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <Phone className="w-5 h-5" />
              Get Started Now!
            </button>
          </div>
          <ServiceBoxes initialLoad={initialLoad} onTryNow={handleVoiceChatClick} />
        </div>
      </div>

      {/* Voice Chat Dialog Component */}
      <VoiceChatDialog
        showDialog={showVoiceChatDialog}
        isCallActive={isCallActive}
        isSubmitting={isSubmitting}
        handleCloseDialog={handleCloseDialog}
        handleStartCall={handleStartCall}
        handleEndCall={handleEndCall}
        source="voice-business"
      />
    </section>
  );
};
