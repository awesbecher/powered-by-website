import React, { useState, useRef } from "react";
import { Phone, Mail, Smartphone, Settings, MessageSquare, Slack } from "lucide-react";
import { useInView } from "framer-motion";

interface AgentTypeProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const AgentType = ({ title, description, icon, index }: AgentTypeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div 
      ref={ref}
      className="flex flex-col md:flex-row gap-4 py-6 border-t border-white/10 transition-all duration-500 ease-out"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? `translateY(0)` : `translateY(20px)`,
        transitionDelay: `${index * 150}ms`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="md:w-[240px] flex-shrink-0 flex items-start gap-3 transition-all duration-300 ease-out">
        <div className={`text-accent transition-all duration-300 ${isHovered ? 'scale-110 text-[#9b87f5]' : ''}`}>
          {icon}
        </div>
        <h3 className={`text-lg font-bold text-white whitespace-nowrap transition-all duration-300 ${isHovered ? 'text-[#9b87f5]' : ''}`}>
          {title}
        </h3>
      </div>
      <div className="flex-1 md:pl-16 relative overflow-hidden">
        <p 
          className={`text-gray-300 text-base leading-relaxed transition-all duration-500 ease-out
            ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-0 opacity-80'}`}
        >
          {description}
        </p>
        {isHovered && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#9b87f5] to-transparent transform animate-pulse" />
        )}
      </div>
    </div>
  );
};

export const AgentTypes = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  const agentTypes = [
    {
      title: "Voice Agents",
      description: "Remarkably human-like agents that handle both incoming and outgoing calls with smart intelligence & a personable touch. They can qualify leads, provide quick answers, schedule appointments, & even make outgoing calls to drive new sales efforts.",
      icon: <Phone size={24} />
    },
    {
      title: "Email & Text Agents",
      description: "Automate emails and SMS texts with customers or internal teams with a personal touch that feels genuine. These agents respond instantly to common inquiries, assist with order updates, and even follow up on leads. Their capacity for real-time, context-aware communication astonishes.",
      icon: <div className="flex gap-1"><Mail size={24} /><Smartphone size={24} /></div>
    },
    {
      title: "Internal Workflow Agents",
      description: "Streamline your back-end processes with agents designed to automate repetitive tasks and gather critical data. Whether it's coordinating employee schedules, managing approvals, or updating internal databases, accelerate routine workflows to keep your operations efficient.",
      icon: <Settings size={24} />
    },
    {
      title: "Team Collaboration Agents",
      description: "AI agents that act as virtual team members, helping coordinate tasks, track project milestones, and even send timely reminders. These digital workers keep everyone on the same page, reducing communication gaps and facilitating smoother collaboration.",
      icon: <Slack size={24} />
    },
    {
      title: "Website Chatbot Agents",
      description: "Our AI chatbots transform your website into an interactive engagement hub, guiding visitors, answering questions, and capturing key lead information. Beyond standard customer support, they provide personalized product recommendations or escalate complex queries to a human team member. Fast, intuitive, and available 24/7.",
      icon: <MessageSquare size={24} />
    },
  ];

  return (
    <div 
      id="agent-types-section" 
      className="container mx-auto px-4 transition-all duration-700 ease-out"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(40px)'
      }}
      ref={sectionRef}
    >
      <div className="max-w-5xl mx-auto">
        {agentTypes.map((agent, index) => (
          <AgentType
            key={index}
            title={agent.title}
            description={agent.description}
            icon={agent.icon}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};
