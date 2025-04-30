import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const EducateSection = () => {
  return (
    <section className="py-12 pb-0">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What's an AI Agent?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#9b87f5] to-[#6342ff] mx-auto mb-6"></div>
        </motion.div>

        <motion.div
          className="max-w-5xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden border border-white/10 cursor-pointer">
            <a 
              href="https://youtu.be/w6juT92KdRo?si=8c6UvBzFQ4mj4wgi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full h-full"
            >
              <img
                src={`/assets/team/What's an AI Agent.png?t=${Date.now()}`}
                alt="What's an AI Agent"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="agent-vs-chatbot" className="border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm px-6">
              <AccordionTrigger className="text-white hover:text-[#9b87f5] text-lg font-semibold py-4">
                Agent vs. Chatbot
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 pb-6 space-y-4">
                <p>
                  While chatbots follow pre-defined scripts and decision trees, AI agents are fundamentally different. They understand context, learn from interactions, and can engage in natural conversations across multiple topics without rigid pathways.
                </p>
                <p>
                  AI agents use advanced language models and specialized training to truly comprehend your business context. They can handle complex queries, make informed decisions, and even detect customer sentiment to adjust their communication style.
                </p>
                <p>
                  Most importantly, our AI agents maintain consistent knowledge and personality across all channels - whether speaking on the phone, responding to emails, or sending text messages. This creates a unified brand voice that builds trust with your customers.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="voice-text-multichannel" className="border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm px-6">
              <AccordionTrigger className="text-white hover:text-[#9b87f5] text-lg font-semibold py-4">
                Voice, Text, and Multichannel
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 pb-6 space-y-4">
                <p>
                  Modern customers expect to reach businesses through their preferred channels. Our AI agents excel at voice conversations, handling natural phone calls with human-like understanding and responses. They're equally proficient with email and SMS, maintaining context across all channels.
                </p>
                <p>
                  The same agent can switch between channels seamlessly, remembering previous interactions and maintaining conversation history. This creates a consistent experience whether your customer calls, emails, or texts - all without human intervention.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="smb-adoption" className="border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm px-6">
              <AccordionTrigger className="text-white hover:text-[#9b87f5] text-lg font-semibold py-4">
                Why SMBs adopt agents in 2025
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 pb-6">
                <ul className="space-y-4 list-disc pl-5">
                  <li>
                    <span className="font-semibold text-[#9b87f5]">73% cost reduction</span> in customer support operations after implementing AI agents
                  </li>
                  <li>
                    <span className="font-semibold text-[#9b87f5]">24/7 availability</span> increases customer satisfaction scores by an average of 47%
                  </li>
                  <li>
                    <span className="font-semibold text-[#9b87f5]">6× faster response times</span> compared to traditional support channels
                  </li>
                  <li>
                    <span className="font-semibold text-[#9b87f5]">89% of customers</span> report positive experiences with well-trained AI agents
                  </li>
                  <li>
                    <span className="font-semibold text-[#9b87f5]">58% increase</span> in successful query resolution on first contact
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default EducateSection;
