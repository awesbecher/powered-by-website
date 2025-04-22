
import React from 'react';

interface TechnicalFeatureItemProps {
  title: string;
  description: string;
}

const TechnicalFeatureItem: React.FC<TechnicalFeatureItemProps> = ({ title, description }) => {
  return (
    <div className="mb-8 last:mb-0">
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

export const TechnicalSection = () => {
  const techFeatures = [
    {
      title: "Natural Language Processing",
      description: "Our AI agents utilize state-of-the-art NLP models to understand conversational context, remember details from earlier in conversations, and provide relevant responses."
    },
    {
      title: "Multi-channel Integration",
      description: "Deploy the same AI brain across voice, chat, email, and SMS channels to deliver consistent experiences regardless of how customers prefer to connect."
    },
    {
      title: "Knowledge Base Integration",
      description: "Connect your existing documentation, product information, and FAQs to empower your AI agents with the information they need to answer questions accurately."
    },
    {
      title: "Realtime Analytics",
      description: "Monitor performance, sentiment, and conversion rates through detailed dashboards, identifying opportunities for optimization and improvement."
    },
    {
      title: "Conversation Handoff",
      description: "Seamless transition from AI to human agents when complex issues arise, complete with full conversation context to maintain continuity."
    },
    {
      title: "Secure Data Handling",
      description: "Enterprise-grade security with optional HIPAA compliance ensures customer data remains protected throughout all interactions."
    }
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-[#1a0b2e]/80 via-[#271844]/80 to-[#1a0b2e]/80">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Technical Features</h2>
            <p className="text-xl text-gray-300 mb-8">
              Our AI agents are built on cutting-edge technology to deliver exceptional performance and capabilities.
            </p>
            
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              {techFeatures.map((feature) => (
                <TechnicalFeatureItem
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
          
          <div className="lg:h-full flex items-center justify-center">
            <div className="relative">
              {/* Code diagram representation */}
              <div className="bg-[#1e1634] p-6 rounded-lg border border-[#6342ff]/30 shadow-lg shadow-[#6342ff]/10 font-mono text-sm overflow-hidden max-w-lg">
                <div className="mb-4 text-gray-400">// AI Agent Technical Implementation</div>
                <div className="mb-2 text-[#ff79c6]">class <span className="text-[#50fa7b]">AIAgent</span> &#123;</div>
                <div className="mb-2 ml-4 text-[#8be9fd]">constructor<span className="text-white">(</span><span className="text-[#ffb86c]">config</span><span className="text-white">)</span> &#123;</div>
                <div className="mb-2 ml-8 text-[#f1fa8c]">this.language = config.language;</div>
                <div className="mb-2 ml-8 text-[#f1fa8c]">this.knowledgeBase = new KnowledgeBase();</div>
                <div className="mb-2 ml-8 text-[#f1fa8c]">this.channels = [];</div>
                <div className="mb-2 ml-4 text-white">&#125;</div>
                <div className="mb-2 ml-4 text-[#8be9fd]">async <span className="text-[#50fa7b]">processInput</span><span className="text-white">(</span><span className="text-[#ffb86c]">input</span><span className="text-white">)</span> &#123;</div>
                <div className="mb-2 ml-8 text-[#f1fa8c]">const intent = await this.detectIntent(input);</div>
                <div className="mb-2 ml-8 text-[#f1fa8c]">const context = this.getConversationContext();</div>
                <div className="mb-2 ml-8 text-[#f1fa8c]">return this.generateResponse(intent, context);</div>
                <div className="mb-2 ml-4 text-white">&#125;</div>
                <div className="text-[#ff79c6]">&#125;</div>
              </div>
              
              {/* Floating UI elements */}
              <div className="absolute -top-4 -right-4 bg-[#6342ff] text-white px-3 py-1 text-xs rounded-full">
                NLP Engine
              </div>
              <div className="absolute -bottom-3 -left-3 bg-[#9b87f5] text-white px-3 py-1 text-xs rounded-full">
                Real-time Processing
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSection;
