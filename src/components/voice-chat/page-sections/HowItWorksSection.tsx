
import React from "react";
import { Check, Headphones, MessageCircle, Database } from "lucide-react";

interface StepProps {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Step = ({ number, title, description, icon }: StepProps) => {
  return (
    <div className="relative flex flex-col items-center p-6 bg-[#1a1a24] rounded-xl border border-gray-800">
      <div className="absolute -top-5 w-10 h-10 rounded-full bg-[#9b87f5] flex items-center justify-center text-white font-bold">
        {number}
      </div>
      <div className="mt-4 mb-4 p-3 rounded-full bg-[#9b87f5]/10">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 text-center">{title}</h3>
      <p className="text-gray-400 text-center">{description}</p>
    </div>
  );
};

export const HowItWorksSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
        How AI Voice Chat Works
      </h2>
      
      {/* Process Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {/* Connecting line between steps (desktop only) */}
        <div className="hidden lg:block absolute top-1/4 left-[25%] w-[50%] h-0.5 bg-gradient-to-r from-[#9b87f5] to-[#6342ff]" />
        
        <Step 
          number="1"
          title="Install Widget"
          description="Add our voice chat widget to your website with a simple code snippet."
          icon={<Headphones className="w-8 h-8 text-[#9b87f5]" />}
        />
        
        <Step 
          number="2"
          title="Customer Engages"
          description="Visitors initiate voice conversations directly through their browser."
          icon={<MessageCircle className="w-8 h-8 text-[#9b87f5]" />}
        />
        
        <Step 
          number="3"
          title="AI Processes"
          description="Our AI understands context, answers questions and guides users."
          icon={<Check className="w-8 h-8 text-[#9b87f5]" />}
        />
        
        <Step 
          number="4"
          title="Data Captured"
          description="Customer information automatically syncs with your CRM system."
          icon={<Database className="w-8 h-8 text-[#9b87f5]" />}
        />
      </div>
      
      {/* Brief explanation */}
      <div className="mt-16 max-w-3xl mx-auto text-center">
        <p className="text-gray-300">
          Get up and running in minutes with our easy integration process. Our AI voice agents
          handle conversations 24/7, ensuring no customer inquiry goes unanswered while collecting
          valuable data for your business.
        </p>
      </div>
    </section>
  );
};
