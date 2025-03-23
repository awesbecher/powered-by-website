
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/mercedes-dealer/HeroSection";
import VisitSection from "@/components/mercedes-dealer/VisitSection";
import ServicesGrid from "@/components/mercedes-dealer/ServicesGrid";
import SpringSalesEvent from "@/components/mercedes-dealer/SpringSalesEvent";

const MercedesDealer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [showOffers, setShowOffers] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black to-neutral-900">
      <Navbar />
      <HeroSection />
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
      <Footer />
    </div>
  );
};

export default MercedesDealer;
