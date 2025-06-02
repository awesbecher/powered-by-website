import React from 'react';
import { 
  Building, MessageCircle, ShoppingBag, User, 
  Target, Mic, FileText, Shield, Lock, 
  Activity, Database
} from "lucide-react";

interface SetupStepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const SetupStep = ({ number, title, description, icon }: SetupStepProps) => (
  <div className="relative flex gap-6 pb-6 group">
    {/* Left timeline with icon */}
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-purple-400 bg-[#2a1c42] text-purple-400 z-10">
        {icon}
      </div>
      {number < 11 && (
        <div className="w-0.5 h-full bg-purple-500/50 mt-2 -mb-6" />
      )}
    </div>
    
    {/* Content */}
    <div className="pt-1">
      <h3 className="text-2xl font-medium text-purple-400 mb-1">
        Step {number}: {title}
      </h3>
      <p className="text-gray-300 text-base leading-relaxed">{description}</p>
    </div>
  </div>
);

export const SetupSteps = () => {
  return (
    <div className="space-y-2 px-4 py-6 bg-[#1a0b2e]/90 rounded-xl max-h-[680px] overflow-y-auto">
      <SetupStep 
        number={1}
        title="Basic Info" 
        icon={<Building className="w-6 h-6" />}
        description="Business name, industry, location, hours."
      />
      
      <SetupStep 
        number={2}
        title="Voice AI Agent Greeting" 
        icon={<MessageCircle className="w-6 h-6" />}
        description="How the AI agent greets callers, what information they collect from customers."
      />
      
      <SetupStep 
        number={3}
        title="Products & Services" 
        icon={<ShoppingBag className="w-6 h-6" />}
        description="What products/services you offer, any special promotions, key differentiators."
      />
      
      <SetupStep 
        number={4}
        title="Customer Profile & Common Questions" 
        icon={<User className="w-6 h-6" />}
        description="Target customer or audience, typical FAQs, main pain points."
      />
      
      <SetupStep 
        number={5}
        title="Voice Agent Goals" 
        icon={<Target className="w-6 h-6" />}
        description="Main objective, desired workflows, success outcomes."
      />
      
      <SetupStep 
        number={6}
        title="Brand Voice & Style" 
        icon={<Mic className="w-6 h-6" />}
        description="Tone, phrases, brand guidelines."
      />
      
      <SetupStep 
        number={7}
        title="Knowledge Base & FAQs" 
        icon={<FileText className="w-6 h-6" />}
        description="Links to or uploads of essential content."
      />
      
      <SetupStep 
        number={8}
        title="Escalation & Compliance" 
        icon={<Shield className="w-6 h-6" />}
        description="Hand-off triggers, disclaimers, data policies."
      />
      
      <SetupStep 
        number={9}
        title="Security, Legal, & Compliance" 
        icon={<Lock className="w-6 h-6" />}
        description="Security protocols, legal requirements, and compliance standards."
      />
      
      <SetupStep 
        number={10}
        title="Performance & Testing" 
        icon={<Activity className="w-6 h-6" />}
        description="KPIs, approval workflow, pilot or full launch."
      />
      
      <SetupStep 
        number={11}
        title="Collected Customer Information" 
        icon={<Database className="w-6 h-6" />}
        description="Management and handling of collected customer data."
      />
    </div>
  );
};
