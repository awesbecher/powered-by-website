
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
          question="How quickly can I integrate an AI Text Agent with my business?"
          answer="Most businesses can be up and running within 48 hours. We integrate with popular SMS providers and can set up a dedicated business number for your AI agent." 
        />
        <FAQItem 
          question="Will the AI understand my business context and terminology?"
          answer="Yes! We train your AI Text Agent on your specific business context, including industry terms, products/services, and typical customer inquiries." 
        />
        <FAQItem 
          question="Is the AI Text Agent compliant with SMS regulations?"
          answer="Absolutely. Our text agents are built to comply with all messaging regulations including opt-in requirements, privacy laws, and message frequency limitations." 
        />
        <FAQItem 
          question="How does pricing work for an AI Text Agent?"
          answer="We offer flexible pricing models based on message volume and complexity of automations. Our pricing is designed to fit small business budgets while providing enterprise-level functionality." 
        />
      </div>
    </section>
  );
};
