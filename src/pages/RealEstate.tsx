import { useEffect, useState } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { HeroSection } from "@/components/real-estate/HeroSection";
import { ActionButtons } from "@/components/real-estate/ActionButtons";
import { ServicesSection } from "@/components/real-estate/ServicesSection";
import { ContactSection } from "@/components/real-estate/ContactSection";
import { CallConfirmationDialog } from "@/components/shared/CallConfirmationDialog";
import { CallInProgressDialog } from "@/components/shared/CallInProgressDialog";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { initiateVapiCall, endVapiCall } from "@/services/vapiService";
import { useToast } from "@/hooks/use-toast";

const RealEstate = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Dialog states
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showCallInProgress, setShowCallInProgress] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  // Call states
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const { toast } = useToast();

  // Call handlers
  const handleStartCall = async () => {
    try {
      setIsLoading(true);
      // Initialize Vapi call first
      await initiateVapiCall('realEstate');
      // Only if successful, close confirmation and show call dialog
      setShowConfirmation(false);
      setShowCallInProgress(true);
    } catch (error) {
      console.error('Failed to start call:', error);
      let errorMessage = "Failed to start the voice chat. Please try again.";
      
      if (error instanceof Error) {
        const errorText = error.message.toLowerCase();
        if (errorText.includes('permission denied') || errorText.includes('notallowederror')) {
          errorMessage = "Microphone access was denied. Please allow microphone access and try again.";
        } else if (errorText.includes('notfounderror')) {
          errorMessage = "No microphone found. Please check your microphone connection and try again.";
        } else if (errorText.includes('notreadableerror')) {
          errorMessage = "Could not access your microphone. Please check if another application is using it.";
        } else {
          errorMessage = `Voice chat error: ${error.message}`;
        }
      }
      
      toast({
        variant: "destructive",
        title: "Call Error",
        description: errorMessage,
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndCall = async () => {
    try {
      await endVapiCall();
      setShowCallInProgress(false);
      setCallDuration(0);
    } catch (error) {
      console.error('Error ending call:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to end the call properly. Please refresh the page.",
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />

      <HeroSection />
      
      <ActionButtons 
        isOpen={showConfirmation}
        setIsOpen={setShowConfirmation}
      />

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogTitle className="sr-only">Talk to an Agent</DialogTitle>
          <CallConfirmationDialog 
            service="realEstate"
            onStartCall={handleStartCall}
            onClose={() => setShowConfirmation(false)}
            isLoading={isLoading}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showCallInProgress} onOpenChange={setShowCallInProgress}>
        <DialogContent>
          <DialogTitle className="sr-only">Call in Progress</DialogTitle>
          <CallInProgressDialog 
            service="realEstate"
            onEndCall={handleEndCall}
            callDuration={callDuration}
            setCallDuration={setCallDuration}
          />
        </DialogContent>
      </Dialog>

      <ServicesSection />
      
      <ContactSection 
        isScheduleOpen={isScheduleOpen}
        setIsScheduleOpen={setIsScheduleOpen}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        handleCall={() => setShowConfirmation(true)}
        isLoading={isLoading}
      />

      <Footer />
    </div>
  );
};

export default RealEstate;
