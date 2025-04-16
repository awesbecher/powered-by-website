
import React from 'react';
import { motion } from 'framer-motion';
import { PoweredByText } from '@/components/shared/PoweredByText';
import { UserCog, HeadSideBrain, RefreshCw } from 'lucide-react';

export const DifferenceSection = () => {
  const features = [
    {
      icon: <UserCog size={56} className="text-[#9b87f5]" />,
      title: "Personalized Implementation",
      description: "Large Language Model (LLM) providers like OpenAI, Anthropic, and Google excel at building robust AI engines—but they rarely deliver a fully tailored, ready-to-deploy solution. Powered_by AI adapts these world-class models to your unique business goals, customer pain points, and existing tech stack."
    },
    {
      icon: <HeadSideBrain size={56} className="text-[#9b87f5]" />,
      title: "Hands-On Support",
      description: "Instead of a self-service API and limited troubleshooting, our hands-on experts ensure your AI solution is properly integrated, trained, and continuously improved. We're not just handing you the keys; we're the driver, mechanic, and co-pilot every step of the way."
    },
    {
      icon: <RefreshCw size={56} className="text-[#9b87f5]" />,
      title: "Ongoing Optimization",
      description: "Your AI should evolve with your business. Rather than a "one-size-fits-all" approach, we refine and optimize your AI agent over time—no guesswork or frustrating DIY updates."
    }
  ];

  return (
    <section id="how-different" className="relative py-24 px-4 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How Are We Different Than The Major AI Giants?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#9b87f5] to-[#6342ff] mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We focus on making AI accessible, practical, and valuable for SMBs without the enterprise complexity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass-card p-8 rounded-xl h-full flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed flex-grow">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute left-0 top-1/3 w-64 h-64 bg-purple-700/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute right-0 bottom-1/3 w-64 h-64 bg-indigo-700/20 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};
