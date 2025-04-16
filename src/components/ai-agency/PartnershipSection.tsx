
import React from 'react';
import { motion } from 'framer-motion';
import { PoweredByText } from '@/components/shared/PoweredByText';
import { Users, LineChart, Brain, Shield } from 'lucide-react';

export const PartnershipSection = () => {
  const benefits = [
    {
      icon: <Users className="w-12 h-12 text-[#9b87f5]" />,
      title: "Tailored for SMBs",
      description: "We understand smaller teams need cost-effective, user-friendly solutions—not enterprise-level complexity. Our approach respects your resources and focuses on delivering maximum ROI."
    },
    {
      icon: <LineChart className="w-12 h-12 text-[#9b87f5]" />,
      title: "Business-Centric Results",
      description: "Whether it's boosting customer satisfaction, raising sales numbers, or reducing support overhead, our success is measured by tangible business outcomes. We prioritize real impact over flashy gimmicks."
    },
    {
      icon: <Brain className="w-12 h-12 text-[#9b87f5]" />,
      title: "Deep Expertise, Clear Communication",
      description: "Our team of AI specialists, data scientists, and customer experience professionals translate complex tech into actionable insights. You get cutting-edge AI without the jargon or confusion."
    },
    {
      icon: <Shield className="w-12 h-12 text-[#9b87f5]" />,
      title: "Trusted Partnerships",
      description: "We collaborate with leading LLM providers behind the scenes but remain your single point of contact. You get the best AI technology—customized, delivered, and supported by Powered_by."
    }
  ];

  return (
    <section id="partnership" className="relative py-24 px-4 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Should You Partner with <PoweredByText className="inline-block mx-1" />?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#9b87f5] to-[#6342ff] mx-auto mb-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="glass-card p-6 rounded-xl h-full flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="p-4 bg-gradient-to-br from-[#9b87f5]/30 to-[#6342ff]/30 rounded-lg w-fit mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{benefit.title}</h3>
              <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute right-0 top-1/4 w-80 h-80 bg-purple-700/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute left-0 bottom-1/4 w-80 h-80 bg-indigo-700/10 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};
