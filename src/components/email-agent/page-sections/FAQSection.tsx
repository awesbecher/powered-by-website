
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  toggleOpen: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <div className="border-b border-gray-800 py-5">
      <button 
        className="flex w-full justify-between items-start text-left focus:outline-none"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold text-white pr-8">{question}</h3>
        <span className="flex-shrink-0 ml-2 mt-1">
          {isOpen ? 
            <ChevronUp className="h-5 w-5 text-[#9b87f5]" /> : 
            <ChevronDown className="h-5 w-5 text-gray-400" />
          }
        </span>
      </button>
      
      {isOpen && (
        <div className="mt-3 text-gray-300 text-base">
          {answer}
        </div>
      )}
    </div>
  );
};

export const FAQSection = () => {
  // State to track which FAQ item is open
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  const faqs = [
    {
      question: "How long does it take to set up an AI Email Agent?",
      answer: (
        <p>
          The basic setup takes just 24-48 hours. The AI agent is immediately operational after initial configuration, 
          but reaches optimal performance after 2-3 weeks of learning from your specific business communications and 
          receiving feedback. Our team handles the entire integration process, making it seamless for your business.
        </p>
      )
    },
    {
      question: "Will the AI Email Agent sound like a robot when responding to our customers?",
      answer: (
        <p>
          Not at all. Our AI Email Agents are designed to match your brand voice precisely. We train the system on your existing 
          communications, style guides, and specific instructions to ensure responses are indistinguishable from your best team members. 
          The AI adapts its tone and language to match the context and customer relationship, creating natural, personalized interactions.
        </p>
      )
    },
    {
      question: "What level of control do we have over the AI's responses?",
      answer: (
        <div>
          <p>You maintain complete control through multiple mechanisms:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Comprehensive policy settings that define response boundaries</li>
            <li>Approval workflows for sensitive or complex cases</li>
            <li>Real-time monitoring and override capabilities</li>
            <li>Regular review systems to provide feedback and improve performance</li>
          </ul>
          <p className="mt-2">
            You can set the AI to fully autonomous mode or require human approval before sending specific types of responses.
          </p>
        </div>
      )
    },
    {
      question: "Is our email data secure with your AI solution?",
      answer: (
        <div>
          <p>
            Security is our top priority. Our AI Email Agent platform features:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>End-to-end encryption for all data</li>
            <li>SOC 2 Type II compliance</li>
            <li>GDPR and CCPA compliance</li>
            <li>Data residency options for specific geographic requirements</li>
            <li>Regular security audits and penetration testing</li>
          </ul>
          <p className="mt-2">
            We never use your data to train other clients' AI models, and you retain full ownership of all your data.
          </p>
        </div>
      )
    },
    {
      question: "How does pricing work?",
      answer: (
        <p>
          Our pricing is transparent and scales with your needs. We offer tiered plans based on email volume, 
          starting at $399/month for small businesses. Each plan includes setup, training, and ongoing optimization. 
          For organizations with specialized needs, we offer custom enterprise pricing with additional features like 
          dedicated account management and advanced integrations. Contact us for a personalized quote.
        </p>
      )
    },
    {
      question: "What email systems can the AI integrate with?",
      answer: (
        <div>
          <p>
            Our AI Email Agent integrates seamlessly with virtually all popular email platforms and CRM systems, including:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 grid grid-cols-2">
            <li>Gmail/Google Workspace</li>
            <li>Microsoft Outlook/Exchange</li>
            <li>Zendesk</li>
            <li>Salesforce</li>
            <li>HubSpot</li>
            <li>Zoho</li>
            <li>Front</li>
            <li>Help Scout</li>
          </ul>
          <p className="mt-2">
            We also offer API access for custom integrations with proprietary systems.
          </p>
        </div>
      )
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl bg-gradient-to-b from-[#1a0b2e]/30 to-transparent" id="faq">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-300">
            Everything you need to know about our AI Email Agent solution.
          </p>
        </div>
        
        <div className="divide-y divide-gray-800 border-t border-gray-800">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index} 
              question={faq.question} 
              answer={faq.answer}
              isOpen={openIndex === index}
              toggleOpen={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
