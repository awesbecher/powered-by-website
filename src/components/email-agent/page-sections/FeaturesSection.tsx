
import { Mail, MessageCircle, Settings, Clock, Shield, FileText, CalendarCheck, Users, Database, Reply } from "lucide-react";

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
        Autonomous AI Email Agents for Your Business
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<Mail className="w-10 h-10 text-[#9b87f5]" />}
          title="Automated Follow-ups"
          description="Send personalized follow-up emails after customer calls with summaries, next steps, and relevant information and documents." 
        />
        <FeatureCard 
          icon={<Reply className="w-10 h-10 text-[#9b87f5]" />}
          title="Super Intelligent & Privacy Compliant"
          description="Automatically reply to customer inquiries with accurate information based on your business knowledge base & privacy standards." 
        />
        <FeatureCard 
          icon={<CalendarCheck className="w-10 h-10 text-[#9b87f5]" />}
          title="Meeting Coordination"
          description="Autonomously schedule, confirm, and send reminders for meetings based on calendar availability." 
        />
        <FeatureCard 
          icon={<FileText className="w-10 h-10 text-[#9b87f5]" />}
          title="Document Preparation"
          description="Generate and attach relevant documents and resources to outgoing emails based on customer needs." 
        />
        <FeatureCard 
          icon={<Database className="w-10 h-10 text-[#9b87f5]" />}
          title="CRM Integration"
          description="Seamlessly connect with your existing CRM to track customer interactions and update contact records automatically." 
        />
        <FeatureCard 
          icon={<Shield className="w-10 h-10 text-[#9b87f5]" />}
          title="Enterprise-Grade Security"
          description="All email communications are encrypted and processed with enterprise-level security protocols and compliance." 
        />
      </div>
    </section>
  );
};
