
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { getVapiInstance, stopVapiCall } from "@/services/vapiService";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/mercedes-dealer/HeroSection";
import SpringSalesEvent from "@/components/mercedes-dealer/SpringSalesEvent";
import ServicesGrid from "@/components/mercedes-dealer/ServicesGrid";
import VisitSection from "@/components/mercedes-dealer/VisitSection";
import SpecialOffersDialog from "@/components/mercedes-dealer/SpecialOffersDialog";
import MercedesCallDialog from "@/components/mercedes-dealer/MercedesCallDialog";
import MercedesLogo from "@/components/mercedes-dealer/MercedesLogo";

const MercedesDealer = () => {
  const [showOffers, setShowOffers] = useState(false);
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (isCallActive) {
        stopVapiCall();
      }
    };
  }, [isCallActive]);

  const handleCall = async () => {
    setIsProcessing(true);
    try {
      const vapi = getVapiInstance();
      await vapi.start("6c02f892-3082-4c68-a3ee-92ca86444331");
      setIsCallActive(true);
      
      vapi.on("call-end", () => {
        setIsCallActive(false);
        setShowCallDialog(false);
        navigate('/demo');
        toast({
          title: "Call Completed",
          description: "Thank you for contacting Mercedes of Tacoma!",
        });
      });

      setIsProcessing(false);
      toast({
        title: "Call Started",
        description: "You are now connected to a Mercedes-Benz sales representative. You can speak directly through your browser.",
      });
    } catch (error) {
      console.error('Error initiating call:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Unable to connect to Mercedes sales team. Please try again.",
      });
      setIsProcessing(false);
    }
  };

  const handleEndCall = () => {
    stopVapiCall();
    setIsCallActive(false);
    setShowCallDialog(false);
    navigate('/demo');
    toast({
      title: "Call Ended",
      description: "Your call with Mercedes of Tacoma has ended.",
    });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <MercedesLogo />

      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-12">
        <SpringSalesEvent
          isProcessing={isProcessing}
          isCallActive={isCallActive}
          setShowOffers={setShowOffers}
          setShowCallDialog={setShowCallDialog}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-12">
        <ServicesGrid />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-12">
        <VisitSection
          isProcessing={isProcessing}
          isCallActive={isCallActive}
          showCallDialog={showCallDialog}
          setShowCallDialog={setShowCallDialog}
        />
      </div>

      <SpecialOffersDialog
        showOffers={showOffers}
        setShowOffers={setShowOffers}
      />

      <MercedesCallDialog
        showCallDialog={showCallDialog}
        setShowCallDialog={setShowCallDialog}
        isCallActive={isCallActive}
        isProcessing={isProcessing}
        handleCall={handleCall}
        handleEndCall={handleEndCall}
      />
    </div>
  );
};

export default MercedesDealer;
