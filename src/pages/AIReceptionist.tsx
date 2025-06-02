import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useToast } from "@/hooks/use-toast";
import { useCalendarInitialization, openCalendarModal } from "@/utils/calendarUtils";

// Import all page sections
import { HeroSection } from '@/components/ai-receptionist/page-sections/HeroSection';
import { BenefitsSection } from '@/components/ai-receptionist/page-sections/BenefitsSection';
import { FeaturesSection } from '@/components/ai-receptionist/page-sections/FeaturesSection';
import { HowItWorksSection } from '@/components/ai-receptionist/page-sections/HowItWorksSection';
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

  // Use the centralized calendar initialization hook
  useCalendarInitialization();

  useEffect(() => {
    setTimeout(() => {
      setInitialLoad(false);
    }, 100);
  }, []);
  
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
      // TODO: Implement new call functionality
      setIsCallActive(true);
      toast({
        title: "Call started successfully",
        description: "You're now connected to our AI receptionist.",
      });
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

  const handleEndCall = () => {
    setIsCallActive(false);
    toast({
      title: "Call ended",
      description: "Thank you for trying our AI receptionist.",
    });
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
      <Helmet>
        <title>AI Receptionist for SMBs | 24/7 Call & Lead Handling</title>
        <meta name="description" content="Learn how an AI Receptionist can handle your customer calls, qualify leads, and schedule appointments 24/7." />
        <link rel="canonical" href="https://www.poweredby.agency/ai-receptionist" />
      </Helmet>
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