
import { Mic, MessageCircle, Settings, Clock, Shield, Phone } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-[#1a1a24] p-6 rounded-xl border border-gray-800 hover:border-[#9b87f5]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#9b87f5]/10">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export const FeaturesSection = () => {
  return (
    <section className="py-2 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
        AI Voice Agents for Business Phone Systems
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<Phone className="w-10 h-10 text-[#9b87f5]" />}
          title="Call Center Automation"
          description="Handle high call volumes with AI agents that answer calls instantly, reducing wait times and improving customer satisfaction." 
        />
        <FeatureCard 
          icon={<Mic className="w-10 h-10 text-[#9b87f5]" />}
          title="Natural Voice Interactions"
          description="Our AI understands context, customer history, and can handle complex conversations with human-like understanding." 
        />
        <FeatureCard 
          icon={<MessageCircle className="w-10 h-10 text-[#9b87f5]" />}
          title="Multilingual Support"
          description="Serve customers in their preferred language with AI that speaks and understands multiple languages fluently." 
        />
        <FeatureCard 
          icon={<Settings className="w-10 h-10 text-[#9b87f5]" />}
          title="Easy Integration"
          description="Seamlessly connects with your existing phone systems and CRM software with minimal IT requirements." 
        />
        <FeatureCard 
          icon={<Clock className="w-10 h-10 text-[#9b87f5]" />}
          title="24/7 Availability"
          description="Never miss a customer call again with round-the-clock AI voice agents that never sleep or take breaks." 
        />
        <FeatureCard 
          icon={<Shield className="w-10 h-10 text-[#9b87f5]" />}
          title="HIPAA & PCI Compliant"
          description="Enterprise-grade security and compliance for industries with strict data protection requirements." 
        />
      </div>
    </section>
  );
};
