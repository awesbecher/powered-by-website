
import { Phone, Mail, Smartphone, Settings, MessageSquare } from "lucide-react";

interface AgentTypeProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const AgentType = ({ title, description, icon }: AgentTypeProps) => (
  <div className="flex flex-col md:flex-row gap-8 py-8 border-t border-white/10">
    <div className="md:w-1/3 flex items-start gap-3">
      <div className="text-accent">{icon}</div>
      <h3 className="text-2xl font-bold text-white">{title}</h3>
    </div>
    <div className="md:w-2/3">
      <p className="text-gray-300 text-lg leading-relaxed">{description}</p>
    </div>
  </div>
);

export const AgentTypes = () => {
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
      description: "AI agents that act as virtual team members, helping coordinate tasks, tracking project milestones, and even sending timely reminders. These digital workers keep everyone on the same page, reducing communication gaps and facilitating smoother collaboration.",
      icon: <MessageSquare size={24} />
    },
    {
      title: "Website Chatbot Agents",
      description: "Our AI chatbots transform your website into an interactive engagement hub, guiding visitors, answering questions, and capturing key lead information. Beyond standard customer support, they provide personalized product recommendations or escalate complex queries to a human team member. Fast, intuitive, and available 24/7.",
      icon: <MessageSquare size={24} />
    },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-7xl mx-auto">
        {agentTypes.map((agent, index) => (
          <AgentType
            key={index}
            title={agent.title}
            description={agent.description}
            icon={agent.icon}
          />
        ))}
      </div>
    </div>
  );
};
