
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { WebsiteSimulation } from "@/components/voice-chat/WebsiteSimulation";
import { VoiceAgentContactForm } from "@/components/voice-chat/VoiceAgentContactForm";
import { initiateVapiCall, stopVapiCall } from "@/services/vapiService";
import { HeroContent } from "./components/HeroContent";
import { FeaturesList } from "./components/FeaturesList";
import { VoiceChatDialog } from "@/components/voice-chat/VoiceChatDialog";

interface HeroSectionProps {
  initialLoad: boolean;
  handleContact: () => void;
}

export const HeroSection = ({ initialLoad, handleContact }: HeroSectionProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showVoiceChatDialog, setShowVoiceChatDialog] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firstNameInputRef = useRef<HTMLInputElement>(null);

  const ASSISTANT_ID = "c7acc482-bee2-40a3-85d1-a192ce2a6685";

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

  const handleGetStarted = () => {
    if (firstNameInputRef.current) {
      firstNameInputRef.current.focus();
      firstNameInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
        <HeroContent 
          initialLoad={initialLoad}
          handleVoiceChatClick={handleVoiceChatClick}
          handleGetStarted={handleGetStarted}
        />
        
        <div className={`transition-all duration-1000 delay-300 ease-out transform
          ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
          <VoiceAgentContactForm firstNameInputRef={firstNameInputRef} />
        </div>
      </div>

      <div className="mb-20">
        <div className="flex flex-col lg:flex-row items-start gap-12 justify-between">
          <FeaturesList initialLoad={initialLoad} />
          <div className={`w-full lg:w-[50%] lg:ml-auto transition-all duration-1000 delay-300 ease-out transform
            ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            <WebsiteSimulation />
          </div>
        </div>
      </div>

      <VoiceChatDialog
        showDialog={showVoiceChatDialog}
        isCallActive={isCallActive}
        isSubmitting={isSubmitting}
        handleCloseDialog={handleCloseDialog}
        handleStartCall={handleStartCall}
        handleEndCall={handleEndCall}
        source="voice-chat"
      />
    </section>
  );
};
