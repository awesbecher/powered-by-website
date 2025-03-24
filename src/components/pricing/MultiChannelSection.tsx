import React from "react";
import { Mic, MessageSquare, Mail, Zap, User, Megaphone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface ChannelCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

const ChannelCard = ({ icon, title, description, link }: ChannelCardProps) => {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    // Ensure smooth navigation and scroll to top
    window.scrollTo(0, 0);
    navigate(link);
  };

  return (
    <div 
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-300 hover:bg-white/10 hover:transform hover:-translate-y-2 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="bg-[#9b87f5]/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      <Link to={link} className="text-[#9b87f5] flex items-center gap-2 hover:underline" onClick={(e) => e.stopPropagation()}>
        Learn more <span className="text-lg">→</span>
      </Link>
    </div>
  );
};

const MultiChannelSection = () => {
  return (
    <div className="mt-24">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Multi-Channel AI Agents
        </h2>
        <p className="text-xl text-gray-300">
          Our AI agents work across all your customer touchpoints, creating a seamless
          experience while reducing your workload.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ChannelCard
          icon={<Mic className="h-6 w-6 text-[#9b87f5]" />}
          title="AI Voice Chat"
          description="Interactive voice AI that engages in natural conversations, answers questions, and provides assistance in real-time."
          link="/voice-chat"
        />
        
        <ChannelCard
          icon={<MessageSquare className="h-6 w-6 text-[#9b87f5]" />}
          title="AI Receptionist"
          description="Human-like voice agents that answer calls, schedule appointments, and handle customer inquiries 24/7."
          link="/ai-receptionist"
        />
        
        <ChannelCard
          icon={<Mail className="h-6 w-6 text-[#9b87f5]" />}
          title="Email Agent"
          description="Autonomous email communication that handles follow-ups, inquiries, and customer interactions intelligently."
          link="/email-agent"
        />
        
        <ChannelCard
          icon={<Zap className="h-6 w-6 text-[#9b87f5]" />}
          title="Text Agent"
          description="SMS-based AI that engages customers with intelligent conversations and provides instant responses."
          link="/text-agent"
        />
        
        <ChannelCard
          icon={<User className="h-6 w-6 text-[#9b87f5]" />}
          title="Virtual SE"
          description="AI-powered sales engineers that qualify leads, provide demos, and answer technical questions for your software product."
          link="/virtual-se"
        />
        
        <ChannelCard
          icon={<Megaphone className="h-6 w-6 text-[#9b87f5]" />}
          title="OutboundAI"
          description="Proactive AI agents that reach out to prospects, follow up with leads, and nurture customer relationships."
          link="/outbound-ai"
        />
      </div>
    </div>
  );
};

export default MultiChannelSection;
