
import React from 'react';
import { motion } from 'framer-motion';
import { PoweredByText } from '@/components/shared/PoweredByText';
import { Lightbulb, TrendingUp } from 'lucide-react';

export const UniqueAgencySection = () => {
  return (
    <section id="what-is-ai-agency" className="relative py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="glass-card p-8 md:p-12 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">What Makes an AI Agency Unique?</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#9b87f5] to-[#6342ff]"></div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2 space-y-4">
              <p className="text-lg text-gray-300 leading-relaxed">
                When most small and mid-sized businesses consider AI, they either see costly in-house builds or deeply 
                expensive enterprise solutions. At <PoweredByText className="inline-block mx-1" />, we bridge this gap 
                by serving as your dedicated AI Agency—guiding you step-by-step with customized, human-like AI solutions 
                that fit your budget, timeline, and brand.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                We handle the technical heavy lifting and deliver straightforward, powerful tools so you can focus on 
                what truly matters: delighting your customers and growing your business.
              </p>
            </div>
            
            <div className="md:w-1/2 flex justify-center">
              <motion.div 
                className="relative w-64 h-64 md:w-80 md:h-80"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#9b87f5]/40 to-[#6342ff]/40 rounded-full flex items-center justify-center">
                  <Lightbulb size={80} className="text-white" />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-[#9b87f5]/30 animate-pulse"></div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#6342ff]/60 rounded-full flex items-center justify-center">
                  <TrendingUp size={24} className="text-white" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
