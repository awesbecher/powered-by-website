import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import HeroSection from "@/components/retail-services/HeroSection";
import ServicesGrid from "@/components/retail-services/ServicesGrid";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CallConfirmationDialog } from "@/components/shared/CallConfirmationDialog";
import { CallInProgressDialog } from "@/components/shared/CallInProgressDialog";
import Navbar from "@/components/layout/Navbar";
import RetailUseCaseExplainer from "@/components/retail-services/RetailUseCaseExplainer";
import { initiateVapiCall, endVapiCall } from "@/services/vapiService";

const RetailServices = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Dialog states
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showCallInProgress, setShowCallInProgress] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleStartCall = async () => {
    try {
      setIsLoading(true);
      // Initialize retail service call
      await initiateVapiCall('retail');
      // Only if successful, close confirmation and show call dialog
      setShowConfirmation(false);
      setShowCallInProgress(true);
    } catch (error) {
      console.error('Call error details:', error);
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
    <div className="min-h-screen w-full bg-black">
      <Navbar />
      <HeroSection onBookAppointment={() => setShowConfirmation(true)} />
      <ServicesGrid />
      <RetailUseCaseExplainer />

      {/* Call confirmation dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogTitle className="sr-only">Book Appointment</DialogTitle>
          <CallConfirmationDialog
            service="retail"
            isLoading={isLoading}
            onStartCall={handleStartCall}
            onClose={() => setShowConfirmation(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Call in progress dialog */}
      <Dialog open={showCallInProgress} onOpenChange={setShowCallInProgress}>
        <DialogContent>
          <DialogTitle className="sr-only">Call in Progress</DialogTitle>
          <CallInProgressDialog
            service="retail"
            callDuration={callDuration}
            setCallDuration={setCallDuration}
            onEndCall={handleEndCall}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RetailServices;
