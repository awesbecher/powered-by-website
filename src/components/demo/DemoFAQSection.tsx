
import { useState } from "react";
import { Accordion } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { FAQItem } from "./faq/FAQItem";
import { demoFAQs } from "./faq/FAQData";

export const DemoFAQSection = () => {
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
            {demoFAQs.map((faq, index) => (
              <FAQItem 
                key={index} 
                question={faq.question}
                answer={faq.answer}
                value={`item-${index}`}
              />
            ))}
          </Accordion>
        </div>
      </motion.div>
    </section>
  );
};
