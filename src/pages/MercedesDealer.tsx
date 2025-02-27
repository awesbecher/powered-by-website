
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { getVapiInstance, stopVapiCall } from "@/services/vapiService";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/mercedes-dealer/HeroSection";
import SpringSalesEvent from "@/components/mercedes-dealer/SpringSalesEvent";
import ServicesGrid from "@/components/mercedes-dealer/ServicesGrid";
import VisitSection from "@/components/mercedes-dealer/VisitSection";
import SpecialOffersDialog from "@/components/mercedes-dealer/SpecialOffersDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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

      <Dialog open={showCallDialog || isCallActive} onOpenChange={(open) => {
        if (isCallActive && !open) {
          return;
        }
        setShowCallDialog(open);
      }}>
        <DialogContent className="bg-[#222222] text-white border-gray-800 sm:max-w-md">
          <DialogHeader className="flex flex-row items-start">
            <Avatar className="h-16 w-16 mr-4 border-2 border-[#9b87f5]">
              <AvatarImage src="/lovable-uploads/f5d0a1ac-953b-4d29-8a63-83813f74efe2.png" alt="Dave Frankel" />
              <AvatarFallback>DF</AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle>
                {isCallActive ? "Call in Progress" : "Start Voice Chat with Dave Frankel at Mercedes of Tacoma"}
              </DialogTitle>
            </div>
          </DialogHeader>
          {isCallActive ? (
            <>
              <p className="text-sm text-gray-400 pt-2">
                You are now connected with Dave Frankel at the dealership. You can end the call at any time by clicking the button below.
              </p>
              <div className="flex justify-center w-full mt-4">
                <Button
                  variant="destructive"
                  onClick={handleEndCall}
                  className="w-full font-bold text-white"
                >
                  End Call
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4 pt-2">
                <p className="text-sm text-gray-400">
                  You'll be able to have a voice conversation with our staff directly through your browser. Please ensure your microphone is enabled and your speaker volume is turned on appropriately.
                </p>
                <p className="text-sm text-gray-400">
                  By clicking "Start Voice Chat", you consent to having a voice conversation with Mercedes of Tacoma. You can end the conversation at any time.
                </p>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button 
                  variant="outline"
                  onClick={() => setShowCallDialog(false)}
                  disabled={isProcessing}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
                  onClick={handleCall}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Connecting...' : 'Start Voice Chat'}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MercedesDealer;
