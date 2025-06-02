
import React from 'react';
import { Headset, MessageSquare, Mail, Phone, CalendarClock, ShieldCheck } from "lucide-react";

interface AgentTypeProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  index: number;
}

const AgentType: React.FC<AgentTypeProps> = ({ title, description, icon: Icon, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`flex flex-col md:flex-row items-center gap-6 p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/10 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
      <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-[#7c3aed]/30 to-[#6342ff]/30 rounded-xl flex items-center justify-center">
        <Icon className="w-8 h-8 text-[#9b87f5]" />
      </div>
      
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export const AgentTypes = () => {
  const agents = [
    {
      title: "Voice Agents",
      description: "Humanlike AI agents that answer phone calls, take appointments, and handle customer inquiries 24/7.",
      icon: Headset
    },
    {
      title: "Chat Agents",
      description: "Website chat agents that engage visitors, answer questions, and convert prospects into customers.",
      icon: MessageSquare
    },
    {
      title: "Email Agents",
      description: "AI email assistants that process, categorize, and respond to incoming emails without human intervention.",
      icon: Mail
    },
    {
      title: "SMS Agents",
      description: "Text messaging agents that handle appointment scheduling, reminders, and customer support via SMS.",
      icon: Phone
    },
    {
      title: "Scheduling Agents",
      description: "Specialized agents that manage your calendar, book meetings, and send automated reminders.",
      icon: CalendarClock
    },
    {
      title: "HIPAA-Compliant Agents",
      description: "Secure AI assistants designed for healthcare organizations with PHI protection built-in.",
      icon: ShieldCheck
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">Our Agent Types</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We offer specialized AI agents designed for different communication channels and business needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {agents.map((agent, index) => (
            <AgentType
              title={agent.title}
              description={agent.description}
              icon={agent.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentTypes;
