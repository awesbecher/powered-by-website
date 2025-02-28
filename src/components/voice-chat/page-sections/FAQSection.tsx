
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
          question="How quickly can I implement voice AI on my website?"
          answer="Most businesses are up and running within 1-2 weeks. Simple implementations can be completed in as little as 48 hours." 
        />
        <FAQItem 
          question="Will the AI understand my industry terminology?"
          answer="Yes! We train your AI on your specific industry, products, and services to ensure accurate and relevant conversations." 
        />
        <FAQItem 
          question="How does pricing work for voice AI?"
          answer="We offer flexible pricing based on conversation volume. Monthly plans start at $299 with options to scale as your needs grow." 
        />
        <FAQItem 
          question="Can I customize the voice and personality of the AI?"
          answer="Absolutely. Choose from various voice options or create a custom voice that matches your brand identity perfectly." 
        />
        <FAQItem 
          question="What languages are supported?"
          answer="Our voice AI currently supports 25+ languages including English, Spanish, French, German, Portuguese, Japanese, and Mandarin." 
        />
        <FAQItem 
          question="How does the AI handle complex customer inquiries?"
          answer="The AI can handle most routine questions and tasks. For complex situations, it can seamlessly transfer to a human agent." 
        />
      </div>
    </section>
  );
};
