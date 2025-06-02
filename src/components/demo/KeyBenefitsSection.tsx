import React from 'react';
import { Check, CheckCircle, ShieldCheck, LucideIcon } from 'lucide-react';
import { BenefitCard } from './benefits/BenefitCard';
import { motion } from 'framer-motion';

interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  iconColor: string;
  percentage: number;
}

export const KeyBenefitsSection: React.FC = () => {
  const benefits: BenefitCardProps[] = [
    {
      icon: CheckCircle,
      title: "Increased Efficiency",
      description: "Automate routine tasks and free up your team to focus on more complex issues.",
      color: "bg-[#1a0f2e]/50",
      iconColor: "#4ade80",
      percentage: 40,
    },
    {
      icon: ShieldCheck,
      title: "Enhanced Security",
      description: "Protect sensitive data with advanced encryption and access controls.",
      color: "bg-[#1a0f2e]/50",
      iconColor: "#60a5fa",
      percentage: 25,
    },
    {
      icon: Check,
      title: "Improved Accuracy",
      description: "Reduce errors and ensure consistent results with AI-powered automation.",
      color: "bg-[#1a0f2e]/50",
      iconColor: "#a855f7",
      percentage: 35,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[#6342ff]/5 blur-[120px] transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#9b87f5]/5 blur-[100px] transform -translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Content */}
      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.21, 1.11, 0.81, 0.99] }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Key Benefits</h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            Discover how our AI-powered solutions can transform your business operations
            and drive success through automation and innovation.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
