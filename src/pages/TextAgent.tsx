import React, { useState, useEffect } from 'react';
import { SEO } from '@/components/shared/SEO';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { HeroSection } from '@/components/text-agent/page-sections/HeroSection';
import { FeaturesSection } from '@/components/text-agent/page-sections/FeaturesSection';
import { BenefitsSection } from '@/components/text-agent/page-sections/BenefitsSection';
import { FAQSection } from '@/components/text-agent/page-sections/FAQSection';
import { FinalCTASection } from '@/components/text-agent/page-sections/FinalCTASection';
import { HowItWorksSection } from '@/components/text-agent/page-sections/HowItWorksSection';
import { useCalendarInitialization, openCalendarModal } from "@/utils/calendarUtils";

const TextAgent: React.FC = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  
  const textAgentFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does the Text Agent AI work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our Text Agent uses advanced natural language processing to engage in human-like text conversations with your leads and customers. It can personalize messages, respond to inquiries, follow up automatically, and even qualify leads based on their responses. The AI continuously learns from interactions to improve its effectiveness over time."
        }
      },
      {
        "@type": "Question",
        "name": "Which CRM systems can Text Agent integrate with?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Text Agent seamlessly integrates with major CRM platforms including Salesforce, HubSpot, Zoho, Microsoft Dynamics, and Pipedrive. We also offer custom API integration for proprietary CRM systems. All integration options maintain data synchronization in real-time."
        }
      },
      {
        "@type": "Question",
        "name": "Is Text Agent compliant with messaging regulations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our platform is built with TCPA, GDPR, and other messaging compliance regulations in mind. We include features like automatic opt-out processing, consent management, and message frequency controls to ensure your campaigns remain compliant with industry regulations."
        }
      },
      {
        "@type": "Question",
        "name": "Can I personalize messages for different customer segments?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Text Agent allows you to create personalized messaging templates based on demographic data, behavior patterns, past interactions, and CRM data. You can segment your audience and tailor messaging strategies for each group, ensuring relevant communication that drives engagement."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly can I get started with Text Agent?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most businesses can be up and running with Text Agent in less than a day. Our onboarding process includes CRM integration, initial campaign setup, and strategy consultation. For more complex implementations or custom integrations, the timeline may extend to several days."
        }
      },
      {
        "@type": "Question",
        "name": "What kind of reporting and analytics does Text Agent provide?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our platform offers comprehensive analytics including message delivery rates, response rates, conversion metrics, engagement analytics, and campaign performance data. You can access real-time dashboards and scheduled reports to track ROI and optimize your text messaging strategy."
        }
      }
    ]
  };

  // Use the centralized calendar initialization hook
  useCalendarInitialization();
  
  // Remove initialLoad state after component mounts
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  // Handle contact button clicks using centralized utility
  const handleContact = () => {
    console.log("Contact button clicked - triggering Cal.com");
    if (!openCalendarModal("team-powered-by-dfbtbb/get-started-with-ai-sms-text-agents")) {
      console.error("Failed to open Cal.com modal for text agent");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0b2e] to-[#13151a]">
      <SEO
        title="AI Text Agent for SMBs | Fully Automate SMS-Text Communication"
        description="Deploy AI Text Agents to automate SMS interactions, streamline customer communications, and boost engagement."
        canonical="https://www.poweredby.agency/text-agent"
        faqSchema={textAgentFaqSchema}
      />
      <Navbar />
      <main>
        {/* Hero Section */}
        <HeroSection initialLoad={initialLoad} handleContact={handleContact} />
        
        {/* Main content sections */}
        <div className="container mx-auto px-4">
          {/* Feature Highlights */}
          <FeaturesSection />
          
          {/* How It Works */}
          <HowItWorksSection />
          
          {/* Benefits */}
          <BenefitsSection />
          
          {/* FAQ Section */}
          <FAQSection />
          
          {/* Final CTA */}
          <FinalCTASection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TextAgent;