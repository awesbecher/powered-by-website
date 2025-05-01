import React from "react";
import { Award, Clock, Settings, Users, MessageSquare, Calendar, Bell } from "lucide-react";

const ServicesGrid = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "Inventory Chatbot",
      description: "AI-powered assistant that helps customers find their perfect Mercedes vehicle, answers questions about specs, and provides real-time inventory information."
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

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Why It Works</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Service cards */}
        <div className="bg-[#1a0b2e]/40 rounded-xl p-6 border border-white/10">
          <div className="flex items-center mb-4">
            <div className="bg-[#9b87f5]/10 p-3 rounded-full mr-4">
              <Award className="h-6 w-6 text-[#9b87f5]" />
            </div>
            <h3 className="text-xl font-semibold text-white">Quality Service</h3>
          </div>
          <p className="text-white/70">Exceptional customer experience with every interaction, 24/7 availability.</p>
        </div>
        
        <div className="bg-[#1a0b2e]/40 rounded-xl p-6 border border-white/10">
          <div className="flex items-center mb-4">
            <div className="bg-[#9b87f5]/10 p-3 rounded-full mr-4">
              <Users className="h-6 w-6 text-[#9b87f5]" />
            </div>
            <h3 className="text-xl font-semibold text-white">Client Focused</h3>
          </div>
          <p className="text-white/70">Personalized approach to each customer inquiry, building lasting relationships.</p>
        </div>
        
        <div className="bg-[#1a0b2e]/40 rounded-xl p-6 border border-white/10">
          <div className="flex items-center mb-4">
            <div className="bg-[#9b87f5]/10 p-3 rounded-full mr-4">
              <Settings className="h-6 w-6 text-[#9b87f5]" />
            </div>
            <h3 className="text-xl font-semibold text-white">Trained for Dealerships</h3>
          </div>
          <p className="text-white/70">Custom AI solution specifically trained for automotive dealership operations and inquiries.</p>
        </div>
        
        <div className="bg-[#1a0b2e]/40 rounded-xl p-6 border border-white/10">
          <div className="flex items-center mb-4">
            <div className="bg-[#9b87f5]/10 p-3 rounded-full mr-4">
              <Clock className="h-6 w-6 text-[#9b87f5]" />
            </div>
            <h3 className="text-xl font-semibold text-white">Launch in 48 Hours</h3>
          </div>
          <p className="text-white/70">Quick implementation with minimal disruption to your dealership operations.</p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-white mb-6 text-center mt-12">Features</h2>

      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
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
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesGrid;
