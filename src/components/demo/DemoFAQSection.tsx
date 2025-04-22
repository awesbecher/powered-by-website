import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface FAQItemProps {
  question: string;
  answer: string;
  value: string;
}

interface DemoFAQSectionProps {
  faqData: FAQItemProps[];
}

export const DemoFAQSection: React.FC<DemoFAQSectionProps> = ({ faqData }) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item, index) => (
            <AccordionItem 
              key={index}
              value={item.value}
            >
              <AccordionTrigger className="text-lg font-semibold text-white hover:underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
