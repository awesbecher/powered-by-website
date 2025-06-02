
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
      question: "How quickly can I integrate AI with my phone system?",
      answer: "Most businesses are up and running within a single day. We integrate with all major business phone systems via API. If you have an older phone system, we can provide easy workarounds to ensure seamless operation."
    },
    {
      question: "Will the AI understand my industry terminology?",
      answer: "Yes! We train our AI Receptionist on the specifics of your business, including industry terminology, common customer inquiries, and your desired call outcomes. The AI continuously learns from interactions to improve over time."
    },
    {
      question: "Can I customize when calls transfer to human agents?",
      answer: "Absolutely. You set the rules for when and how calls are escalated to your team, based on criteria like customer value, issue complexity, or specific requests. You maintain complete control over the customer experience."
    },
    {
      question: "How does pricing work for an AI receptionist?",
      answer: "We offer flexible pricing models based on call volume and workflow complexity. Our pricing is designed for small business budgets with plans starting at a fraction of the cost of a human receptionist. Contact us for a custom quote."
    },
    {
      question: "What kind of reporting and analytics do I get?",
      answer: "Our platform provides comprehensive analytics including call volume, average call duration, common inquiries, resolution rates, and more. You can access these insights through a user-friendly dashboard to optimize your business operations."
    },
    {
      question: "Is my data secure and private?",
      answer: "Yes, we take security and privacy extremely seriously. All conversations are encrypted end-to-end, and we adhere to strict data protection standards. Your customer information is never sold or shared with third parties."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-5xl relative">
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-20 right-10 w-72 h-72 rounded-full bg-[#7100ff]/10 blur-3xl"></div>
        <div className="absolute bottom-20 -left-20 w-72 h-72 rounded-full bg-[#9b87f5]/10 blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about our AI Receptionist solution
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-[#1a1a24]/70 backdrop-blur-lg rounded-xl border border-gray-800 hover:border-[#9b87f5]/30 transition-all duration-300"
            >
              <AccordionTrigger className="text-white text-lg font-medium py-4 px-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 px-6 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
