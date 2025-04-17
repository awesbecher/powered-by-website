
import React from "react";
import { Award, Clock, Settings, Users } from "lucide-react";

const ServicesGrid = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Why It Works</h2>
      
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
    </div>
  );
};

export default ServicesGrid;
