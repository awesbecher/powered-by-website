
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useToast } from "@/hooks/use-toast";
import { initiateVapiCall, stopVapiCall } from "@/services/vapiService";

// Import refactored components
import { HeroSection } from '@/components/ai-receptionist/page-sections/HeroSection';
import { AIReceptionistCard } from '@/components/ai-receptionist/page-sections/AIReceptionistCard';
import { BenefitsSection } from '@/components/ai-receptionist/page-sections/BenefitsSection';
import { FeaturesSection } from '@/components/ai-receptionist/page-sections/FeaturesSection';
import { FAQSection } from '@/components/ai-receptionist/page-sections/FAQSection';
import { FinalCTASection } from '@/components/ai-receptionist/page-sections/FinalCTASection';
import { VoiceChatDialog } from '@/components/ai-receptionist/VoiceChatDialog';

const AIReceptionist = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [showVoiceChatDialog, setShowVoiceChatDialog] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const ASSISTANT_ID = "ebb38ba5-321a-49e4-b860-708bc864327f";

  useEffect(() => {
    setTimeout(() => {
      setInitialLoad(false);
    }, 100);
    
    // Load Cal.com script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
    (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
    Cal("init", "get-started-with-ai-receptionist", {origin:"https://cal.com"});

    Cal.ns["get-started-with-ai-receptionist"]("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#292929"},"dark":{"cal-brand":"#fafafa"}},"hideEventTypeDetails":false,"layout":"week_view"});
    `;
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);
  
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
          description: "You're now connected to our AI receptionist.",
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
        description: "Thank you for trying our AI receptionist.",
      });
    } catch (error) {
      console.error("Error ending call:", error);
    } finally {
      setIsCallActive(false);
    }
  };

  const goToRealEstateSite = () => {
    navigate('/real-estate');
  };

  const handleTryVoiceDemo = () => {
    window.open('/real-estate', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0b2e] to-[#13151a]">
      <Navbar />
      
      <HeroSection 
        initialLoad={initialLoad}
        handleVoiceChatClick={handleVoiceChatClick}
        handleTryVoiceDemo={handleTryVoiceDemo}
        videoOpen={videoOpen}
        setVideoOpen={setVideoOpen}
      />

      <BenefitsSection />
      
      <FeaturesSection />
      
      <FAQSection />

      <FinalCTASection />

      <VoiceChatDialog
        showDialog={showVoiceChatDialog}
        isCallActive={isCallActive}
        isSubmitting={isSubmitting}
        handleCloseDialog={handleCloseDialog}
        handleStartCall={handleStartCall}
        handleEndCall={handleEndCall}
        goToRealEstateSite={goToRealEstateSite}
      />

      <Footer />
    </div>
  );
};

export default AIReceptionist;
