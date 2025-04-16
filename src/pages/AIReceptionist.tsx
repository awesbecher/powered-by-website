
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useToast } from "@/hooks/use-toast";
import { initiateVapiCall, stopVapiCall } from "@/services/vapiService";
import { getCalApi } from "@calcom/embed-react";

// Import all page sections
import { HeroSection } from '@/components/ai-receptionist/page-sections/HeroSection';
import { BenefitsSection } from '@/components/ai-receptionist/page-sections/BenefitsSection';
import { FeaturesSection } from '@/components/ai-receptionist/page-sections/FeaturesSection';
import { HowItWorksSection } from '@/components/ai-receptionist/page-sections/HowItWorksSection';
// Removed TestimonialsSection import
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
  
  const ASSISTANT_ID = "ebb38ba5-321a-49e4-b860-708bc864327f";

  useEffect(() => {
    setTimeout(() => {
      setInitialLoad(false);
    }, 100);
    
    // Initialize Cal.com with a more robust approach
    (async function initializeCalcom() {
      try {
        console.log("Initializing Cal.com embed for AI Receptionist");
        
        // Ensure script is loaded
        await loadCalComScript();
        
        // Then initialize using the API - remove namespace parameter
        const cal = await getCalApi();
        cal("ui", {
          "cssVarsPerTheme": {
            "light": {"cal-brand":"#292929"},
            "dark": {"cal-brand":"#fafafa"}
          },
          "hideEventTypeDetails": false,
          "layout": "month_view"
        });
        console.log("Cal.com embed initialized successfully");
      } catch (error) {
        console.error("Error initializing Cal.com embed:", error);
      }
    })();
  }, []);
  
  // Ensure the Cal.com script is loaded
  const loadCalComScript = () => {
    return new Promise<void>((resolve, reject) => {
      // If script already exists, resolve immediately
      if (document.querySelector('script[src="https://app.cal.com/embed/embed.js"]')) {
        console.log("Cal.com script already loaded");
        resolve();
        return;
      }
      
      console.log("Loading Cal.com script");
      const script = document.createElement('script');
      script.src = "https://app.cal.com/embed/embed.js";
      script.onload = () => {
        console.log("Cal.com script loaded successfully");
        resolve();
      };
      script.onerror = (error) => {
        console.error("Failed to load Cal.com script:", error);
        reject(error);
      };
      document.head.appendChild(script);
    });
  };
  
  // Modified to open real-estate page in a new tab
  const handleVoiceChatClick = () => {
    window.open('/real-estate', '_blank');
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

  // Modified to open real-estate page in a new tab
  const goToRealEstateSite = () => {
    window.open('/real-estate', '_blank');
  };

  // Modified to ensure consistency with the above change
  const handleTryVoiceDemo = () => {
    window.open('/real-estate', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0b2e] to-[#13151a]">
      <Navbar />
      
      <main>
        <HeroSection 
          initialLoad={initialLoad}
          handleVoiceChatClick={handleVoiceChatClick}
          handleTryVoiceDemo={handleTryVoiceDemo}
          videoOpen={videoOpen}
          setVideoOpen={setVideoOpen}
        />

        <BenefitsSection />
        
        <HowItWorksSection />
        
        <FeaturesSection />
        
        {/* Removed TestimonialsSection */}
        
        <FAQSection />

        <FinalCTASection />
      </main>
      
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
      
      {/* Hidden Cal.com button that will be triggered programmatically if needed */}
      <button
        data-cal-link="team-powered-by-dfbtbb/get-started-with-ai-receptionist"
        data-cal-config='{"layout":"month_view"}'
        className="hidden"
      ></button>
    </div>
  );
};

export default AIReceptionist;