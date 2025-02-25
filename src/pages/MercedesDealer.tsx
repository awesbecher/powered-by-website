
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { initiateVogentCall } from "@/services/vogentService";
import HeroSection from "@/components/mercedes-dealer/HeroSection";
import SpringSalesEvent from "@/components/mercedes-dealer/SpringSalesEvent";
import ServicesGrid from "@/components/mercedes-dealer/ServicesGrid";
import VisitSection from "@/components/mercedes-dealer/VisitSection";
import SpecialOffersDialog from "@/components/mercedes-dealer/SpecialOffersDialog";

const MercedesDealer = () => {
  const [showOffers, setShowOffers] = useState(false);
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCall = async () => {
    if (!phoneNumber) {
      toast({
        variant: "destructive",
        title: "Please enter your phone number",
        description: "A phone number is required to connect with a sales representative."
      });
      return;
    }

    setIsLoading(true);
    try {
      await initiateVogentCall(phoneNumber, 'mercedes');
      setShowCallDialog(false);
      setPhoneNumber("");
      toast({
        title: "Call initiated",
        description: "A sales representative will call you shortly."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to initiate call",
        description: error.message || "Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="absolute top-24 right-8 z-10">
        <img 
          src="/lovable-uploads/7e5ffc92-3c33-4a4a-8d6d-add3197d2f2f.png"
          alt="Mercedes of Tacoma Logo"
          className="h-16 w-auto"
        />
      </div>

      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-12">
        <SpringSalesEvent
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          handleCall={handleCall}
          isLoading={isLoading}
          setShowOffers={setShowOffers}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-12">
        <ServicesGrid />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-12">
        <VisitSection
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          handleCall={handleCall}
          isLoading={isLoading}
          showCallDialog={showCallDialog}
          setShowCallDialog={setShowCallDialog}
        />
      </div>

      <SpecialOffersDialog
        showOffers={showOffers}
        setShowOffers={setShowOffers}
      />
    </div>
  );
};

export default MercedesDealer;
