import React from "react";
import { Mic, MessageSquare, Mail, Zap, User, Megaphone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface ChannelCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  isExternal?: boolean;
  index?: number;
}

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: index * 0.1,
      ease: [0.21, 1.11, 0.81, 0.99]
    }
  }),
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1
    }
  }
};

const ChannelCard = ({ icon, title, description, link, isExternal = false, index = 0 }: ChannelCardProps) => {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    if (isExternal) {
      window.open(link, "_blank", "noopener,noreferrer");
    } else {
      window.scrollTo(0, 0);
      navigate(link);
    }
  };

  return (
    <motion.div 
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      custom={index}
      onClick={handleCardClick}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 cursor-pointer"
    >
      <motion.div 
        className="bg-[#9b87f5]/30 w-12 h-12 rounded-full flex items-center justify-center mb-4"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.2 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      {isExternal ? (
        <motion.a 
          href={link} 
          className="text-[#9b87f5] flex items-center gap-2 group" 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          Visit site 
          <motion.span 
            className="text-lg transition-transform"
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            whileHover={{ x: 5 }}
          >
            →
          </motion.span>
        </motion.a>
      ) : (
        <motion.div
          className="text-[#9b87f5] flex items-center gap-2 group"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          <Link to={link} onClick={(e) => e.stopPropagation()}>
            Learn more
          </Link>
          <motion.span 
            className="text-lg transition-transform"
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            whileHover={{ x: 5 }}
          >
            →
          </motion.span>
        </motion.div>
      )}
    </motion.div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const MultiChannelSection = () => {
  return (
    <motion.div 
      className="mt-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.div 
        className="text-center max-w-3xl mx-auto mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Multi-Channel AI Agents
        </h2>
        <p className="text-xl text-gray-300">
          Our AI agents work across all your customer touchpoints, creating a seamless
          experience while reducing your workload.
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
      >
        <ChannelCard
          icon={<Mic className="h-6 w-6 text-[#9b87f5]" />}
          title="AI Voice Chat"
          description="Interactive voice AI that engages in natural conversations, answers questions, and provides assistance in real-time."
          link="/voice-chat"
          index={0}
        />
        
        <ChannelCard
          icon={<MessageSquare className="h-6 w-6 text-[#9b87f5]" />}
          title="AI Receptionist"
          description="Human-like voice agents that answer calls, schedule appointments, and handle customer inquiries 24/7."
          link="/ai-receptionist"
          index={1}
        />
        
        <ChannelCard
          icon={<Mail className="h-6 w-6 text-[#9b87f5]" />}
          title="Email Agent"
          description="Autonomous email communication that handles follow-ups, inquiries, and customer interactions intelligently."
          link="/email-agent"
          index={2}
        />
        
        <ChannelCard
          icon={<Zap className="h-6 w-6 text-[#9b87f5]" />}
          title="SMS-Text Agent"
          description="SMS-based AI that engages customers with intelligent conversations and provides instant responses."
          link="/text-agent"
          index={3}
        />
        
        <ChannelCard
          icon={<User className="h-6 w-6 text-[#9b87f5]" />}
          title="Virtual SE"
          description="AI-powered sales engineers that qualify leads, provide demos, and answer technical questions for your software product."
          link="https://www.getvirtual.se"
          isExternal={true}
          index={4}
        />
        
        <ChannelCard
          icon={<Megaphone className="h-6 w-6 text-[#9b87f5]" />}
          title="OutboundAI"
          description="Automated outbound calling solution that handles lead qualification, appointment setting, and follow-ups."
          link="https://tryoutbound.ai"
          isExternal={true}
          index={5}
        />
      </motion.div>
    </motion.div>
  );
};

export default MultiChannelSection;
