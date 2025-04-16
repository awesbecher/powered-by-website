import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
  return (
    <div className="bg-[#1a1a24] rounded-xl border border-gray-800 overflow-hidden">
      <button
        className="w-full p-6 flex items-center justify-between text-left focus:outline-none"
        onClick={onClick}
      >
        <h3 className="text-lg font-bold text-white">{question}</h3>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-[#9b87f5]" />
        ) : (
          <ChevronDown className="h-5 w-5 text-[#9b87f5]" />
        )}
      </button>
      
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="px-6 pb-6 text-gray-400">{answer}</p>
      </div>
    </div>
  );
};

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    {
      question: "How quickly can I implement voice AI on my website?",
      answer: "Most businesses are up and running within 1-2 weeks. Simple implementations can be completed in as little as 48 hours. Our team handles the integration to ensure a smooth setup process."
    },
    {
      question: "Will the AI understand my industry terminology?",
      answer: "Yes! We train your AI on your specific industry, products, and services to ensure accurate and relevant conversations. The voice agent will retain all your business context and desired call outcomes."
    },
    {
      question: "Can I customize the voice and personality of the AI?",
      answer: "Absolutely. Choose from various voice options or create a custom voice that matches your brand identity perfectly. We can configure the tone, speaking style, and personality to align with your company's values."
    },
    {
      question: "How does the AI handle complex customer inquiries?",
      answer: "The AI can handle most routine questions and tasks. For complex situations, it can seamlessly transfer to a human agent. You define the escalation criteria, and the system automatically routes conversations when human intervention is needed."
    },
    {
      question: "What kind of analytics and reporting do you provide?",
      answer: "Our platform offers comprehensive analytics including conversation metrics, sentiment analysis, conversion rates, and call quality scores. You'll have access to a dashboard that shows performance trends and actionable insights."
    },
    {
      question: "Is the voice chat solution GDPR and CCPA compliant?",
      answer: "Yes, our solution is built with data privacy regulations in mind. We offer features to help you maintain compliance with GDPR, CCPA, and other relevant privacy laws, including data deletion capabilities and transparent data collection notices."
    }
  ];
  
  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleContactClick = () => {
    const calendarButton = document.querySelector('[data-cal-link]') as HTMLElement;
    if (calendarButton) {
      calendarButton.click();
    }
  };
  
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-5xl">
      <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem 
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  );
};
