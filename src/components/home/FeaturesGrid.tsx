
import { Building2, Bot, Phone } from "lucide-react";

export const FeaturesGrid = () => {
  const features = [
    {
      icon: Building2,
      title: "Built for SMBs",
      description: "AI Agents tailored to businesses with 1 to 1,000 employees"
    },
    {
      icon: Bot,
      title: "Experts in AI Agents",
      description: "Deep mastery of automation agents for simple to the most complex tasks"
    },
    {
      icon: Phone,
      title: "Multi-Channel Agents",
      description: "Delivering agents for voice, email, SMS, Slack, chat, and document automation"
    }
  ];

  return (
    <div className="mt-2 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
      {features.map((feature, index) => (
        <div 
          key={index}
          className="glass-card p-6 rounded-xl text-center transform transition-transform duration-300 hover:scale-105"
        >
          <feature.icon className="w-12 h-12 mx-auto mb-4 text-accent" />
          <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
          <p className="text-gray-400">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};
