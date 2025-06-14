
import { Cpu, Network, Bot, Users, Database, FileText, Workflow, Settings } from "lucide-react";
import { motion } from "framer-motion";

export const ServiceIcons = () => {
  return (
    <>
      {/* Core Services */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="absolute -top-8 -left-16 p-4 bg-gradient-to-br from-[#9b87f5]/40 to-[#9b87f5]/60 rounded-lg backdrop-blur-sm border border-white/30"
      >
        <Cpu className="w-8 h-8 text-white" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute -top-8 -right-16 p-4 bg-gradient-to-br from-[#9b87f5]/40 to-[#9b87f5]/60 rounded-lg backdrop-blur-sm border border-white/30"
      >
        <Network className="w-8 h-8 text-white" />
      </motion.div>

      {/* Middle Layer Services */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute top-12 -right-20 p-4 bg-gradient-to-br from-[#9b87f5]/40 to-[#9b87f5]/60 rounded-lg backdrop-blur-sm border border-white/30"
      >
        <FileText className="w-8 h-8 text-white" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute top-12 -left-20 p-4 bg-gradient-to-br from-[#9b87f5]/40 to-[#9b87f5]/60 rounded-lg backdrop-blur-sm border border-white/30"
      >
        <Bot className="w-8 h-8 text-white" />
      </motion.div>

      {/* Bottom Layer Services */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        className="absolute -bottom-8 -left-16 p-4 bg-gradient-to-br from-[#9b87f5]/40 to-[#9b87f5]/60 rounded-lg backdrop-blur-sm border border-white/30"
      >
        <Users className="w-8 h-8 text-white" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="absolute -bottom-8 -right-16 p-4 bg-gradient-to-br from-[#9b87f5]/40 to-[#9b87f5]/60 rounded-lg backdrop-blur-sm border border-white/30"
      >
        <Database className="w-8 h-8 text-white" />
      </motion.div>

      {/* Bottom Process Icons */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute -bottom-16 left-8 p-4 bg-gradient-to-br from-[#9b87f5]/40 to-[#9b87f5]/60 rounded-lg backdrop-blur-sm border border-white/30"
      >
        <Workflow className="w-8 h-8 text-white" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        className="absolute -bottom-16 right-8 p-4 bg-gradient-to-br from-[#9b87f5]/40 to-[#9b87f5]/60 rounded-lg backdrop-blur-sm border border-white/30"
      >
        <Settings className="w-8 h-8 text-white" />
      </motion.div>
    </>
  );
};
