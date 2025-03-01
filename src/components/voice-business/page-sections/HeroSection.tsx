
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Car, Building, Briefcase, Coffee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { VoiceChatDialog } from "@/components/voice-business/VoiceChatDialog";
import { useToast } from "@/hooks/use-toast";
import { initiateVapiCall, stopVapiCall } from "@/services/vapiService";

interface HeroSectionProps {
  initialLoad: boolean;
  handleContact: () => void;
}

export const HeroSection = ({ initialLoad, handleContact }: HeroSectionProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showVoiceChatDialog, setShowVoiceChatDialog] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Assistant ID for Vapi - updated with the provided ID
  const ASSISTANT_ID = "07e97137-ad5c-4846-ab6f-cff48c3e2da9";

  const handleVoiceChatClick = () => {
    setShowVoiceChatDialog(true);
  };

  const handleCloseDialog = () => {
    if (isCallActive) {
      handleEndCall();
    }
    setShowVoiceChatDialog(false);
  };

  const handleStartCall = async () => {
    setIsSubmitting(true);
    try {
      const success = await initiateVapiCall(ASSISTANT_ID);
      if (success) {
        setIsCallActive(true);
        toast({
          title: "Call started successfully",
          description: "You're now connected to our AI voice agent.",
        });
      }
    } catch (error) {
      console.error("Failed to start call:", error);
      toast({
        title: "Failed to start call",
        description: error instanceof Error ? error.message : "Please check your microphone settings and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEndCall = async () => {
    try {
      await stopVapiCall();
      toast({
        title: "Call ended",
        description: "Thank you for trying our AI voice agent.",
      });
    } catch (error) {
      console.error("Error ending call:", error);
    } finally {
      setIsCallActive(false);
      setShowVoiceChatDialog(false);
    }
  };

  return (
    <section className="pt-28 pb-36 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="flex flex-col lg:flex-row items-start gap-8">
        <div className={`w-full lg:w-1/2 space-y-6 transition-all duration-1000 ease-out transform
          ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Meet Your New <span className="text-[#9b87f5]">AI Receptionist</span>
          </h1>
          <p className="text-xl text-gray-300">
            With an AI Receptionist by <span className="bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md">Powered_by</span>, you get the same personable experience customers expect from a traditional receptionist—only now it never sleeps, forgets, or drops a call.
          </p>
          <div className="space-y-4 text-gray-300">
            <p className="text-xl">Our AI Receptionist adapts to your business needs:</p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-sm">
              <li>Restaurant: Automate reservations and answer menu questions</li>
              <li>Auto Dealership: Pre-screen leads for test drives</li>
              <li>Retail: Answer product questions and handle order inquiries</li>
              <li>Small Business: Capture every lead, 24/7/365</li>
            </ul>
          </div>
          <div className="flex flex-col items-start">
            <div className="flex flex-wrap gap-3 self-start">
              <Button 
                className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-5 text-base rounded-md flex items-center"
                onClick={handleContact}
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        <div className={`w-full lg:w-1/2 transition-all duration-1000 delay-300 ease-out transform
          ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
          <p className="text-center text-white text-xl mb-6 font-medium bg-gradient-to-r from-[#6342ff] to-[#9b87f5] p-4 rounded-lg shadow-lg">
            Talk to an AI Receptionist Now!
            <span className="block mt-2 text-base">Call any one of the businesses below.</span>
            <span className="block mt-2 text-sm text-gray-200 italic">Don't worry, they're not actually real businesses.</span>
          </p>
          <div className="grid grid-cols-2 gap-6 max-w-[480px] mx-auto">
            {/* Service Box 1 */}
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#6342ff] to-[#9b87f5] rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative backdrop-blur-sm bg-gray-900/80 p-6 rounded-xl border border-purple-500/20 shadow-xl h-full flex flex-col justify-between hover:translate-y-[-4px] transition-transform duration-300">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Car className="text-[#F97316] text-xl" />
                    <h3 className="font-sans text-lg font-bold text-white leading-tight tracking-wide">
                      Test Drive
                    </h3>
                  </div>
                  <div className="my-2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  <div className="flex items-center text-xs text-gray-300 mt-3">
                    <Phone className="h-3 w-3 mr-1 text-[#9b87f5]" />
                    <span className="text-gray-400 font-medium">Call</span>
                  </div>
                  <div className="font-sans text-sm font-semibold text-[#9b87f5] mb-1">Mercedes of Tacoma</div>
                  <div className="text-white font-mono text-sm tracking-wide">(555) 555-5555</div>
                </div>
              </div>
            </div>
            
            {/* Service Box 2 */}
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D946EF] to-[#9b87f5] rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative backdrop-blur-sm bg-gray-900/80 p-6 rounded-xl border border-purple-500/20 shadow-xl h-full flex flex-col justify-between hover:translate-y-[-4px] transition-transform duration-300">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Building className="text-[#0EA5E9] text-xl" />
                    <h3 className="font-sans text-lg font-bold text-white leading-tight tracking-wide">
                      Office Space
                    </h3>
                  </div>
                  <div className="my-2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  <div className="flex items-center text-xs text-gray-300 mt-3">
                    <Phone className="h-3 w-3 mr-1 text-[#D946EF]" />
                    <span className="text-gray-400 font-medium">Call</span>
                  </div>
                  <div className="font-sans text-sm font-semibold text-[#D946EF] mb-1">Township Real Estate</div>
                  <div className="text-white font-mono text-sm tracking-wide">(555) 555-5555</div>
                </div>
              </div>
            </div>
            
            {/* Service Box 3 */}
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#F97316] to-[#9b87f5] rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative backdrop-blur-sm bg-gray-900/80 p-6 rounded-xl border border-purple-500/20 shadow-xl h-full flex flex-col justify-between hover:translate-y-[-4px] transition-transform duration-300">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Coffee className="text-[#F97316] text-xl" />
                    <h3 className="font-sans text-lg font-bold text-white leading-tight tracking-wide">
                      Cafe Order
                    </h3>
                  </div>
                  <div className="my-2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  <div className="flex items-center text-xs text-gray-300 mt-3">
                    <Phone className="h-3 w-3 mr-1 text-[#F97316]" />
                    <span className="text-gray-400 font-medium">Call</span>
                  </div>
                  <div className="font-sans text-sm font-semibold text-[#F97316] mb-1">The Slice House</div>
                  <div className="text-white font-mono text-sm tracking-wide">(555) 555-5555</div>
                </div>
              </div>
            </div>
            
            {/* Service Box 4 */}
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#0EA5E9] to-[#9b87f5] rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative backdrop-blur-sm bg-gray-900/80 p-6 rounded-xl border border-purple-500/20 shadow-xl h-full flex flex-col justify-between hover:translate-y-[-4px] transition-transform duration-300">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase className="text-[#D946EF] text-xl" />
                    <h3 className="font-sans text-lg font-bold text-white leading-tight tracking-wide">
                      Consultation
                    </h3>
                  </div>
                  <div className="my-2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  <div className="flex items-center text-xs text-gray-300 mt-3">
                    <Phone className="h-3 w-3 mr-1 text-[#0EA5E9]" />
                    <span className="text-gray-400 font-medium">Call</span>
                  </div>
                  <div className="font-sans text-sm font-semibold text-[#0EA5E9] mb-1">Flagship Barbers</div>
                  <div className="text-white font-mono text-sm tracking-wide">(555) 555-5555</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Voice Chat Dialog Component */}
      <VoiceChatDialog
        showDialog={showVoiceChatDialog}
        isCallActive={isCallActive}
        isSubmitting={isSubmitting}
        handleCloseDialog={handleCloseDialog}
        handleStartCall={handleStartCall}
        handleEndCall={handleEndCall}
      />
    </section>
  );
};
