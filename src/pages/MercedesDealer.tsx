
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/mercedes-dealer/HeroSection";
import VisitSection from "@/components/mercedes-dealer/VisitSection";
import ServicesGrid from "@/components/mercedes-dealer/ServicesGrid";
import SpringSalesEvent from "@/components/mercedes-dealer/SpringSalesEvent";
import MercedesCallDialog from "@/components/mercedes-dealer/MercedesCallDialog";
import { useToast } from "@/hooks/use-toast";
import { initiateVapiCall, stopVapiCall } from "@/services/vapiService";
import MobileCallCTA from "@/components/mercedes-dealer/MobileCallCTA";

const MercedesDealer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [showOffers, setShowOffers] = useState(false);
  const { toast } = useToast();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCall = async () => {
    setIsProcessing(true);
    try {
      await initiateVapiCall("6c02f892-3082-4c68-a3ee-92ca86444331");
      setIsCallActive(true);
      toast({
        title: "Call initiated",
        description: "You are now connected to Dave Frankel from Mercedes of Tacoma."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to initiate call",
        description: error instanceof Error ? error.message : "Please try again later."
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEndCall = async () => {
    try {
      await stopVapiCall();
      setIsCallActive(false);
      toast({
        title: "Call ended",
        description: "Thank you for calling Mercedes of Tacoma."
      });
    } catch (error) {
      console.error("Error ending call:", error);
      toast({
        variant: "destructive",
        title: "Failed to end call",
        description: "Please try again."
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black to-neutral-900">
      <Navbar />
      <HeroSection 
        setShowCallDialog={setShowCallDialog} 
        isProcessing={isProcessing}
        isCallActive={isCallActive}
      />
      <ServicesGrid />
      <SpringSalesEvent 
        isProcessing={isProcessing} 
        isCallActive={isCallActive}
        setShowOffers={setShowOffers}
        setShowCallDialog={setShowCallDialog}
      />
      <VisitSection 
        isProcessing={isProcessing}
        isCallActive={isCallActive}
        showCallDialog={showCallDialog}
        setShowCallDialog={setShowCallDialog}
      />
      <MobileCallCTA setShowCallDialog={setShowCallDialog} />
      <MercedesCallDialog
        showCallDialog={showCallDialog}
        setShowCallDialog={setShowCallDialog}
        isCallActive={isCallActive}
        isProcessing={isProcessing}
        handleCall={handleCall}
        handleEndCall={handleEndCall}
      />
      <Footer />
    </div>
  );
};

export default MercedesDealer;
