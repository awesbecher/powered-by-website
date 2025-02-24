
import { Brain, Cpu, Network, Code, Bot, Users, Database, Lock } from "lucide-react";
import { motion } from "framer-motion";

const AgencyIllustration = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto h-[400px] flex items-center justify-center mb-12">
      <div className="relative">
        {/* Central Platform */}
        <div className="w-80 h-52 bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 rounded-lg backdrop-blur-sm border border-white/10 shadow-xl transform perspective-1000 rotateX-10">
          <div className="absolute inset-0 flex items-center justify-center">
            <Brain className="w-16 h-16 text-[#9b87f5] opacity-50" />
          </div>
        </div>

        {/* Surrounding Service Nodes */}
        <div className="absolute -top-8 -left-16 p-4 bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 rounded-lg backdrop-blur-sm border border-white/10">
          <Cpu className="w-8 h-8 text-[#9b87f5]" />
        </div>

        <div className="absolute -top-8 -right-16 p-4 bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 rounded-lg backdrop-blur-sm border border-white/10">
          <Network className="w-8 h-8 text-[#9b87f5]" />
        </div>

        <div className="absolute top-12 -right-20 p-4 bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 rounded-lg backdrop-blur-sm border border-white/10">
          <Code className="w-8 h-8 text-[#9b87f5]" />
        </div>

        <div className="absolute top-12 -left-20 p-4 bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 rounded-lg backdrop-blur-sm border border-white/10">
          <Bot className="w-8 h-8 text-[#9b87f5]" />
        </div>

        <div className="absolute -bottom-8 -left-16 p-4 bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 rounded-lg backdrop-blur-sm border border-white/10">
          <Users className="w-8 h-8 text-[#9b87f5]" />
        </div>

        <div className="absolute -bottom-8 -right-16 p-4 bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 rounded-lg backdrop-blur-sm border border-white/10">
          <Database className="w-8 h-8 text-[#9b87f5]" />
        </div>

        {/* Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
          {/* Lines connecting to central platform */}
          <line x1="20%" y1="20%" x2="40%" y2="35%" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
          <line x1="80%" y1="20%" x2="60%" y2="35%" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
          <line x1="10%" y1="50%" x2="30%" y2="50%" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
          <line x1="90%" y1="50%" x2="70%" y2="50%" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
          <line x1="20%" y1="80%" x2="40%" y2="65%" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
          <line x1="80%" y1="80%" x2="60%" y2="65%" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
        </svg>
      </div>
    </div>
  );
};

export default AgencyIllustration;
