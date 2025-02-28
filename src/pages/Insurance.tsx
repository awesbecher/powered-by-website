
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Car, Home, Key, Bike, Sailboat, Phone, Mic, MicOff, X, Activity } from "lucide-react";
import { useState } from "react";
import { InsuranceProductCard } from "@/components/insurance/InsuranceProductCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { initiateVapiCall, stopVapiCall } from "@/services/vapiService";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Insurance = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [showConsentDialog, setShowConsentDialog] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleProductSelect = (productId: string) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleEndCall = async () => {
    try {
      await stopVapiCall();
      setIsCallActive(false);
      navigate('/demo');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to end call",
        description: error.message || "Please try again later."
      });
    }
  };

  const handleCall = async () => {
    setIsLoading(true);
    try {
      await initiateVapiCall("df42b616-337e-4877-8e9b-44fb0b5a0225");
      setIsCallActive(true);
      setShowConsentDialog(false);
      toast({
        title: "Call initiated",
        description: "You are now connected to Alex Fisher from Planter's Insurance."
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

  const toggleMute = () => {
    // In a real implementation, this would interact with the Vapi SDK to mute/unmute
    setIsMuted(!isMuted);
  };

  const insuranceProducts = [
    { id: 'auto', name: 'Auto', icon: Car },
    { id: 'home', name: 'Homeowners', icon: Home },
    { id: 'renters', name: 'Renters', icon: Key },
    { id: 'motorcycle', name: 'Motorcycle / ATV', icon: Bike },
    { id: 'boat', name: 'Boat', icon: Sailboat },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="absolute inset-0 top-32 h-[500px] z-0">
        <img 
          src="/lovable-uploads/e9a419d6-efff-471a-b7fc-fc3f892e736c.png"
          alt="Insurance Coverage"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#222222] via-transparent to-[#222222]"></div>
      </div>

      {/* Consent Dialog */}
      <Dialog open={showConsentDialog} onOpenChange={setShowConsentDialog}>
        <DialogContent className="bg-[#222222] text-white border-gray-800">
          <DialogHeader className="flex flex-row items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage 
                src="/lovable-uploads/156d245d-e750-4ef3-8995-a7ae211eeeee.png"
                alt="Alex Fisher"
                className="object-cover"
              />
            </Avatar>
            <DialogTitle>Start Voice Chat with Alex Fisher on the Planter's Insurance Team</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4 pt-4">
            <p className="text-gray-300">
              You'll be able to have a voice conversation with Alex directly through your browser. Please ensure your microphone is enabled and your speaker volume is turned on appropriately.
            </p>
            <p className="text-gray-300 text-sm">
              By clicking "Start Voice Chat", you consent to having a voice conversation with the Planter's Insurance team. You can end the conversation at any time.
            </p>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => setShowConsentDialog(false)}
                className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Cancel
              </Button>
              <Button 
                className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
                onClick={handleCall}
                disabled={isLoading}
              >
                {isLoading ? "Initiating call..." : "Start Voice Chat"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Active Call Dialog */}
      <Dialog open={isCallActive} onOpenChange={(open) => !open && handleEndCall()}>
        <DialogContent className="bg-white text-black border-gray-200 sm:max-w-md p-6 rounded-xl">
          <div className="flex flex-col space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">You are now Connected</h2>
              <button onClick={handleEndCall} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-20 w-20 rounded-full border-2 border-white shadow-md">
                  <AvatarImage src="/lovable-uploads/156d245d-e750-4ef3-8995-a7ae211eeeee.png" alt="Alex Fisher" />
                  <AvatarFallback>AF</AvatarFallback>
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
                <h3 className="text-2xl font-bold">Alex Fisher</h3>
                <p className="text-gray-500">Planter's Insurance</p>
              </div>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Call in progress</h3>
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
        </DialogContent>
      </Dialog>

      <div className="relative z-10 px-4 py-32 sm:px-6 lg:px-8">
        <Link 
          to="/" 
          className="absolute top-8 left-8 flex items-center text-accent hover:text-accent/80 transition-colors"
        >
          <ArrowLeft className="h-6 w-6 mr-2" />
          <span>Back to Services</span>
        </Link>

        <div className="mx-auto max-w-3xl text-center">
          <img 
            src="/lovable-uploads/403d2bfb-bc52-4ca1-937c-64ab85d08216.png"
            alt="Planter's Insurance"
            className="h-16 mx-auto mb-12"
          />
          
          <div className="bg-white/5 rounded-lg p-8 backdrop-blur-sm">
            <h1 className="text-5xl font-bold text-white mb-8 flex flex-col">
              <span>Welcome to Planter's.</span>
              <span className="text-accent">You're covered with us.</span>
            </h1>
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-xl text-gray-300">
                  Our insurance specialists are ready to help you learn about our products and get your set up with a personalized quote. Click the button below to be connected to a Planter's Insurance team member.
                </p>
              </div>

              <div className="flex justify-center">
                <Button 
                  className="w-64 h-[4.5rem] bg-accent hover:bg-accent/90 text-white text-lg px-6 flex flex-col items-center justify-center space-y-1"
                  variant="default"
                  onClick={() => setShowConsentDialog(true)}
                  disabled={isLoading}
                >
                  <span className="leading-none">Speak to a Planter's</span>
                  <span className="flex items-center leading-none">
                    Insurance Agent Now
                    <Phone className="h-4 w-4 ml-2 flex-shrink-0" />
                  </span>
                </Button>
              </div>

              <div className="space-y-4">
                <p className="text-xl text-gray-300 font-bold">
                  Our Products:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {insuranceProducts.map((product) => (
                    <InsuranceProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      icon={product.icon}
                      isSelected={selectedProducts.includes(product.id)}
                      isEnabled={true}
                      onSelect={handleProductSelect}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insurance;
