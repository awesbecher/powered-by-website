
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import AnnouncementBanner from "@/components/layout/AnnouncementBanner";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { ValuesSection } from "@/components/home/ValuesSection";
import { BlogSection } from "@/components/home/BlogSection";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { VoiceChatDialog } from "@/components/home/VoiceChatDialog";
import { CallToActionButtons } from "@/components/home/CallToActionButtons";
import { SectionTitle } from "@/components/home/SectionTitle";
import { AgentTypes } from "@/components/home/AgentTypes";
import AIAgentIllustration from "@/components/home/AIAgentIllustration";
import { initiateVapiCall, stopVapiCall, getVapiInstance } from "@/services/vapiService";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/layout/Footer";

const Index = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  useEffect(() => {
    return () => {
      if (isCallActive) {
        handleEndCall();
      }
    };
  }, []);

  const handleStartCall = async () => {
    setIsSubmitting(true);
    try {
      const vapi = getVapiInstance();
      await vapi.start("c7acc482-bee2-40a3-85d1-a192ce2a6685");
      setIsCallActive(true);
      
      vapi.on("call-end", () => {
        setIsCallActive(false);
        setShowDialog(false);
        navigate('/');
      });

      toast({
        title: "Voice Chat Started",
        description: "You can now speak with our AI Agent through your browser.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to start voice chat. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEndCall = () => {
    stopVapiCall();
    setIsCallActive(false);
    setShowDialog(false);
    navigate('/');
    toast({
      title: "Call Ended",
      description: "Your conversation with the AI Agent has ended.",
    });
  };

  const handleCloseDialog = () => {
    if (isCallActive) {
      handleEndCall();
    }
    setShowDialog(false);
  };

  const handleNavigation = (path: string) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="sticky top-0 z-50 w-full">
        <AnnouncementBanner />
        <Navbar />
      </div>
      
      <div className="pt-12">
        <HeroSection initialLoad={initialLoad} />
      </div>

      <div className="text-center px-6 mb-16 mt-8">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 max-w-4xl mx-auto leading-[1.1]">
          Custom AI Agent Solutions Built for you.{" "}
          <span className="text-[#9b87f5] block mt-4 bg-gradient-to-r from-[#9b87f5] to-[#7a6cc5] bg-clip-text text-transparent">
            Quick. Easy. Powerful.
          </span>
        </h2>
      </div>

      <div className="relative z-10 mb-24">
        <FeaturesGrid />
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center px-6 mb-12">
        <CallToActionButtons 
          handleNavigation={handleNavigation}
          setShowDialog={setShowDialog}
        />
      </div>

      <VoiceChatDialog 
        showDialog={showDialog}
        isCallActive={isCallActive}
        isSubmitting={isSubmitting}
        handleCloseDialog={handleCloseDialog}
        handleStartCall={handleStartCall}
        handleEndCall={handleEndCall}
        source="home"
      />
      
      <div className="relative z-10 -mt-48 mb-8">
        <div className="w-full max-w-xl mx-auto">
          <AIAgentIllustration />
        </div>
      </div>

      <div className="container mx-auto px-4 mb-8">
        <SectionTitle title="Deploy Multi-Channel Agents:" linked={false} />
        <AgentTypes />
      </div>

      <div className="container mx-auto px-4 mb-8">
        <SectionTitle title="Our Approach:" linked={false} />
      </div>

      <ValuesSection />
      <BlogSection />
      <ClosingCTA />
      <Footer />

      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
    </div>
  );
};

export default Index;
