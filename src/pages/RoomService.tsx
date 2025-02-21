
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { initiateVogentCall } from "@/services/vogentService";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const RoomService = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const handleCallEnd = (event: MessageEvent) => {
      if (event.data.type === 'VOGENT_CALL_ENDED') {
        window.removeEventListener('message', handleCallEnd);
        navigate('/');
        toast({
          title: "Call Completed",
          description: "Thank you for using our room service!",
        });
      }
    };

    window.addEventListener('message', handleCallEnd);
    return () => window.removeEventListener('message', handleCallEnd);
  }, [navigate, toast]);

  const handlePhoneSubmit = async () => {
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
      await initiateVogentCall(phoneNumber);
      setIsDialogOpen(false);
      navigate("/call-confirmation");
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
    <div className="min-h-screen w-full bg-[#222222]">
      <div className="relative h-[50vh] mb-8">
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
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              Indulge in exquisite dining from the comfort of your luxury suite, with our 24/7 premium room service.
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
        className="absolute top-8 right-8 h-12 w-auto z-10"
      />

      <div className="mx-auto max-w-3xl px-4 space-y-4">
        <p className="text-white/90 text-lg text-center">
          Please choose from any of the items on our Food & Drinks Menu below. When you are ready, click the button below to speak to Room Service.
        </p>
        
        <Button 
          size="lg"
          className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white font-bold text-lg mx-auto flex items-center px-6 h-12"
          onClick={() => setIsDialogOpen(true)}
          disabled={isProcessing}
        >
          <Phone className="mr-2 h-5 w-5" />
          {isProcessing ? 'Connecting...' : 'Speak to Room Service'}
        </Button>

        <div className="flex flex-col items-center gap-1">
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
        <Button 
          size="lg"
          className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white font-bold text-lg mx-auto flex items-center px-6 h-12"
          onClick={() => setIsDialogOpen(true)}
          disabled={isProcessing}
        >
          <Phone className="mr-2 h-5 w-5" />
          {isProcessing ? 'Connecting...' : 'Speak to Room Service'}
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enter your phone number</DialogTitle>
          </DialogHeader>
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
              onClick={handlePhoneSubmit}
              className="bg-[#9b87f5] hover:bg-[#9b87f5]/90"
              disabled={isProcessing}
            >
              {isProcessing ? 'Connecting...' : 'Call Me'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoomService;
