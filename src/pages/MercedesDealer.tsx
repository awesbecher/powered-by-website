import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/mercedes-dealer/HeroSection";
import VisitSection from "@/components/mercedes-dealer/VisitSection";
import ServicesGrid from "@/components/mercedes-dealer/ServicesGrid";
import SpringSalesEvent from "@/components/mercedes-dealer/SpringSalesEvent";
import { CallConfirmationDialog } from "@/components/shared/CallConfirmationDialog";
import { CallInProgressDialog } from "@/components/shared/CallInProgressDialog";
import { Dialog } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import MobileCallCTA from "@/components/mercedes-dealer/MobileCallCTA";
import { initiateVapiCall, endVapiCall } from "@/services/vapiService";

const MercedesDealer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Dialog states
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showCallInProgress, setShowCallInProgress] = useState(false);
  const [showOffers, setShowOffers] = useState(false);

  // Call states
  const [isLoading, setIsLoading] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const { toast } = useToast();

  // Call handlers
  const handleStartCall = async () => {
    try {
      setIsLoading(true);
      // Initialize Vapi call with Mercedes assistant
      await initiateVapiCall('mercedes');
      // Only if successful, close confirmation and show call dialog
      setShowConfirmation(false);
      setShowCallInProgress(true);
    } catch (error) {
      console.error('Failed to start call:', error);
      toast({
        variant: "destructive",
        title: "Call Error",
        description: "Failed to start the voice chat. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndCall = async () => {
    // End the Vapi call first (this will refresh the page)
    await endVapiCall();
    // These won't execute due to page refresh, but including for completeness
    setShowCallInProgress(false);
    setCallDuration(0);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black to-neutral-900">
      <Navbar />
      <HeroSection 
        setShowCallDialog={setShowConfirmation}
        isProcessing={isLoading}
        isCallActive={showCallInProgress}
      />
      <ServicesGrid />
      <SpringSalesEvent 
        isProcessing={isLoading}
        isCallActive={showCallInProgress}
        setShowOffers={setShowOffers}
        setShowCallDialog={setShowConfirmation}
      />
      <VisitSection 
        isProcessing={isLoading}
        isCallActive={showCallInProgress}
        showCallDialog={showConfirmation}
        setShowCallDialog={setShowConfirmation}
      />
      <MobileCallCTA setShowCallDialog={setShowConfirmation} />

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <CallConfirmationDialog 
          onStartCall={handleStartCall}
          onClose={() => setShowConfirmation(false)}
          isLoading={isLoading}
          service="mercedes"
        />
      </Dialog>

      <Dialog open={showCallInProgress} onOpenChange={setShowCallInProgress}>
        <CallInProgressDialog 
          onEndCall={handleEndCall}
          callDuration={callDuration}
          setCallDuration={setCallDuration}
          service="mercedes"
        />
      </Dialog>

      <Footer />
    </div>
  );
};

export default MercedesDealer;
