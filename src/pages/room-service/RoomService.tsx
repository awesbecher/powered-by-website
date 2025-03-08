import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { RoomServiceHeader } from "./components/RoomServiceHeader";
import { MenuDisplay } from "./components/MenuDisplay";
import { CallButton } from "./components/CallButton";
import { RoomServiceDialog } from "./components/RoomServiceDialog";
import { initiateVapiCall, stopVapiCall, getVapiInstance } from "@/services/vapiService";

const RoomService = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Clean up any active calls when the component unmounts
    return () => {
      if (isCallActive) {
        stopVapiCall();
      }
    };
  }, [isCallActive]);

  const handleStartCall = async () => {
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

      // Keep the dialog open but change its content to show call in progress
      setIsProcessing(false);
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

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <RoomServiceHeader />
      
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center text-white hover:text-white/80 transition-colors"
      >
        <ArrowLeft className="h-6 w-6 mr-2" />
        <span>Back to Demos</span>
      </Link>

      <img 
        src="/lovable-uploads/ec9dd264-4bb3-4b03-9b50-e31383652af9.png"
        alt="GrandView Hotel"
        className="absolute top-32 left-1/2 transform -translate-x-1/2 h-20 w-auto z-10"
      />

      <div className="mx-auto max-w-3xl px-4">
        <CallButton 
          isProcessing={isProcessing}
          isCallActive={isCallActive}
          onClick={() => setIsDialogOpen(true)}
        />
        <MenuDisplay />
      </div>

      <RoomServiceDialog 
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        isCallActive={isCallActive}
        isProcessing={isProcessing}
        isMuted={isMuted}
        handleStartCall={handleStartCall}
        handleEndCall={handleEndCall}
        toggleMute={toggleMute}
      />
    </div>
  );
};

export default RoomService;
