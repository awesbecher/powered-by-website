
import React from "react";
import { Clock, Phone, Calendar, MessageSquare, ShieldCheck, Upload } from "lucide-react";

interface GPTFeaturesSectionProps {
  initialLoad: boolean;
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#9b87f5]/50 transition-all duration-300">
      <div className="text-[#9b87f5] mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export const GPTFeaturesSection: React.FC<GPTFeaturesSectionProps> = ({ initialLoad }) => {
  const features = [
    {
      icon: <Clock className="h-8 w-8" />,
      title: "24/7 Availability",
      description: "Your AI voice agent never sleeps, ensuring your clients get help anytime they need it."
    },
    {
      icon: <Phone className="h-8 w-8" />,
      title: "Call Handling",
      description: "Answers phone calls professionally, providing information and assistance to callers."
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Appointment Scheduling",
      description: "Books appointments and sends confirmation details to both clients and staff."
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "FAQ Management",
      description: "Handles common questions with accurate, consistent answers based on your knowledge base."
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "HIPAA Compliant",
      description: "Designed with healthcare privacy regulations in mind, ensuring patient data security."
    },
    {
      icon: <Upload className="h-8 w-8" />,
      title: "Easy Setup",
      description: "Upload a configuration file or answer questions to get your custom agent running quickly."
    }
  ];

  return (
    <section className="py-16 px-4">
      <h2 className={`text-3xl sm:text-4xl font-bold text-white text-center mb-12 transition-all duration-1000 ease-out transform delay-200 ${
        initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
      }`}>
        Build an Enterprise-Grade AI Voice Agent Today!
      </h2>
      
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 ease-out transform delay-300 ${
        initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
      }`}>
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
};

