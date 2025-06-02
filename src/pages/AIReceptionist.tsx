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
  const aiReceptionistFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How quickly can I integrate AI with my phone system?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most businesses are up and running within a single day. We integrate with all major business phone systems via API. If you have an older phone system, we can provide easy workarounds to ensure seamless operation."
        }
      },
      {
        "@type": "Question",
        "name": "Will the AI understand my industry terminology?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We train our AI Receptionist on the specifics of your business, including industry terminology, common customer inquiries, and your desired call outcomes. The AI continuously learns from interactions to improve over time."
        }
      },
      {
        "@type": "Question",
        "name": "Can I customize when calls transfer to human agents?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. You set the rules for when and how calls are escalated to your team, based on criteria like customer value, issue complexity, or specific requests. You maintain complete control over the customer experience."
        }
      },
      {
        "@type": "Question",
        "name": "How does pricing work for an AI receptionist?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer flexible pricing models based on call volume and workflow complexity. Our pricing is designed for small business budgets with plans starting at a fraction of the cost of a human receptionist. Contact us for a custom quote."
        }
      },
      {
        "@type": "Question",
        "name": "What kind of reporting and analytics do I get?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our platform provides comprehensive analytics including call volume, average call duration, common inquiries, resolution rates, and more. You can access these insights through a user-friendly dashboard to optimize your business operations."
        }
      },
      {
        "@type": "Question",
        "name": "Is my data secure and private?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we take security and privacy extremely seriously. All conversations are encrypted end-to-end, and we adhere to strict data protection standards. Your customer information is never sold or shared with third parties."
        }
      }
    ]
  };

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
        <script type="application/ld+json">
          {JSON.stringify(aiReceptionistFaqSchema)}
        </script>
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