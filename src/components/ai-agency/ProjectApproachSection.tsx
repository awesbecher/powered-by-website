
import React from 'react';
import { motion } from 'framer-motion';
import { Target, Code, GraduationCap, LineChart } from 'lucide-react';

export const ProjectApproachSection = () => {
  const steps = [
    {
      icon: <Target size={48} className="text-[#9b87f5]" />,
      title: "Discovery & Strategy",
      items: [
        "Goal Setting: We identify your top objectives, such as reducing support wait times or boosting sales conversions.",
        "Technical Assessment: Our team audits your existing systems, data, and brand guidelines to define the perfect AI solution scope."
      ],
      gradient: "from-[#9b87f5]/20 to-[#9b87f5]/40"
    },
    {
      icon: <Code size={48} className="text-[#9b87f5]" />,
      title: "Custom AI Design & Integration",
      items: [
        "Personalized Development: From conversation flows to brand tone, we craft an AI agent that mirrors your unique style.",
        "Seamless Deployment: We integrate directly with your website, CRM, or other channels, providing end-to-end technical support."
      ],
      gradient: "from-[#8b77e5]/20 to-[#8b77e5]/40"
    },
    {
      icon: <GraduationCap size={48} className="text-[#9b87f5]" />,
      title: "Training & Knowledge Transfer",
      items: [
        "Employee Onboarding: We train your team on using, managing, and interpreting AI outputs, so everyone feels confident.",
        "Live Testing & Tweaks: Before going live, we run extensive QA to ensure the AI meets real-world user expectations."
      ],
      gradient: "from-[#7a66d5]/20 to-[#7a66d5]/40"
    },
    {
      icon: <LineChart size={48} className="text-[#9b87f5]" />,
      title: "Continuous Optimization",
      items: [
        "Performance Monitoring: Using feedback loops and analytics, we identify improvement areas—like conversation accuracy or sentiment handling.",
        "Iterative Updates: Our ongoing maintenance ensures your AI agent evolves alongside your business, maintaining top-notch performance."
      ],
      gradient: "from-[#6955c5]/20 to-[#6955c5]/40"
    }
  ];

  return (
    <section id="approach" className="relative py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Project-Based Approach
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#9b87f5] to-[#6342ff] mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We deliver AI solutions through a structured, transparent process designed for measurable results.
          </p>
        </motion.div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="flex flex-col md:flex-row gap-8 items-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="flex-shrink-0">
                <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg relative`}>
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-[#1a0b2e] flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                </div>
              </div>
              
              <div className="flex-1 glass-card p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <ul className="space-y-3">
                  {step.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#9b87f5] font-bold mt-1">•</span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
