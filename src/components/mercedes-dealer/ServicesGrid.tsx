import React, { useEffect } from "react";
import { Award, Clock, Settings, Users, MessageSquare, Calendar, Bell, ArrowRight } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";

const ServicesGrid = () => {
  // Initialize Cal.com
  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi();
        cal("ui", {
          theme: "dark",
          cssVarsPerTheme: {
            light: {"cal-brand": "#8B5CF6"},
            dark: {"cal-brand": "#8B5CF6"}
          },
          hideEventTypeDetails: false,
          layout: "column_view"
        });
      } catch (error) {
        console.error("Error initializing Cal.com in ServicesGrid:", error);
      }
    })();
  }, []);

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
              <Clock className="h-6 w-6 text-[#9b87f5]" />
            </div>
            <h3 className="text-xl font-semibold text-white">24/7 Support</h3>
          </div>
          <p className="text-white/70">Always available to handle inquiries, schedule appointments, and provide assistance.</p>
        </div>
        
        <div className="bg-[#1a0b2e]/40 rounded-xl p-6 border border-white/10">
          <div className="flex items-center mb-4">
            <div className="bg-[#9b87f5]/10 p-3 rounded-full mr-4">
              <Settings className="h-6 w-6 text-[#9b87f5]" />
            </div>
            <h3 className="text-xl font-semibold text-white">Easy Setup</h3>
          </div>
          <p className="text-white/70">Quick integration with your existing systems and workflows.</p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {features.map((feature, index) => (
          <div key={index} className="bg-[#1a0b2e]/40 rounded-xl p-6 border border-white/10">
            <div className="flex items-center mb-4">
              <div className="bg-[#9b87f5]/10 p-3 rounded-full mr-4">
                <feature.icon className="h-6 w-6 text-[#9b87f5]" />
              </div>
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
            </div>
            <p className="text-white/70 mb-4">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="mt-12 text-center">
        <button
          data-cal-link="team-powered-by-dfbtbb/get-started-today"
          data-cal-config='{"layout":"column_view","theme":"dark"}'
          className="inline-flex items-center px-6 py-3 text-base font-semibold text-white 
            bg-[#8B5CF6] rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 
            transform transition-all duration-200 ease-out"
        >
          Schedule a Demo
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ServicesGrid;
