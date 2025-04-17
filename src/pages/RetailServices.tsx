
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useToast } from "@/hooks/use-toast";
import { initiateVapiCall, stopVapiCall } from "@/services/vapiService";
import HeroSection from "@/components/retail-services/HeroSection";
import ServicesGrid from "@/components/retail-services/ServicesGrid";
import BookingDialog from "@/components/retail-services/BookingDialog";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Activity, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import RetailUseCaseExplainer from "@/components/retail-services/RetailUseCaseExplainer";
import DemoCallBlock from "@/components/mercedes-dealer/DemoCallBlock";

const RetailServices = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <Navbar />

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

      <HeroSection onBookAppointment={() => setIsOpen(true)} />

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">What It Can Handle</h2>
        <RetailUseCaseExplainer />
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Hear It in Action</h2>
        <div className="flex justify-center">
          <DemoCallBlock 
            className="max-w-md w-full"
            title="Hear the Retail Voice AI in Action"
            subtitle="Call now to hear how it handles a real customer request."
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Link to="/contact" className="block">
          <h2 className="text-3xl font-bold text-center mb-8 text-white hover:underline cursor-pointer">
            Get Started Fast
          </h2>
        </Link>
        <BookingDialog 
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleCall={handleCall}
          handleEndCall={handleEndCall}
          isLoading={isLoading}
          title="Book a Free Demo for Your Store"
          subtitle="We'll show you how Voice AI can help your team handle more calls — with less stress."
        />
      </div>

      <ServicesGrid />
    </div>
  );
};

export default RetailServices;
