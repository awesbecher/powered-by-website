
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PoweredByText } from '@/components/shared/PoweredByText';

export const FinalCTASection = () => {
  const handleTalkToAgent = () => {
    document.dispatchEvent(new CustomEvent('open-voice-dialog'));
  };

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <motion.div 
          className="glass-card p-10 md:p-16 rounded-2xl border border-[#9b87f5]/30 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Background decoration */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#9b87f5]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#9b87f5]/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Get Started Today</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
                If you're an SMB looking to level up your customer engagement with AI agents, <PoweredByText className="inline-block mx-1" /> is here to guide you. We offer a project-based engagement that ensures clear milestones, transparent pricing, and a solution designed with your success in mind.
              </p>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Let's transform your customer experience—together.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center gap-6 items-center">
              <Link to="/contact">
                <Button 
                  size="lg" 
                  className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white px-8 py-6 text-lg rounded-md w-full md:w-auto"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule a Meeting
                </Button>
              </Link>
              
              <Button 
                onClick={handleTalkToAgent}
                size="lg" 
                variant="outline" 
                className="bg-transparent border-2 border-[#9b87f5] text-white hover:bg-[#9b87f5]/20 px-8 py-6 text-lg rounded-md w-full md:w-auto"
              >
                Talk to AI Agent
                <ArrowRightIcon className="ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
