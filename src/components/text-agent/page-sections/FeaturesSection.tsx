
import { MessageCircle, MessageSquare, Settings, Clock, Shield, Calendar, Users, Database, Reply } from "lucide-react";

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
    <section className="py-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
        Autonomous AI Text Agents for Your Business
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<MessageCircle className="w-10 h-10 text-[#9b87f5]" />}
          title="Automated Text Campaigns"
          description="Deploy personalized text campaigns and follow-ups with intelligent responses based on customer interactions." 
        />
        <FeatureCard 
          icon={<Reply className="w-10 h-10 text-[#9b87f5]" />}
          title="Smart Reply System"
          description="Automatically reply to customer SMS with accurate information based on your business knowledge base & privacy standards." 
        />
        <FeatureCard 
          icon={<Calendar className="w-10 h-10 text-[#9b87f5]" />}
          title="Appointment Management"
          description="Schedule, confirm, and send reminders for appointments via text messaging based on calendar availability." 
        />
        <FeatureCard 
          icon={<MessageSquare className="w-10 h-10 text-[#9b87f5]" />}
          title="Conversation History"
          description="Maintain complete conversation history to provide context-aware responses over extended customer interactions." 
        />
        <FeatureCard 
          icon={<Database className="w-10 h-10 text-[#9b87f5]" />}
          title="CRM Integration"
          description="Seamlessly connect with your existing CRM to track customer interactions and update contact records automatically." 
        />
        <FeatureCard 
          icon={<Shield className="w-10 h-10 text-[#9b87f5]" />}
          title="Enterprise-Grade Security"
          description="All text communications are processed with enterprise-level security protocols and compliance with messaging regulations." 
        />
      </div>
    </section>
  );
};
