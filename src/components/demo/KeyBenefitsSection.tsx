
import { useState } from "react";
import { Brain, MessageSquare, AlarmCheck, Gauge } from "lucide-react";

interface BenefitCardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: string;
  iconColor: string;
  percentage: number;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  icon: Icon,
  title,
  description,
  color,
  iconColor,
  percentage
}) => {
  return (
    <div className={`relative overflow-hidden rounded-xl border border-white/10 p-6 ${color}`}>
      <div className="flex flex-col h-full">
        <div className={`p-3 rounded-lg ${iconColor} inline-flex w-fit mb-4`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-white/80 mb-4">{description}</p>
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-white/70">Impact</span>
            <span className="text-sm font-medium text-white/70">{percentage}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div className="bg-white h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const KeyBenefitsSection = () => {
  const benefits = [
    {
      icon: Brain,
      title: "Enhanced Customer Experience",
      description: "AI agents learn from interactions, providing increasingly personalized service.",
      color: "bg-gradient-to-br from-purple-900/50 to-indigo-900/50",
      iconColor: "bg-purple-700/60",
      percentage: 92
    },
    {
      icon: MessageSquare,
      title: "24/7 Availability",
      description: "Your AI assistants never sleep, ensuring customers receive help around the clock.",
      color: "bg-gradient-to-br from-blue-900/50 to-cyan-900/50",
      iconColor: "bg-blue-700/60",
      percentage: 85
    },
    {
      icon: AlarmCheck,
      title: "Rapid Response Times",
      description: "Instant answers to common questions and concerns without wait times.",
      color: "bg-gradient-to-br from-emerald-900/50 to-teal-900/50",
      iconColor: "bg-emerald-700/60",
      percentage: 78
    },
    {
      icon: Gauge,
      title: "Scalable Operations",
      description: "Handle thousands of simultaneous conversations without additional staffing.",
      color: "bg-gradient-to-br from-orange-900/50 to-amber-900/50",
      iconColor: "bg-orange-700/60",
      percentage: 88
    }
  ];

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Key Benefits</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our AI agent demos showcase the powerful advantages that can transform your business operations and customer experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              color={benefit.color}
              iconColor={benefit.iconColor}
              percentage={benefit.percentage}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyBenefitsSection;
