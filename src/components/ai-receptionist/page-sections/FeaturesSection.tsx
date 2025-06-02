import React from 'react';
import { Calendar, Phone, MessageCircle } from "lucide-react";

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
    <section className="py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
        Remarkably Human-like AI Receptionists for SMBs
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<Calendar className="w-10 h-10 text-[#9b87f5]" />}
          title="Automate Bookings & Reservations"
          description="Restaurants, salons, and service businesses can schedule appointments with zero hassle, eliminating scheduling conflicts." 
        />
        
        <FeatureCard 
          icon={<Phone className="w-10 h-10 text-[#9b87f5]" />}
          title="Inbound Call Automation"
          description="Handle high call volumes effortlessly with AI agents that answer calls instantly, reducing wait times and improving customer satisfaction." 
        />
        
        <FeatureCard 
          icon={<MessageCircle className="w-10 h-10 text-[#9b87f5]" />}
          title="Answer Customer Questions"
          description="From product details to pricing, your AI receptionist has the answers to common questions, providing immediate assistance 24/7." 
        />
      </div>
    </section>
  );
};
