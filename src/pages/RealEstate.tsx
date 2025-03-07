
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { getVapiInstance } from "@/services/vapiService";
import { HeroSection } from "@/components/real-estate/HeroSection";
import { ActionButtons } from "@/components/real-estate/ActionButtons";
import { ServicesSection } from "@/components/real-estate/ServicesSection";
import { FeaturedProperties } from "@/components/real-estate/FeaturedProperties";
import { ContactSection } from "@/components/real-estate/ContactSection";
import { useNavigate, Link } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Activity, Mic, MicOff, X, ChevronLeft } from "lucide-react";

const RealEstate = () => {
  const scrollToProperties = () => {
    const featuredSection = document.getElementById('featured-properties');
    featuredSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCall = async () => {
    setIsLoading(true);
    try {
      const vapi = getVapiInstance();
      await vapi.start("f8131f3d-58aa-4c81-a79e-1bf758803775");
      
      setIsCallActive(true);
      setIsOpen(false);
      setIsScheduleOpen(false);
      
      vapi.on("call-end", () => {
        setIsLoading(false);
        setIsCallActive(false);
        navigate('/demo');
      });

      toast({
        title: "Call initiated",
        description: "Our AI agent is connecting with you."
      });
    } catch (error) {
      console.error('Error initiating call:', error);
      setIsLoading(false);
      setIsCallActive(false);
      toast({
        variant: "destructive",
        title: "Failed to initiate call",
        description: error instanceof Error ? error.message : "Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndCall = () => {
    try {
      const vapi = getVapiInstance();
      vapi.stop();
      setIsCallActive(false);
      navigate('/demo');
    } catch (error) {
      console.error('Error ending call:', error);
      toast({
        variant: "destructive",
        title: "Failed to end call",
        description: error instanceof Error ? error.message : "Please try again later."
      });
    }
  };

  const toggleMute = () => {
    // In a real implementation, this would interact with the Vapi SDK to mute/unmute
    setIsMuted(!isMuted);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      {/* Back Navigation */}
      <Link 
        to="/demo" 
        className="absolute top-8 left-8 z-10 flex items-center text-white hover:text-gray-300 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 mr-1" />
        <span>Back to Demo</span>
      </Link>

      <div className="fixed top-20 right-6 z-50">
        <img 
          src="/lovable-uploads/a5338bda-4580-432c-a1b8-71df71d89c29.png"
          alt="Township Real Estate Logo"
          className="h-16 w-auto object-cover"
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
                  <AvatarImage src="/lovable-uploads/2d9d7374-8cc7-4dee-944c-9614e9d40f77.png" alt="Jeff Smith" />
                  <AvatarFallback>JS</AvatarFallback>
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
                <h3 className="text-2xl font-bold">Jeff Smith</h3>
                <p className="text-gray-500">Township Real Estate</p>
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

      <HeroSection />
      
      <ActionButtons 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        phoneNumber=""
        setPhoneNumber={() => {}}
        handleCall={handleCall}
        isLoading={isLoading}
        scrollToProperties={scrollToProperties}
      />

      <ServicesSection />
      
      <FeaturedProperties />
      
      <ContactSection 
        isScheduleOpen={isScheduleOpen}
        setIsScheduleOpen={setIsScheduleOpen}
        phoneNumber=""
        setPhoneNumber={() => {}}
        handleCall={handleCall}
        isLoading={isLoading}
      />
    </div>
  );
};

export default RealEstate;
