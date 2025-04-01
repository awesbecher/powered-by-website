
import { useState, useEffect } from "react";
import { VoiceChatDialog } from "@/components/voice-business/VoiceChatDialog";
import { useToast } from "@/hooks/use-toast";
import { initiateVapiCall, stopVapiCall } from "@/services/vapiService";
import { HeroContent } from "./HeroContent";
import { ServiceBoxes } from "./ServiceBoxes";
import { ServiceBox } from "./ServiceBox";
import { Calendar, Headphones, Phone, UserSearch } from "lucide-react";

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
          <ServiceBoxes initialLoad={initialLoad} onTryNow={handleVoiceChatClick} />
        </div>
      </div>

      {/* Service Boxes Grid */}
      <div className={`mt-12 transition-all duration-1000 delay-500 ease-out transform
        ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ServiceBox 
            icon={Phone} 
            category="Handle Customer Inquiries" 
            businessName="Answer calls, provide information, and convert leads"
            phoneNumber="24/7/365"
          />
          <ServiceBox 
            icon={Calendar} 
            category="Automate Scheduling" 
            businessName="Book appointments with calendar integration"
            phoneNumber="Seamless Experience"
          />
          <ServiceBox 
            icon={Headphones} 
            category="24/7 Availability" 
            businessName="Never miss a customer call again"
            phoneNumber="Always On"
          />
          <ServiceBox 
            icon={UserSearch} 
            category="Pre-Screen Leads & Qualify Clients" 
            businessName="Gather customer details upfront and qualify them"
            phoneNumber="Smart Qualification"
          />
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
