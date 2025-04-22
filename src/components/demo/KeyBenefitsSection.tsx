
import React from 'react';
import { Check, CheckCircle, ShieldCheck } from 'lucide-react';
import { BenefitCard } from './benefits/BenefitCard';

interface BenefitCardProps {
  icon: React.ElementType;
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
      color: "green",
      iconColor: "#4ade80",
      percentage: 40,
    },
    {
      icon: ShieldCheck,
      title: "Enhanced Security",
      description: "Protect sensitive data with advanced encryption and access controls.",
      color: "blue",
      iconColor: "#60a5fa",
      percentage: 25,
    },
    {
      icon: Check,
      title: "Improved Accuracy",
      description: "Reduce errors and ensure consistent results with AI-powered automation.",
      color: "purple",
      iconColor: "#a8b",
      percentage: 35,
    },
  ];

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-8">Key Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  );
};
