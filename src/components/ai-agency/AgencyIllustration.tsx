
import { Brain, Cpu, Network, Code, Bot, Users, Database, Mail, Phone, MessageCircle, FileText, Workflow } from "lucide-react";
import { motion } from "framer-motion";

const AgencyIllustration = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto h-[400px] flex items-center justify-center mb-12">
      <div className="relative">
        {/* Central Platform */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-80 h-52 bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 rounded-lg backdrop-blur-sm border border-white/10 shadow-xl transform perspective-1000 rotateX-10"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Brain className="w-16 h-16 text-[#9b87f5] opacity-50" />
          </div>
        </motion.div>

        {/* Core Services (Original) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="absolute -top-8 -left-16 p-4 bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 rounded-lg backdrop-blur-sm border border-white/10"
        >
          <Cpu className="w-8 h-8 text-[#9b87f5]" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="absolute -top-8 -right-16 p-4 bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 rounded-lg backdrop-blur-sm border border-white/10"
        >
          <Network className="w-8 h-8 text-[#9b87f5]" />
        </motion.div>

        {/* Top Layer Additional Services */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="absolute -top-16 left-8 p-4 bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 rounded-lg backdrop-blur-sm border border-white/10"
        >
          <Mail className="w-8 h-8 text-[#9b87f5]" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute -top-16 right-8 p-4 bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 rounded-lg backdrop-blur-sm border border-white/10"
        >
          <Phone className="w-8 h-8 text-[#9b87f5]" />
        </motion.div>

        {/* Middle Layer Services */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="absolute top-12 -right-20 p-4 bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 rounded-lg backdrop-blur-sm border border-white/10"
        >
          <Code className="w-8 h-8 text-[#9b87f5]" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="absolute top-12 -left-20 p-4 bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 rounded-lg backdrop-blur-sm border border-white/10"
        >
          <Bot className="w-8 h-8 text-[#9b87f5]" />
        </motion.div>

        {/* Additional Middle Layer Services */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="absolute top-24 right-4 p-4 bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 rounded-lg backdrop-blur-sm border border-white/10"
        >
          <MessageCircle className="w-8 h-8 text-[#9b87f5]" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="absolute top-24 left-4 p-4 bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 rounded-lg backdrop-blur-sm border border-white/10"
        >
          <FileText className="w-8 h-8 text-[#9b87f5]" />
        </motion.div>

        {/* Bottom Layer Services */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="absolute -bottom-8 -left-16 p-4 bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 rounded-lg backdrop-blur-sm border border-white/10"
        >
          <Users className="w-8 h-8 text-[#9b87f5]" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="absolute -bottom-8 -right-16 p-4 bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 rounded-lg backdrop-blur-sm border border-white/10"
        >
          <Database className="w-8 h-8 text-[#9b87f5]" />
        </motion.div>

        {/* Additional Bottom Layer Services */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute -bottom-16 left-8 p-4 bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 rounded-lg backdrop-blur-sm border border-white/10"
        >
          <Workflow className="w-8 h-8 text-[#9b87f5]" />
        </motion.div>

        {/* Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
          {/* Original Lines */}
          <line x1="20%" y1="20%" x2="40%" y2="35%" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
          <line x1="80%" y1="20%" x2="60%" y2="35%" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
          <line x1="10%" y1="50%" x2="30%" y2="50%" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
          <line x1="90%" y1="50%" x2="70%" y2="50%" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
          <line x1="20%" y1="80%" x2="40%" y2="65%" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
          <line x1="80%" y1="80%" x2="60%" y2="65%" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
          
          {/* Additional Connecting Lines */}
          <line x1="35%" y1="10%" x2="45%" y2="30%" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
          <line x1="65%" y1="10%" x2="55%" y2="30%" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
          <line x1="35%" y1="90%" x2="45%" y2="70%" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
          <line x1="65%" y1="90%" x2="55%" y2="70%" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
        </svg>
      </div>
    </div>
  );
};

export default AgencyIllustration;
