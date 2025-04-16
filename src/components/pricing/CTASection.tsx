
import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface CTASectionProps {
  handleContact?: () => void;
}

const CTASection = ({ handleContact }: CTASectionProps) => {
  return (
    <motion.section 
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6342ff] to-[#a87cff] opacity-90"></div>
        <div className="relative z-10 px-8 py-16 text-center">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Let's Power Your Vision—Contact Us Today
          </motion.h2>
          <motion.p 
            className="text-xl text-white/90 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Join the businesses revolutionizing the way they work, communicate, and engage customers with our powerful AI agents.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button 
              className="bg-white hover:bg-gray-100 text-[#6342ff] font-bold px-8 py-6 text-lg rounded-md"
              data-tally-open="w2og9b"
              data-tally-layout="modal"
              data-tally-width="476"
              data-tally-hide-title="1"
              data-tally-auto-close="0"
              data-tally-overlay="1"
            >
              Get Started Today
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default CTASection;
