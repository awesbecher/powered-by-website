import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  value: string;
}

interface DemoFAQSectionProps {
  faqData: FAQItemProps[];
}

export const DemoFAQSection: React.FC<DemoFAQSectionProps> = ({ faqData }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.21, 1.11, 0.81, 0.99]
      }
    }
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-[#6342ff]/5 blur-[120px] transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[#9b87f5]/5 blur-[100px] transform translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#6342ff] bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get answers to common questions about our AI-powered solutions and how they can benefit your business.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <AccordionItem 
                  value={item.value}
                  className="border border-gray-800 rounded-xl bg-gradient-to-br from-gray-900 to-[#1a0f2e] overflow-hidden group"
                >
                  <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-white hover:no-underline group-hover:text-[#9b87f5] transition-colors duration-200">
                    <span className="text-left">{item.question}</span>
                    <ChevronDown className="h-5 w-5 shrink-0 text-[#6342ff] transition-transform duration-200" />
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="text-gray-300 leading-relaxed">
                      {item.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
