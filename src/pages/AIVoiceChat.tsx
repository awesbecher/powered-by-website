import React, { useState, useEffect } from "react";
import { SEO } from '@/components/shared/SEO';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { HeroSection } from "@/components/voice-chat/page-sections/HeroSection";
import { FeaturesSection } from "@/components/voice-chat/page-sections/FeaturesSection";
import { BenefitsSection } from "@/components/voice-chat/page-sections/BenefitsSection";
import { CTASection } from "@/components/voice-chat/page-sections/CTASection";
import { FinalCTASection } from "@/components/voice-chat/page-sections/FinalCTASection";
import { FAQSection } from "@/components/voice-chat/page-sections/FAQSection";
import { HowItWorksSection } from "@/components/voice-chat/page-sections/HowItWorksSection";
import { TestimonialsSection } from "@/components/voice-chat/page-sections/TestimonialsSection";
import { VideoIntroSection } from "@/components/voice-chat/page-sections/VideoIntroSection";
import { useCalendarInitialization, openCalendarModal } from "@/utils/calendarUtils";

const AIVoiceChat = () => {
  const aiVoiceChatFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do voice AI agents work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Voice AI agents use advanced speech recognition to understand spoken language, natural language processing to interpret meaning, and text-to-speech technology to respond verbally. These systems learn from interactions to continuously improve their performance and accuracy over time."
        }
      },
      {
        "@type": "Question",
        "name": "Can the voice agent integrate with my current systems?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our voice agents are designed to integrate seamlessly with your existing CRM, scheduling software, phone systems, and other business tools through our extensive API connections. We handle all technical aspects of the integration process."
        }
      },
      {
        "@type": "Question",
        "name": "What industries benefit most from AI voice agents?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While voice agents can benefit many industries, they're particularly valuable for healthcare (appointment scheduling, patient screening), real estate (property inquiries, showing scheduling), financial services (basic transactions, information requests), and customer service across all sectors."
        }
      },
      {
        "@type": "Question",
        "name": "How long does implementation take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Typical implementation takes 3-4 weeks from start to finish, including knowledge base building, integration with your systems, and training the voice agent on your specific business information. More complex implementations may take longer."
        }
      },
      {
        "@type": "Question",
        "name": "What happens if the AI can't handle a call?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We design intelligent escalation paths for each voice agent. When the AI encounters a complex situation it's not equipped to handle, it can seamlessly transfer the call to an appropriate human team member, along with a summary of the conversation so far."
        }
      }
    ]
  };

  const [initialLoad, setInitialLoad] = useState(true);
  
  // Use the centralized calendar initialization hook
  useCalendarInitialization();
  
  useEffect(() => {
    setInitialLoad(false);
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  const handleContact = () => {
    // Use the centralized openCalendarModal function
    if (!openCalendarModal("team-powered-by-dfbtbb/get-started-with-voice-ai-chat")) {
      console.error("Failed to open Cal.com modal for voice-ai-chat, no fallback available");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <SEO
        title="AI Voice Chat for SMBs | 24/7 Customer Support & Engagement"
        description="Use AI Voice Chat on your website for instant, 24/7 customer support and engagement."
        canonical="https://www.poweredby.agency/voice-chat"
        faqSchema={aiVoiceChatFaqSchema}
      />
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>
      
      <HeroSection initialLoad={initialLoad} handleContact={handleContact} />
      
      <VideoIntroSection />
      
      <FeaturesSection />
      
      <HowItWorksSection />
      
      <BenefitsSection />
      
      <TestimonialsSection />
      
      <FAQSection />
      
      <FinalCTASection />
      
      <Footer />

      {/* Background decorations */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20 pointer-events-none z-0" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20 pointer-events-none z-0" />
      
      {/* Hidden Cal.com button that will be triggered programmatically if needed */}
      <button
        id="cal-button-global"
        data-cal-link="team-powered-by-dfbtbb/get-started-with-voice-ai-chat"
        data-cal-config='{"layout":"month_view"}'
        className="hidden"
        onClick={() => {
          try {
            (window as any).Cal?.('ui', {
              styles: { branding: { brandColor: '#000000' } },
              hideEventTypeDetails: false,
              layout: 'month_view',
            });
            (window as any).Cal?.('showModal', {
              calLink: "team-powered-by-dfbtbb/get-started-with-voice-ai-chat",
              config: {
                layout: 'month_view',
              },
            });
          } catch (err) {
            console.error("Failed to open Cal.com modal from hidden global button:", err);
          }
        }}
      ></button>
    </div>
  );
};

export default AIVoiceChat;
