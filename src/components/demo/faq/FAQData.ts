
export interface FAQItem {
  question: string;
  answer: string;
}

export const demoFAQs: FAQItem[] = [
  {
    question: "What AI models power your agent technology?",
    answer: "Our AI agents are powered by cutting-edge large language models from OpenAI and Anthropic, customized with proprietary fine-tuning for business applications. These models are constantly updated to ensure the highest quality of interactions."
  },
  {
    question: "Is the AI customizable for my specific industry?",
    answer: "Absolutely. We specialize in creating custom AI agents tailored to your industry's terminology, regulatory requirements, and specific use cases. Each agent is built with your business objectives and customer journey in mind."
  },
  {
    question: "How secure is the data handled by your AI agents?",
    answer: "Security is paramount. All data is encrypted in transit and at rest, with strict access controls. We comply with GDPR, CCPA, and industry-specific regulations. Customer data is only used to improve the specific AI agents you've implemented and never shared across clients."
  },
  {
    question: "Can the AI agents integrate with our existing systems?",
    answer: "Yes, our AI agents integrate seamlessly with major CRMs (Salesforce, HubSpot), communication platforms, and custom software through our robust API. We have pre-built connectors for popular business tools and can develop custom integrations for proprietary systems."
  },
  {
    question: "What kind of results can I expect for my business?",
    answer: "Clients typically see 60-80% reduction in response times, 30-50% decrease in operational costs for customer support, and significant improvements in satisfaction scores. ROI generally becomes apparent within 3 months of implementation."
  },
  {
    question: "How long does it take to implement your AI solutions?",
    answer: "Basic implementations can be live in as little as 2 weeks. More complex enterprise solutions with custom integrations typically take 4-8 weeks from kickoff to launch, depending on the scope of the project and integration requirements."
  }
];
