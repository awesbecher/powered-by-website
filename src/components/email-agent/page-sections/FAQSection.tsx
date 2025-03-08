
interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  return (
    <div className="bg-[#1a1a24] p-6 rounded-xl border border-gray-800">
      <h3 className="text-lg font-bold text-white mb-3">{question}</h3>
      <p className="text-gray-400">{answer}</p>
    </div>
  );
};

export const FAQSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
        Frequently Asked Questions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <FAQItem 
          question="How quickly can I integrate an AI Email Agent with my business email?"
          answer="Most businesses can be up and running within a week. We integrate with popular email providers like Gmail, Outlook, and custom SMTP servers." 
        />
        <FAQItem 
          question="Will the AI understand my business context and terminology?"
          answer="Yes! We train your AI Email Agent on your specific business context, including industry terms, products/services, and typical customer inquiries." 
        />
        <FAQItem 
          question="Can I customize when the AI handles emails versus my team?"
          answer="Absolutely. You set the rules for when and how emails are handled by the AI versus your human team based on content, importance, or specific keywords." 
        />
        <FAQItem 
          question="How does pricing work for an AI Email Agent?"
          answer="We offer flexible pricing models based on email volume and complexity of automations. Our pricing is designed to fit small business budgets while providing enterprise-level functionality." 
        />
      </div>
    </section>
  );
};
