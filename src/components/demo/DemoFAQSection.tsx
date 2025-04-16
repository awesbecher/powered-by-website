
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

export const DemoFAQSection = () => {
  const faqs = [
    {
      question: "What AI models power your agent technology?",
      answer: "Our AI agents are powered by cutting-edge large language models from OpenAI and Anthropic, customized with proprietary fine-tuning for business applications. These models are constantly updated to ensure the highest quality of interactions."
    },
    {
      question: "Is the AI customizable for my specific industry?",
      answer: "Absolutely. We specialize in creating custom AI agents tailored to your industry's terminology, regulatory requirements, and specific use cases. Each agent is built with your business objectives and customer journey in mind."
    },
    {
      question: "How secure is the data handled by your AI agents?",
      answer: "Security is paramount. All data is encrypted in transit and at rest, with strict access controls. We comply with GDPR, CCPA, and industry-specific regulations. Customer data is only used to improve the specific AI agents you've implemented and never shared across clients."
    },
    {
      question: "Can the AI agents integrate with our existing systems?",
      answer: "Yes, our AI agents integrate seamlessly with major CRMs (Salesforce, HubSpot), communication platforms, and custom software through our robust API. We have pre-built connectors for popular business tools and can develop custom integrations for proprietary systems."
    },
    {
      question: "What kind of results can I expect for my business?",
      answer: "Clients typically see 60-80% reduction in response times, 30-50% decrease in operational costs for customer support, and significant improvements in satisfaction scores. ROI generally becomes apparent within 3 months of implementation."
    },
    {
      question: "How long does it take to implement your AI solutions?",
      answer: "Basic implementations can be live in as little as 2 weeks. More complex enterprise solutions with custom integrations typically take 4-8 weeks from kickoff to launch, depending on the scope of the project and integration requirements."
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0612] to-[#110820]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300">
            Everything you need to know about our AI demo and implementation process.
          </p>
        </div>

        <div className="bg-[#1a0f2e]/60 backdrop-blur-sm border border-gray-800 rounded-2xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b border-gray-800 last:border-b-0"
              >
                <AccordionTrigger className="text-lg font-medium py-6 px-6 hover:no-underline hover:bg-[#2a1c43]/20 transition-colors">
                  <span className="text-left">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-2 text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-400">
            Have more questions? <a href="#" className="text-[#9b87f5] hover:underline">Contact our support team</a> or <a href="#" className="text-[#9b87f5] hover:underline">read our documentation</a>.
          </p>
        </div>
      </motion.div>
    </section>
  );
};
