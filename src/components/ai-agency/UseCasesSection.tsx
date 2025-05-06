import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Building2, ShieldCheck, Home, Box, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

interface UseCaseCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  demoLink: string;
  index: number;
}

const UseCaseCard = ({ icon, title, description, demoLink, index }: UseCaseCardProps) => {
  const isExternal = demoLink.startsWith('http');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="p-6 rounded-lg border border-white/10 hover:border-[#9b87f5]/30 transition-colors bg-white/5 backdrop-blur-sm group"
    >
      <div className="w-12 h-12 rounded-lg bg-[#9b87f5]/10 flex items-center justify-center mb-4 text-[#9b87f5] group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      {isExternal ? (
        <a 
          href={demoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-[#9b87f5] hover:text-[#8b77e5] font-medium"
        >
          See example →
        </a>
      ) : (
        <Link 
          to={demoLink}
          className="inline-flex items-center text-[#9b87f5] hover:text-[#8b77e5] font-medium"
        >
          See example →
        </Link>
      )}
    </motion.div>
  );
};

export const UseCasesSection = () => {
  const useCases = [
    {
      icon: <Car className="w-6 h-6" />,
      title: "Auto Dealerships",
      description: "Streamline vehicle inquiries and booking test drives with AI-powered conversations.",
      demoLink: "https://tacomamercedes.com/"
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Hotels & Hospitality",
      description: "Handle reservations and guest services 24/7 with personalized AI assistance.",
      demoLink: "/room-service"
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Insurance Firms",
      description: "Automate claims processing and policy inquiries for faster customer service.",
      demoLink: "/insurance"
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: "Real Estate Agencies",
      description: "Schedule property viewings and answer queries about listings instantly.",
      demoLink: "/real-estate"
    },
    {
      icon: <Box className="w-6 h-6" />,
      title: "Software as a Service",
      description: "Provide instant technical support and handle customer inquiries efficiently.",
      demoLink: "https://www.getvirtual.se"
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "Retail Stores",
      description: "Never miss a customer call again — even during peak hours.",
      demoLink: "/retail-services"
    }
  ];

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-[#6342ff] to-[#9b87f5] bg-clip-text text-transparent">
            AI Agent Use Cases
          </h2>
          <div className="h-1.5 w-64 mx-auto mt-2 bg-gradient-to-r from-[#6342ff] to-[#9b87f5] rounded-full opacity-75" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <UseCaseCard
              key={useCase.title}
              {...useCase}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
