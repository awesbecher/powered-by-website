
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { initiateVapiCall, stopVapiCall } from "@/services/vapiService";
import HeroSection from "@/components/retail-services/HeroSection";
import ServicesGrid from "@/components/retail-services/ServicesGrid";
import BookingDialog from "@/components/retail-services/BookingDialog";
import { useNavigate, Link } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Activity, X, ChevronLeft } from "lucide-react";

const RetailServices = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCall = async () => {
    setIsLoading(true);
    try {
      await initiateVapiCall("defa6102-2358-4347-a192-24c6bc23ea4c");
      setIsCallActive(true);
      setIsOpen(false);
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
    }
  };

  const handleEndCall = async () => {
    try {
      await stopVapiCall();
      setIsCallActive(false);
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
      {/* Back Navigation */}
      <Link 
        to="/demo" 
        className="absolute top-8 left-8 z-10 flex items-center text-white hover:text-gray-300 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 mr-1" />
        <span>Back to Demo</span>
      </Link>

      {/* Logo */}
      <div className="absolute top-24 right-8 z-10">
        <img 
          src="/lovable-uploads/07f82a95-cea8-417e-96f0-5d8ef95f0200.png"
          alt="Flagship Barbers Logo"
          className="h-12 w-auto"
        />
      </div>

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
                  <AvatarImage src="/lovable-uploads/75237bd9-59bf-497d-89fc-9805c49cf84e.png" alt="Alex from Flagship Barbers" />
                  <AvatarFallback>AB</AvatarFallback>
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
                <h3 className="text-2xl font-bold">Alex</h3>
                <p className="text-gray-500">Flagship Barbers</p>
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
            
            <div className="flex justify-center">
              <button 
                onClick={handleEndCall}
                className="w-full py-3 px-4 bg-red-500 text-white rounded-md flex items-center justify-center space-x-2 hover:bg-red-600 transition-colors"
              >
                <X className="w-5 h-5 mr-2" />
                <span>End Call</span>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <HeroSection />

      <div className="flex justify-center items-center my-8">
        <BookingDialog 
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleCall={handleCall}
          handleEndCall={handleEndCall}
          isLoading={isLoading}
        />
      </div>

      <ServicesGrid />
    </div>
  );
};

export default RetailServices;
