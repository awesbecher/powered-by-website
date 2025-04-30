import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-white/10 last:border-b-0">
      <button
        className="w-full flex justify-between items-center py-5 text-left"
        onClick={onClick}
      >
        <h3 className="text-xl font-semibold text-white pr-8">{question}</h3>
        <ChevronDown
          className={`w-5 h-5 text-[#9b87f5] transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-gray-300 leading-relaxed">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How do voice AI agents work?",
      answer:
        "Voice AI agents use advanced speech recognition to understand spoken language, natural language processing to interpret meaning, and text-to-speech technology to respond verbally. These systems learn from interactions to continuously improve their performance and accuracy over time."
    },
    {
      question: "Can the voice agent integrate with my current systems?",
      answer:
        "Yes, our voice agents are designed to integrate seamlessly with your existing CRM, scheduling software, phone systems, and other business tools through our extensive API connections. We handle all technical aspects of the integration process."
    },
    {
      question: "What industries benefit most from AI voice agents?",
      answer:
        "While voice agents can benefit many industries, they're particularly valuable for healthcare (appointment scheduling, patient screening), real estate (property inquiries, showing scheduling), financial services (basic transactions, information requests), and customer service across all sectors."
    },
    {
      question: "How long does implementation take?",
      answer:
        "Typical implementation takes 3-4 weeks from start to finish, including knowledge base building, integration with your systems, and training the voice agent on your specific business information. More complex implementations may take longer."
    },
    {
      question: "What happens if the AI can't handle a call?",
      answer:
        "We design intelligent escalation paths for each voice agent. When the AI encounters a complex situation it's not equipped to handle, it can seamlessly transfer the call to an appropriate human team member, along with a summary of the conversation so far."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(index === openIndex ? -1 : index);
  };

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Common questions about our AI voice agents and services
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10">
          {faqs.map((faq, index) => (
            <FAQItem
              question={faq.question}
              answer={faq.answer}
              isOpen={index === openIndex}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
