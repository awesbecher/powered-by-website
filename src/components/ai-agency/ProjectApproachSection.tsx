import React from 'react';
import { motion } from 'framer-motion';

interface ApproachStep {
  title: string;
  description: string;
  bullets: string[];
  stat: {
    value: string;
    description: string;
  };
  example: {
    title: string;
    description: string;
  };
}

const steps: ApproachStep[] = [
  {
    title: "Discovery & Strategy",
    description: "",
    bullets: [
      "Goal Setting: We identify your top objectives, such as reducing support wait times or boosting sales conversions.",
      "Technical Assessment: Our team audits your existing systems, data, and brand guidelines to define the perfect AI solution scope."
    ],
    stat: {
      value: "100%",
      description: "of clients report clearer project vision after our discovery phase"
    },
    example: {
      title: "CLIENT EXAMPLE",
      description: "A retail client identified $120K in potential annual savings during our initial assessment."
    }
  },
  {
    title: "Custom AI Design & Integration",
    description: "",
    bullets: [
      "Personalized Development: From conversation flows to brand tone, we craft an AI agent that mirrors your unique style.",
      "Seamless Deployment: We integrate directly with your website, CRM, or other channels, providing end-to-end technical support."
    ],
    stat: {
      value: "85%",
      description: "of clients require zero IT resources during integration"
    },
    example: {
      title: "CLIENT EXAMPLE",
      description: "Our healthcare client successfully integrated their AI agent with their existing patient portal in just 2 weeks."
    }
  },
  {
    title: "Training & Knowledge Transfer",
    description: "",
    bullets: [
      "Employee Onboarding: We train your team on using, managing, and interpreting AI outputs, so everyone feels confident.",
      "Live Testing & Tweaks: Before going live, we run extensive QA to ensure the AI meets real-world user expectations."
    ],
    stat: {
      value: "90%",
      description: "understanding after just one training session"
    },
    example: {
      title: "CLIENT EXAMPLE",
      description: "After training, staff at an insurance agency reduced manual inquiry handling by 45%."
    }
  },
  {
    title: "Continuous Optimization",
    description: "",
    bullets: [
      "Performance Monitoring: Using feedback loops and analytics, we identify improvement areas—like conversation accuracy or sentiment handling.",
      "Iterative Updates: Our ongoing maintenance ensures your AI agent evolves alongside your business, maintaining top-notch performance."
    ],
    stat: {
      value: "22%",
      description: "average improvement in AI performance after first optimization cycle"
    },
    example: {
      title: "CLIENT EXAMPLE",
      description: "Monthly optimizations helped a property management company increase their lead capture rate by 32%."
    }
  }
];

export const ProjectApproachSection = () => {
  return (
    <div id="project-approach-section" className="py-20 bg-gradient-to-b from-black to-[#1a1a1a]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Project-Based Approach
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#9b87f5] to-[#6342ff] mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We deliver AI solutions through a structured, transparent process designed for measurable results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10"
            >
              <h3 className="text-2xl font-bold text-white mb-6">{step.title}</h3>
              <ul className="space-y-4 mb-8">
                {step.bullets.map((bullet, i) => (
                  <li key={i} className="text-gray-300 flex items-start">
                    <span className="text-[#9b87f5] mr-3">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              
              <div className="bg-white/5 rounded-lg p-6 mb-6">
                <div className="text-[#9b87f5] text-3xl font-bold mb-2">
                  {step.stat.value}
                </div>
                <div className="text-gray-300">
                  {step.stat.description}
                </div>
              </div>

              <div className="bg-[#9b87f5]/10 rounded-lg p-6">
                <div className="text-[#9b87f5] font-semibold mb-2">
                  {step.example.title}
                </div>
                <div className="text-gray-300">
                  {step.example.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectApproachSection;
