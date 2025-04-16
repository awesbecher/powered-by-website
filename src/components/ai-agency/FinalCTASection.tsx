
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, CalendarClock } from "lucide-react";
import { PoweredByText } from "@/components/shared/PoweredByText";
import { motion } from "framer-motion";

export const FinalCTASection = () => {
  const handleTalkToAgent = () => {
    document.dispatchEvent(new CustomEvent('open-voice-dialog'));
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <motion.div 
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#6342ff] to-[#a87cff]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#6342ff] mix-blend-multiply opacity-60"></div>
          <div className="absolute -bottom-48 -right-48 w-96 h-96 rounded-full bg-[#a87cff] blur-3xl opacity-40"></div>
          <div className="absolute -top-48 -left-48 w-96 h-96 rounded-full bg-[#6342ff] blur-3xl opacity-40"></div>
          
          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-white/30"
                initial={{ 
                  x: Math.random() * 100 - 50 + "%", 
                  y: Math.random() * 100 + "%", 
                  scale: 0 
                }}
                animate={{ 
                  x: [
                    Math.random() * 100 - 50 + "%",
                    Math.random() * 100 - 50 + "%",
                    Math.random() * 100 - 50 + "%"
                  ],
                  y: [
                    Math.random() * 100 + "%",
                    Math.random() * 100 + "%",
                    Math.random() * 100 + "%"
                  ],
                  scale: [0, 1, 0]
                }}
                transition={{ 
                  duration: 8 + i,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="relative px-8 py-20 text-center">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to transform your business with AI agents?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white/90 mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Join the SMBs already using <PoweredByText /> AI agents to reduce costs, improve customer satisfaction, and scale operations.
            <br />
            <span className="text-white font-medium mt-3 block">
              Let's unlock new growth and efficiency—together.
            </span>
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/contact">
              <Button className="bg-white hover:bg-gray-100 text-[#6342ff] font-bold px-8 py-6 text-lg rounded-md flex items-center gap-2">
                <CalendarClock className="h-5 w-5" />
                Schedule Free Strategy Call
                <ArrowRight className="ml-1 h-5 w-5" />
              </Button>
            </Link>
            
            <Button 
              onClick={handleTalkToAgent}
              variant="outline" 
              className="border-2 border-white text-white bg-transparent hover:bg-white/10 font-bold px-8 py-6 text-lg rounded-md"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat With AI Agent
            </Button>
          </motion.div>
          
          <motion.div 
            className="mt-10 bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-white/90 text-sm">
              "Implementing our <PoweredByText /> AI solution took just 3 weeks and has already reduced our customer service costs by 32% while improving our response time by 78%."
            </p>
            <p className="text-white/70 text-sm mt-2">— David Chen, Operations Director, CloudTech Solutions</p>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Stats counter section */}
      <motion.div 
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {[
          { value: "35+", label: "SMB Clients" },
          { value: "45%", label: "Avg. Cost Reduction" },
          { value: "3.2x", label: "ROI Within 6 Months" },
          { value: "90%", label: "Client Satisfaction" }
        ].map((stat, index) => (
          <div key={index} className="text-center p-4">
            <motion.div
              className="text-3xl md:text-4xl font-bold text-[#9b87f5]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {stat.value}
            </motion.div>
            <motion.div 
              className="text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            >
              {stat.label}
            </motion.div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};
