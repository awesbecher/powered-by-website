
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { initiateVapiCall, stopVapiCall } from "@/services/vapiService";
import HeroSection from "@/components/retail-services/HeroSection";
import ServicesGrid from "@/components/retail-services/ServicesGrid";
import BookingDialog from "@/components/retail-services/BookingDialog";
import { useNavigate } from "react-router-dom";

const RetailServices = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCall = async () => {
    setIsLoading(true);
    try {
      await initiateVapiCall("a212f18f-9d02-4703-914f-ac89661262c5");
      toast({
        title: "Voice chat initiated",
        description: "You are now connected with our agent."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to start voice chat",
        description: error instanceof Error ? error.message : "Please try again later."
      });
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const handleEndCall = async () => {
    try {
      await stopVapiCall();
      setIsOpen(false);
      setIsLoading(false);
      // Redirect to demo page
      navigate('/demo');
    } catch (error) {
      console.error('Error ending call:', error);
      toast({
        variant: "destructive",
        title: "Failed to end voice chat",
        description: "Please try again."
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-black">
      {/* Logo */}
      <div className="absolute top-24 right-8 z-10">
        <img 
          src="/lovable-uploads/07f82a95-cea8-417e-96f0-5d8ef95f0200.png"
          alt="Flagship Barbers Logo"
          className="h-12 w-auto"
        />
      </div>

      <HeroSection />

      <BookingDialog 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleCall={handleCall}
        handleEndCall={handleEndCall}
        isLoading={isLoading}
      />

      <ServicesGrid />
    </div>
  );
};

export default RetailServices;
