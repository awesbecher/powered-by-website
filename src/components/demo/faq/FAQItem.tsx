
import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItemProps {
  question: string;
  answer: string;
  value: string;
}

export const FAQItem = ({ question, answer, value }: FAQItemProps) => {
  return (
    <AccordionItem 
      value={value}
      className="border-b border-gray-800 last:border-b-0"
    >
      <AccordionTrigger className="text-lg font-medium py-6 px-6 hover:no-underline hover:bg-[#2a1c43]/20 transition-colors">
        <span className="text-left">{question}</span>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6 pt-2 text-gray-300">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
};
