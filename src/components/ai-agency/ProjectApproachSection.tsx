
import React from 'react';
import { motion } from 'framer-motion';
import { Target, Code, GraduationCap, LineChart, ArrowRight } from 'lucide-react';

export const ProjectApproachSection = () => {
  const steps = [
    {
      icon: <Target size={48} className="text-[#9b87f5]" />,
      title: "Discovery & Strategy",
      items: [
        "Goal Setting: We identify your top objectives, such as reducing support wait times or boosting sales conversions.",
        "Technical Assessment: Our team audits your existing systems, data, and brand guidelines to define the perfect AI solution scope."
      ],
      gradient: "from-[#9b87f5]/20 to-[#9b87f5]/40",
      stat: "100% of clients report clearer project vision after our discovery phase",
      caseSnippet: "A retail client identified $120K in potential annual savings during our initial assessment."
    },
    {
      icon: <Code size={48} className="text-[#9b87f5]" />,
      title: "Custom AI Design & Integration",
      items: [
        "Personalized Development: From conversation flows to brand tone, we craft an AI agent that mirrors your unique style.",
        "Seamless Deployment: We integrate directly with your website, CRM, or other channels, providing end-to-end technical support."
      ],
      gradient: "from-[#8b77e5]/20 to-[#8b77e5]/40",
      stat: "85% of clients require zero IT resources during integration",
      caseSnippet: "Our healthcare client successfully integrated their AI agent with their existing patient portal in just 2 weeks."
    },
    {
      icon: <GraduationCap size={48} className="text-[#9b87f5]" />,
      title: "Training & Knowledge Transfer",
      items: [
        "Employee Onboarding: We train your team on using, managing, and interpreting AI outputs, so everyone feels confident.",
        "Live Testing & Tweaks: Before going live, we run extensive QA to ensure the AI meets real-world user expectations."
      ],
      gradient: "from-[#7a66d5]/20 to-[#7a66d5]/40",
      stat: "Users report 90% understanding after just one training session",
      caseSnippet: "After training, staff at an insurance agency reduced manual inquiry handling by 45%."
    },
    {
      icon: <LineChart size={48} className="text-[#9b87f5]" />,
      title: "Continuous Optimization",
      items: [
        "Performance Monitoring: Using feedback loops and analytics, we identify improvement areas—like conversation accuracy or sentiment handling.",
        "Iterative Updates: Our ongoing maintenance ensures your AI agent evolves alongside your business, maintaining top-notch performance."
      ],
      gradient: "from-[#6955c5]/20 to-[#6955c5]/40",
      stat: "22% average improvement in AI performance after first optimization cycle",
      caseSnippet: "Monthly optimizations helped a property management company increase their lead capture rate by 32%."
    }
  ];

  return (
    <section id="approach" className="relative py-24 px-4 scroll-mt-20">
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

        {/* Timeline view for larger screens */}
        <div className="hidden md:flex justify-between relative mb-20">
          {/* Timeline bar */}
          <div className="absolute top-10 left-0 right-0 h-1 bg-gradient-to-r from-[#9b87f5] to-[#6342ff] z-0"></div>
          
          {/* Timeline steps */}
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="relative z-10 w-52"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col items-center">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}>
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-[#1a0b2e] flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mt-4 text-center">{step.title}</h3>
                <ArrowRight className="text-[#9b87f5] mt-4" size={20} />
              </div>
            </motion.div>
          ))}
        </div>

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
              <div className="flex-shrink-0 md:hidden">
                <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg relative`}>
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-[#1a0b2e] flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                </div>
              </div>
              
              <div className="flex-1 glass-card p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <ul className="space-y-3 mb-6">
                  {step.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#9b87f5] font-bold mt-1">•</span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Stats and case snippets */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="text-[#9b87f5] font-bold mb-2 text-sm">KEY STAT</div>
                      <p className="text-white">{step.stat}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="text-[#9b87f5] font-bold mb-2 text-sm">CLIENT EXAMPLE</div>
                      <p className="text-white text-sm">{step.caseSnippet}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* FAQ section */}
        <motion.div
          className="mt-20 glass-card p-8 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">Common Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "How fast can we implement an AI solution?",
                answer: "For most SMBs, we can go from initial consultation to deployment in 2-4 weeks."
              },
              {
                question: "Do I need coding knowledge to manage the AI?",
                answer: "No, our solutions come with user-friendly interfaces designed for non-technical staff."
              },
              {
                question: "Can the AI solution scale as we grow?",
                answer: "Absolutely! We build with scalability in mind, so your AI can evolve with your business needs."
              },
              {
                question: "What kind of ROI can I expect?",
                answer: "Most clients see positive ROI within 3-6 months, with improvements in efficiency, customer satisfaction, and sales."
              }
            ].map((faq, index) => (
              <div key={index} className="border-l-2 border-[#9b87f5] pl-4">
                <h4 className="text-white font-semibold mb-2">{faq.question}</h4>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
