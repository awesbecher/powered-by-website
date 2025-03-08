
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, Mic, MicOff, X, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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
    // In a real implementation, this would interact with the Vapi SDK to mute/unmute
    // For now, we'll just toggle the state
    setIsMuted(!isMuted);
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
        <span>Back to Demos</span>
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

      <Dialog open={isDialogOpen || isCallActive} onOpenChange={(open) => {
        // Prevent dialog from closing if call is active
        if (isCallActive && !open) {
          return;
        }
        setIsDialogOpen(open);
      }}>
        <DialogContent className="bg-white text-black border-gray-200 sm:max-w-md p-6 rounded-xl">
          {isCallActive ? (
            <div className="flex flex-col space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">You are now Connected</h2>
                <button onClick={handleEndCall} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar className="h-20 w-20 rounded-full border-2 border-white shadow-md">
                    <AvatarImage src="/lovable-uploads/ec9dd264-4bb3-4b03-9b50-e31383652af9.png" alt="Grandview Room Service" />
                    <AvatarFallback>GV</AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-1 left-1 flex items-center">
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                    <div className="ml-1 flex space-x-0.5">
                      {[...Array(4)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`h-3 w-1 rounded-full ${i === 0 ? 'bg-gray-800' : 'bg-gray-300'}`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Room Service</h3>
                  <p className="text-gray-500">Grandview Hotel</p>
                </div>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">Call in progress</h3>
                  <div className="flex items-center text-gray-700">
                    <Activity className="w-5 h-5 mr-2" />
                    <span>Live</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <p className="text-gray-600">Your microphone</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex space-x-0.5 mr-2">
                      <div className="h-3 w-1 bg-black rounded-full"></div>
                      {[...Array(4)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`h-3 w-1 rounded-full ${i < 2 ? 'bg-gray-400' : 'bg-gray-300'}`}
                        ></div>
                      ))}
                    </div>
                    <span className="text-gray-600">Active</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button 
                  onClick={toggleMute}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors"
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  <span>{isMuted ? "Unmute" : "Mute"}</span>
                </button>
                
                <button 
                  onClick={handleEndCall}
                  className="flex-1 py-3 px-4 bg-red-500 text-white rounded-md flex items-center justify-center space-x-2 hover:bg-red-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                  <span>End Call</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>
                  Start Voice Chat with In-Room Dining Team
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <p className="text-sm text-gray-700">
                  You'll be able to have a voice conversation with our staff directly through your browser. Please ensure your microphone is enabled and your speaker volume is turned on appropriately.
                </p>
                <p className="text-sm text-gray-700">
                  By clicking "Start Voice Chat", you consent to having a voice conversation with Grandview. You can end the conversation at any time.
                </p>
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

export default RoomService;
