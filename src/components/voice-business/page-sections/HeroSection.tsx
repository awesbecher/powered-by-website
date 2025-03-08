
import { useState } from "react";
import { VoiceChatDialog } from "@/components/voice-business/VoiceChatDialog";
import { useToast } from "@/hooks/use-toast";
import { initiateVapiCall, stopVapiCall } from "@/services/vapiService";
import { HeroContent } from "./HeroContent";
import { ServiceBoxes } from "./ServiceBoxes";

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
    <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-8">
        <HeroContent initialLoad={initialLoad} handleContact={handleContact} />
        <ServiceBoxes initialLoad={initialLoad} onTryNow={handleVoiceChatClick} />
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
