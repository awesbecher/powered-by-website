import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { HeroSection } from '@/components/email-agent/page-sections/HeroSection';
import { FeaturesSection } from '@/components/email-agent/page-sections/FeaturesSection';
import { HowItWorksSection } from '@/components/email-agent/page-sections/HowItWorksSection';
import { ROISection } from '@/components/email-agent/page-sections/ROISection';
import { FAQSection } from '@/components/email-agent/page-sections/FAQSection';
import { FinalCTASection } from '@/components/email-agent/page-sections/FinalCTASection';
import { useCalendarInitialization, openCalendarModal } from "@/utils/calendarUtils";

const EmailAgent = () => {
  const emailAgentFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long does it take to set up an AI Email Agent?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The basic setup takes just 24-48 hours. The AI agent is immediately operational after initial configuration, but reaches optimal performance after 2-3 weeks of learning from your specific business communications and receiving feedback. Our team handles the entire integration process, making it seamless for your business."
        }
      },
      {
        "@type": "Question",
        "name": "Will the AI Email Agent sound like a robot when responding to our customers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Not at all. Our AI Email Agents are designed to match your brand voice precisely. We train the system on your existing communications, style guides, and specific instructions to ensure responses are indistinguishable from your best team members. The AI adapts its tone and language to match the context and customer relationship, creating natural, personalized interactions."
        }
      },
      {
        "@type": "Question",
        "name": "What level of control do we have over the AI's responses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You maintain complete control through multiple mechanisms: Comprehensive policy settings that define response boundaries, approval workflows for sensitive or complex cases, real-time monitoring and override capabilities, and regular review systems to provide feedback and improve performance. You can set the AI to fully autonomous mode or require human approval before sending specific types of responses."
        }
      },
      {
        "@type": "Question",
        "name": "Is our email data secure with your AI solution?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Security is our top priority. Our AI Email Agent platform features: end-to-end encryption for all data, SOC 2 Type II compliance, GDPR and CCPA compliance, data residency options for specific geographic requirements, and regular security audits and penetration testing. We never use your data to train other clients' AI models, and you retain full ownership of all your data."
        }
      },
      {
        "@type": "Question",
        "name": "How does pricing work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our pricing is transparent and scales with your needs. We offer tiered plans based on email volume, starting at $399/month for small businesses. Each plan includes setup, training, and ongoing optimization. For organizations with specialized needs, we offer custom enterprise pricing with additional features like dedicated account management and advanced integrations. Contact us for a personalized quote."
        }
      },
      {
        "@type": "Question",
        "name": "What email systems can the AI integrate with?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI Email Agent integrates seamlessly with virtually all popular email platforms and CRM systems, including Gmail/Google Workspace, Microsoft Outlook/Exchange, Zendesk, Salesforce, HubSpot, Zoho, Front, and Help Scout. We also offer API access for custom integrations with proprietary systems."
        }
      }
    ]
  };

  const [initialLoad, setInitialLoad] = useState(true);
  
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
    if (!openCalendarModal("team-powered-by-dfbtbb/get-started-with-ai-email-agents")) {
      console.error("Failed to open Cal.com modal for email agent");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] text-white">
      <Helmet>
        <title>AI Email Agent for SMBs | Automate Customer Email Communication</title>
        <meta name="description" content="Deploy AI Email Agents to effortlessly handle customer inquiries, automate personalized follow-ups, and boost customer engagement." />
        <link rel="canonical" href="https://www.poweredby.agency/email-agent" />
        <script type="application/ld+json">
          {JSON.stringify(emailAgentFaqSchema)}
        </script>
      </Helmet>
      <Navbar />
      <main>
        <HeroSection initialLoad={initialLoad} handleContact={handleContact} />
        <FeaturesSection />
        <HowItWorksSection />
        <ROISection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default EmailAgent;
