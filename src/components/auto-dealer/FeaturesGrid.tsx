import React from 'react';
import { MessageSquare, Calendar, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: MessageSquare,
    title: "Inventory Chatbot",
    description: "AI-powered assistant that helps customers find their perfect vehicle, answers questions about specs, and provides real-time inventory information."
  },
  {
    icon: Calendar,
    title: "Appointment Scheduler",
    description: "Automated test drive and service appointment booking system that integrates with your dealership's calendar and sends smart reminders."
  },
  {
    icon: Bell,
    title: "Real-Time Price Alerts",
    description: "Intelligent price monitoring system that notifies customers when vehicles matching their criteria become available or when prices change."
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const FeaturesGrid = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl 
                  transform hover:-translate-y-1 transition-all duration-200 
                  border border-gray-100 hover:border-[#8B5CF6]/20"
              >
                <div className="mb-5">
                  <div className="inline-flex items-center justify-center p-3 
                    bg-[#8B5CF6]/10 rounded-xl">
                    <Icon className="h-7 w-7 text-[#8B5CF6]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 
                  group-hover:text-[#8B5CF6] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};
