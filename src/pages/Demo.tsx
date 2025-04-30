import React, { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { DemoHero } from "@/components/demo/DemoHero";
import { InteractiveDemoSection } from "@/components/demo/InteractiveDemoSection";
import { KeyBenefitsSection } from "@/components/demo/KeyBenefitsSection";
import { TechnicalSection } from "@/components/demo/TechnicalSection";
import { DemoFAQSection } from "@/components/demo/DemoFAQSection";
import { FinalCTASection } from "@/components/demo/FinalCTASection";
import { getCalApi } from "@calcom/embed-react";

const faqData = [
  {
    question: "How do your AI agents handle complex conversations?",
    answer: "Our AI agents use advanced natural language processing and contextual understanding to maintain coherent, meaningful conversations. They can remember previous interactions, understand nuanced queries, and provide relevant responses while maintaining context throughout the conversation.",
    value: "complex-conversations"
  },
  {
    question: "What industries do your AI solutions support?",
    answer: "We support a wide range of industries including real estate, automotive, hospitality, retail, and more. Our AI agents can be customized to understand industry-specific terminology, processes, and requirements, ensuring they provide accurate and relevant assistance for your business sector.",
    value: "industries"
  },
  {
    question: "How secure is the data handled by your AI agents?",
    answer: "Security is our top priority. All communications are encrypted end-to-end, and we comply with industry-standard security protocols. Our AI agents are designed with privacy-first principles, and we offer customizable data retention policies to meet your specific security requirements.",
    value: "security"
  },
  {
    question: "Can I integrate your AI agents with my existing systems?",
    answer: "Yes, our AI agents are designed for seamless integration with your existing business systems, including CRM platforms, booking systems, and communication tools. We provide comprehensive APIs and documentation to ensure smooth integration with your current infrastructure.",
    value: "integration"
  },
  {
    question: "What kind of support and training do you provide?",
    answer: "We offer comprehensive support including initial setup, customization, and ongoing optimization. Our team provides thorough training for your staff and 24/7 technical support. We also regularly update our AI models based on performance data and your feedback to ensure continuous improvement.",
    value: "support"
  }
];

const Demo = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  // Initialize Cal.com when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    setInitialLoad(false);
    
    (async function () {
      try {
        console.log("Initializing Cal.com embed on Demo page");
        const cal = await getCalApi();
        cal("ui", {
          "cssVarsPerTheme": {
            "light": {"cal-brand":"#292929"},
            "dark": {"cal-brand":"#fafafa"}
          },
          "hideEventTypeDetails": false,
          "layout": "month_view"
        });
        console.log("Cal.com embed initialized successfully on Demo page");
      } catch (error) {
        console.error("Error initializing Cal.com embed on Demo page:", error);
      }
    })();
  }, []);

  return (
    <PageLayout>
      <div className="relative">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[#6342ff]/10 blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#9b87f5]/10 blur-[100px]"></div>
        </div>

        <div className="relative z-10">
          {/* Main content sections */}
          <DemoHero initialLoad={initialLoad} />
          <InteractiveDemoSection />
          <KeyBenefitsSection />
          <TechnicalSection />
          <DemoFAQSection faqData={faqData} />
          <FinalCTASection />
        </div>
        
        {/* Hidden Cal.com button that will be triggered programmatically */}
        <button
          data-cal-link="team-powered-by-dfbtbb/get-started-today"
          data-cal-config='{"layout":"month_view"}'
          className="hidden"
        ></button>
      </div>
    </PageLayout>
  );
};

export default Demo;
