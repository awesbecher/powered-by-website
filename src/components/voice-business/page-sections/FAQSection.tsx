
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
          question="How quickly can I integrate AI with my phone system?"
          answer="Most businesses are up and running within days. We integrate with most major business phone systems via API. If its an order phone system, we can provide easy work-arounds." 
        />
        <FAQItem 
          question="Will the AI understand my industry terminology?"
          answer="Yes! We train your AI on your specific industry, products, services, and company policies to ensure accurate and relevant conversations with your customers." 
        />
        <FAQItem 
          question="Can I customize when calls transfer to human agents?"
          answer="Absolutely. You set the rules for when and how calls are escalated to your team, based on criteria like customer value, issue complexity, or specific requests." 
        />
        <FAQItem 
          question="How does pricing work for business phone AI?"
          answer="We offer flexible pricing models based on call volume, with plans starting at just $299/month for small businesses. There are no per-minute charges or hidden fees." 
        />
      </div>
    </section>
  );
};
