import React, { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { HeroSection } from "@/components/ai-agency/HeroSection";
import { BusinessValueSection } from "@/components/ai-agency/BusinessValueSection";
import { UseCasesSection } from "@/components/ai-agency/UseCasesSection";
import { ProjectApproachSection } from "@/components/ai-agency/ProjectApproachSection";
import { LiveAgentSection } from "@/components/ai-agency/LiveAgentSection";
import { FinalCTABanner } from "@/components/ai-agency/FinalCTABanner";
import { EducateSection } from "@/components/ai-agency/EducateSection";
import { CustomAgentsSection } from "@/components/ai-agency/CustomAgentsSection";
import { SEO } from "@/components/shared/SEO";
import { getCalApi } from "@calcom/embed-react";

const Index = () => {
  const homepageFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Agent vs. Chatbot",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While chatbots follow pre-defined scripts and decision trees, AI agents understand context, learn from interactions, and can engage in natural conversations across multiple topics. AI agents use advanced language models and specialized training to comprehend your business context, handle complex queries, make informed decisions, and even detect customer sentiment to adjust their communication style. They maintain consistent knowledge and personality across all channels, building trust with your customers."
        }
      },
      {
        "@type": "Question",
        "name": "Voice, Text, and Multichannel",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Modern customers expect to reach businesses through their preferred channels. AI agents excel at voice conversations, handling natural phone calls with human-like understanding and responses. They're proficient with email and SMS, maintaining context across all channels. The same agent can switch seamlessly between channels, remembering previous interactions, providing a consistent experience whether the customer calls, emails, or texts, all without human intervention."
        }
      },
      {
        "@type": "Question",
        "name": "Why SMBs adopt agents in 2025",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI agents help SMBs by reducing customer support costs by 73%, providing 24/7 availability, which increases customer satisfaction by an average of 47%. They offer 6x faster response times compared to traditional support channels, and 89% of customers report positive experiences with well-trained AI agents. Additionally, AI agents increase successful query resolution on first contact by 58%."
        }
      }
    ]
  };

  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Initialize Cal.com at the page level for better reliability
    (async function () {
      try {
        console.log("Initializing Cal.com embed at Index page level");
        const cal = await getCalApi();
        if (cal) {
          cal("ui", {
            "cssVarsPerTheme": {
              "light": {"cal-brand":"#292929"},
              "dark": {"cal-brand":"#fafafa"}
            },
            "hideEventTypeDetails": false,
            "layout": "month_view"
          });
          
          // Preload the calendar link
          cal("preload", { calLink: "team-powered-by-dfbtbb/get-started-today" });
          
          console.log("Cal.com embed initialized successfully at Index page level");
        } else {
          console.error("Cal API not available in Index page");
        }
      } catch (error) {
        console.error("Error initializing Cal.com embed at Index page level:", error);
      }
    })();
  }, []);

  return (
    <PageLayout>
      <SEO faqSchema={homepageFaqSchema} />
      <main>
        <section id="hero-section" className="relative">
          <HeroSection initialLoad={initialLoad} />
        </section>
        
        <section id="custom-agents-section">
          <CustomAgentsSection />
        </section>
        
        <section id="educate-section">
          <EducateSection />
        </section>
        
        <section id="use-cases-section">
          <UseCasesSection />
        </section>
        
        <section id="live-agent-section">
          <LiveAgentSection />
        </section>
        
        <section id="project-approach-section">
          <ProjectApproachSection />
        </section>
        
        <section id="business-value-section">
          <BusinessValueSection />
        </section>
        
        <section id="cta-section">
          <FinalCTABanner />
        </section>
      </main>
    </PageLayout>
  );
};

export default Index;
