import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PhoneCall } from 'lucide-react';

export const LiveAgentSection = () => {
  const handleStartVoiceChat = () => {
    document.dispatchEvent(new CustomEvent('open-voice-dialog'));
  };

  return (
    <section className="py-16 px-4 scroll-mt-20">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Speak to an AI Agent Now
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#9b87f5] to-[#6342ff] mx-auto mb-6"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-xl text-gray-300 mb-8">
              Speak live with an AI agent now! Ask it anything about AI Agents, how they work, use cases, or AI best practices.
            </p>
            <Button
              onClick={handleStartVoiceChat}
              className="bg-[#6342ff] hover:bg-[#6342ff]/80 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2"
            >
              <PhoneCall className="w-5 h-5" />
              Start Voice Chat Now
            </Button>
          </motion.div>

          {/* Right Column - Call Preview */}
          <motion.div
            className="min-h-[400px] bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 p-6 flex items-center justify-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-[#6342ff]/20 flex items-center justify-center mx-auto mb-4 overflow-hidden border-2 border-[#9b87f5]/30">
                <img
                  src="/assets/images/bd9e9055-ba23-4fcc-9c2a-4fda4b9dd627.png"
                  alt="Michael - AI Agent"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Meet Michael!</h3>
              <p className="text-gray-400 mb-6">
                He's our own AI Agent designed to help you learn more about AI Agents, their use cases, and how they could be applied to your business. Click below to have a live chat with Michael and experience the power of voice AI.
              </p>
              <Button
                onClick={handleStartVoiceChat}
                className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2"
              >
                <PhoneCall className="w-5 h-5" />
                Speak with Michael!
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
