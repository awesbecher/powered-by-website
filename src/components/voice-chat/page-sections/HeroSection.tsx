import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mic } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { WebsiteSimulation } from "@/components/voice-chat/WebsiteSimulation";
import { VoiceChatDialog } from "@/components/voice-chat/VoiceChatDialog";
import { VoiceAgentContactForm } from "@/components/voice-chat/VoiceAgentContactForm";
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
  const firstNameInputRef = useRef<HTMLInputElement>(null);

  const ASSISTANT_ID = "c7acc482-bee2-40a3-85d1-a192ce2a6685";

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

  const handleGetStarted = () => {
    if (firstNameInputRef.current) {
      firstNameInputRef.current.focus();
      firstNameInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
        <div className={`transition-all duration-1000 ease-out transform
          ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Transform Your Website With <span className="text-[#9b87f5]">AI Voice Chat</span>
            </h1>
            <p className="text-xl text-gray-300">
              <span className="bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md mr-1">Powered_by</span>: AI Voice Chat. Engage website visitors in natural conversations that convert. Unlock new opportunities to upsell and cross-sell. Delight your customers with state-of-the-art in voice AI.
            </p>
            <div className="space-y-4 text-gray-300">
              <p className="text-xl">Deploy Human-like AI Voice Chat Directly on Your Website to:</p>
              <ul className="list-disc list-inside space-y-2 pl-2 text-sm">
                <li>Boost Conversions: Turn visitors into customers with engaging conversations</li>
                <li>Automate Customer Support: Provide immediate answers & reduce response times</li>
                <li>Offer 24/7 Availability: Ensure reliable, personalized support day or night</li>
              </ul>
            </div>
            <div className="flex flex-col items-start">
              <p className="text-gray-300 font-bold mb-3 text-left">See for yourself:</p>
              <div className="flex flex-wrap gap-3 self-start">
                <Button 
                  className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-5 text-base rounded-md flex items-center"
                  onClick={handleVoiceChatClick}
                >
                  <Mic className="mr-2 h-5 w-5" /> Speak to our Voice Agent Now
                </Button>
                <Button 
                  className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-5 text-base rounded-md flex items-center"
                  onClick={handleGetStarted}
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`transition-all duration-1000 delay-300 ease-out transform
          ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
          <VoiceAgentContactForm firstNameInputRef={firstNameInputRef} />
        </div>
      </div>

      <div className="mb-20">
        <div className="flex flex-col lg:flex-row items-start gap-12 justify-between">
          <div className={`w-full lg:w-[45%] transition-all duration-1000 ease-out transform pt-0
            ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Remarkably Human-like<br />Voice AI For Your Website
            </h2>
            
            <div className="space-y-8 mt-8">
              <div className="flex items-start gap-4">
                <div className="text-[#9b87f5] mt-1">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 5L26.5 11.5L33 5L26.5 -1.5L20 5Z" fill="#9b87f5"/>
                    <path d="M20 18L13.5 11.5L7 18L13.5 24.5L20 18Z" fill="#9b87f5"/>
                    <path d="M33 18L26.5 24.5L33 31L39.5 24.5L33 18Z" fill="#9b87f5"/>
                    <path d="M20 31L13.5 24.5L7 31L13.5 37.5L20 31Z" fill="#9b87f5"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">All-in-one voice AI platform.</h3>
                  <p className="text-gray-300 mt-2">Easy-to-use APIs for speech-to-text, text-to-speech, AI voice agents, and language understanding.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="text-[#9b87f5] mt-1">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30 10L25 15L20 10L25 5L30 10Z" fill="#9b87f5"/>
                    <path d="M20 20L15 15L10 20L15 25L20 20Z" fill="#9b87f5"/>
                    <path d="M10 10L15 5L10 0L5 5L10 10Z" fill="#9b87f5"/>
                    <path d="M30 20L25 25L30 30L35 25L30 20Z" fill="#9b87f5"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Complete control.</h3>
                  <p className="text-gray-300 mt-2">Custom model training and flexible deployment—public cloud, private cloud, or self-hosted.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="text-[#9b87f5] mt-1">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="10" stroke="#9b87f5" strokeWidth="2"/>
                    <path d="M20 10L20 30" stroke="#9b87f5" strokeWidth="2"/>
                    <path d="M30 20L10 20" stroke="#9b87f5" strokeWidth="2"/>
                    <path d="M26 14L14 26" stroke="#9b87f5" strokeWidth="2"/>
                    <path d="M26 26L14 14" stroke="#9b87f5" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Future-proofed.</h3>
                  <p className="text-gray-300 mt-2">Our research team delivers the latest AI breakthroughs.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="text-[#9b87f5] mt-1">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="10" y="10" width="20" height="20" stroke="#9b87f5" strokeWidth="2"/>
                    <rect x="14" y="14" width="4" height="4" fill="#9b87f5"/>
                    <rect x="22" y="14" width="4" height="4" fill="#9b87f5"/>
                    <rect x="14" y="22" width="4" height="4" fill="#9b87f5"/>
                    <rect x="22" y="22" width="4" height="4" fill="#9b87f5"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Enterprise-ready.</h3>
                  <p className="text-gray-300 mt-2">Scalable, secure, and reliable for critical workloads.</p>
                </div>
              </div>
            </div>
          </div>
          <div className={`w-full lg:w-[50%] lg:ml-auto transition-all duration-1000 delay-300 ease-out transform
            ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            <WebsiteSimulation />
          </div>
        </div>
      </div>

      <VoiceChatDialog
        showDialog={showVoiceChatDialog}
        isCallActive={isCallActive}
        isSubmitting={isSubmitting}
        handleCloseDialog={handleCloseDialog}
        handleStartCall={handleStartCall}
        handleEndCall={handleEndCall}
        source="voice-chat"
      />
    </section>
  );
};
