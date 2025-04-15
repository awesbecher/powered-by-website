import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQSection = () => {
  const faqs = [
    {
      question: "How does the Text Agent AI work?",
      answer: "Our Text Agent uses advanced natural language processing to engage in human-like text conversations with your leads and customers. It can personalize messages, respond to inquiries, follow up automatically, and even qualify leads based on their responses. The AI continuously learns from interactions to improve its effectiveness over time."
    },
    {
      question: "Which CRM systems can Text Agent integrate with?",
      answer: "Text Agent seamlessly integrates with major CRM platforms including Salesforce, HubSpot, Zoho, Microsoft Dynamics, and Pipedrive. We also offer custom API integration for proprietary CRM systems. All integration options maintain data synchronization in real-time."
    },
    {
      question: "Is Text Agent compliant with messaging regulations?",
      answer: "Yes, our platform is built with TCPA, GDPR, and other messaging compliance regulations in mind. We include features like automatic opt-out processing, consent management, and message frequency controls to ensure your campaigns remain compliant with industry regulations."
    },
    {
      question: "Can I personalize messages for different customer segments?",
      answer: "Absolutely! Text Agent allows you to create personalized messaging templates based on demographic data, behavior patterns, past interactions, and CRM data. You can segment your audience and tailor messaging strategies for each group, ensuring relevant communication that drives engagement."
    },
    {
      question: "How quickly can I get started with Text Agent?",
      answer: "Most businesses can be up and running with Text Agent in less than a day. Our onboarding process includes CRM integration, initial campaign setup, and strategy consultation. For more complex implementations or custom integrations, the timeline may extend to several days."
    },
    {
      question: "What kind of reporting and analytics does Text Agent provide?",
      answer: "Our platform offers comprehensive analytics including message delivery rates, response rates, conversion metrics, engagement analytics, and campaign performance data. You can access real-time dashboards and scheduled reports to track ROI and optimize your text messaging strategy."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
        <p className="text-xl text-gray-300">
          Everything you need to know about our Text Agent AI solution
        </p>
      </div>
      
      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            className="bg-[#222222]/80 backdrop-blur-lg rounded-xl border border-white/10 px-6"
          >
            <AccordionTrigger className="text-white text-lg font-medium py-4">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-gray-300 pb-4">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
