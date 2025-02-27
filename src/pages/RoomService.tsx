
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { initiateVapiCall, stopVapiCall, getVapiInstance } from "@/services/vapiService";

const RoomService = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);

  useEffect(() => {
    // Clean up any active calls when the component unmounts
    return () => {
      if (isCallActive) {
        stopVapiCall();
      }
    };
  }, [isCallActive]);

  const handleStartCall = async () => {
    if (!phoneNumber) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your phone number.",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const vapi = getVapiInstance();
      await vapi.start("238616a3-b611-4faa-a216-74b8d7d8b277");
      setIsCallActive(true);
      
      vapi.on("call-end", () => {
        setIsCallActive(false);
        setIsDialogOpen(false);
        navigate('/');
        toast({
          title: "Call Completed",
          description: "Thank you for using our room service!",
        });
      });

      setIsDialogOpen(false);
      toast({
        title: "Call Started",
        description: "You are now connected to our room service. You can speak directly through your browser.",
      });
    } catch (error) {
      console.error('Error initiating call:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Unable to connect to Room Service. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEndCall = () => {
    stopVapiCall();
    setIsCallActive(false);
    setIsDialogOpen(false);
    navigate('/');
    toast({
      title: "Call Ended",
      description: "Your call with room service has ended.",
    });
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const formatPhoneNumber = (value: string) => {
    if (!value) return "";
    const phoneNumber = value.replace(/\D/g, '');
    if (phoneNumber.length <= 3) return phoneNumber;
    if (phoneNumber.length <= 6) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="relative h-[60vh] mb-8 mt-32">
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/e87cce6e-adc9-4426-b464-c64b14d607bd.png"
            alt="Luxury Hotel Room"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#222222]"></div>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Room Service at Grandview
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg font-bold">
              Indulge in exquisite dining from the comfort of your luxury suite, with our 24/7 premium room service. Please choose from any of the items on our Food & Drinks Menu below. When you are ready, click the button below to speak to Room Service.
            </p>
          </div>
        </div>
      </div>

      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center text-white hover:text-white/80 transition-colors"
      >
        <ArrowLeft className="h-6 w-6 mr-2" />
        <span>Back to Services</span>
      </Link>

      <img 
        src="/lovable-uploads/ec9dd264-4bb3-4b03-9b50-e31383652af9.png"
        alt="GrandView Hotel"
        className="absolute top-32 left-1/2 transform -translate-x-1/2 h-20 w-auto z-10"
      />

      <div className="mx-auto max-w-3xl px-4">
        <Button 
          className="bg-accent hover:bg-accent/90 text-white mb-4 font-bold text-lg mx-auto block px-8 py-4 h-auto whitespace-nowrap flex items-center gap-3"
          onClick={() => setIsDialogOpen(true)}
          disabled={isProcessing || isCallActive}
        >
          <Phone className="h-6 w-6 flex-shrink-0" />
          {isProcessing ? 'Connecting...' : isCallActive ? 'Call in Progress' : 'Speak to Room Service'}
        </Button>
        <div className="flex flex-col items-center space-y-1 mb-24">
          <img 
            src="/lovable-uploads/54a3f767-41a4-4083-a920-5592f61dbd63.png"
            alt="Food Menu"
            className="max-w-2xl w-full h-auto"
          />
          <img 
            src="/lovable-uploads/2035fcd4-8b92-4f84-ad1e-c4ecae819711.png"
            alt="Drink Menu"
            className="max-w-2xl w-full h-auto"
          />
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isCallActive ? "Call in Progress" : "Enter your phone number"}</DialogTitle>
          </DialogHeader>
          {isCallActive ? (
            <>
              <p className="text-sm text-gray-500 pt-2">
                You are currently in a voice conversation with our Room Service. You can continue browsing the menu while keeping this conversation open.
              </p>
              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  variant="destructive"
                  onClick={handleEndCall}
                >
                  End Call
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-2 pt-4">
                <div className="flex-shrink-0 bg-gray-100 p-2 rounded">
                  +1
                </div>
                <Input
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formatPhoneNumber(phoneNumber)}
                  onChange={handlePhoneNumberChange}
                  className="flex-1"
                  disabled={isProcessing}
                />
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  variant="secondary"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleStartCall}
                  className="bg-accent hover:bg-accent/90"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Connecting...' : 'Call Room Service'}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoomService;
