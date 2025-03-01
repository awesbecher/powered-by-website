
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
        Human-like Voice AI For Your Website
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<Mic className="w-10 h-10 text-[#9b87f5]" />}
          title="Natural Voice Interactions"
          description="AI agents that speak as human-like as possible and listen naturally, creating genuine conversations with your customers." 
        />
        <FeatureCard 
          icon={<Phone className="w-10 h-10 text-[#9b87f5]" />}
          title="Call Handling"
          description="Manage inbound calls, schedule appointments, qualify leads, and transfer to human agents when needed." 
        />
        <FeatureCard 
          icon={<MessageCircle className="w-10 h-10 text-[#9b87f5]" />}
          title="Omnichannel Support"
          description="Integrate voice AI with your existing chat, phone, and messaging platforms." 
        />
        <FeatureCard 
          icon={<Settings className="w-10 h-10 text-[#9b87f5]" />}
          title="Easy Setup"
          description="Simple integration with your website - no coding required. Be up and running quickly without disruption to your current website." 
        />
        <FeatureCard 
          icon={<Clock className="w-10 h-10 text-[#9b87f5]" />}
          title="24/7 Availability"
          description="Your AI voice assistant never sleeps, ensuring your customers get help anytime they need it." 
        />
        <FeatureCard 
          icon={<Shield className="w-10 h-10 text-[#9b87f5]" />}
          title="Data Security"
          description="Enterprise-grade security to protect customer conversations and sensitive information." 
        />
      </div>
    </section>
  );
};
