
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Car, MessageSquare, Shield, Home, BedDouble, Settings } from "lucide-react";

export const UseCaseGrid = () => {
  const navigate = useNavigate();
  
  const useCases = [
    {
      title: "Auto",
      icon: <Car className="w-8 h-8 text-[#9b87f5] mb-2" />,
      description: "Schedule test drives and follow up with leads for dealerships",
      link: "/products"
    },
    {
      title: "SaaS",
      icon: <MessageSquare className="w-8 h-8 text-[#9b87f5] mb-2" />,
      description: "Handle customer support and onboarding for software companies",
      link: "/products"
    },
    {
      title: "Insurance",
      icon: <Shield className="w-8 h-8 text-[#9b87f5] mb-2" />,
      description: "Qualify leads and explain policies for insurance agencies",
      link: "/products"
    },
    {
      title: "Real Estate",
      icon: <Home className="w-8 h-8 text-[#9b87f5] mb-2" />,
      description: "Schedule viewings and qualify buyers for real estate agents",
      link: "/products"
    },
    {
      title: "Hospitality",
      icon: <BedDouble className="w-8 h-8 text-[#9b87f5] mb-2" />,
      description: "Handle reservations and guest services for hotels",
      link: "/products"
    },
    {
      title: "Custom",
      icon: <Settings className="w-8 h-8 text-[#9b87f5] mb-2" />,
      description: "Build tailored AI solutions for your unique business needs",
      link: "/contact"
    }
  ];

  return (
    <section className="py-20 px-4" id="agent-types-section">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold text-white mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          AI Agents for Every Industry
          <br />
          <span className="text-base font-normal text-gray-400">
            Discover how our custom AI agents can transform your business operations.
          </span>
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div 
              key={index}
              className="glass-card p-8 rounded-2xl cursor-pointer hover:border-[#9b87f5]/40 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => navigate(useCase.link)}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-[#9b87f5]/10">
                  {useCase.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{useCase.title}</h3>
                <p className="text-gray-400">{useCase.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
