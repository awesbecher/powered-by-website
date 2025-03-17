
import { Brain, Mail, Phone, MessageCircle, FileText, ShoppingCart, Bot, File, Workflow } from "lucide-react";
import { motion } from "framer-motion";

export const CentralPlatform = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-80 h-52 bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 rounded-lg backdrop-blur-sm border border-white/10 shadow-xl transform perspective-1000 rotateX-10"
    >
      {/* Brain Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Brain className="w-16 h-16 text-[#39FF14] opacity-40" />
      </div>

      {/* File Icon to the left of brain */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute top-[35%] left-8 transform -translate-y-1/2 p-3 bg-gradient-to-br from-[#9b87f5]/30 to-[#9b87f5]/40 rounded-lg backdrop-blur-sm border border-white/20"
      >
        <File className="w-6 h-6 text-white" />
      </motion.div>

      {/* Workflow Icon to the right of brain */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute top-2/5 right-8 transform -translate-y-1/2 p-3 bg-gradient-to-br from-[#9b87f5]/30 to-[#9b87f5]/40 rounded-lg backdrop-blur-sm border border-white/20"
      >
        <Workflow className="w-6 h-6 text-white" />
      </motion.div>

      {/* Robot Icon at Top Center */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute top-4 left-1/2 transform -translate-x-1/2 p-3 bg-gradient-to-br from-[#9b87f5]/30 to-[#9b87f5]/40 rounded-lg backdrop-blur-sm border border-white/20"
      >
        <Bot className="w-6 h-6 text-white" />
      </motion.div>

      {/* Icons inside the brain box */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="absolute top-4 left-4 p-3 bg-gradient-to-br from-[#9b87f5]/30 to-[#9b87f5]/40 rounded-lg backdrop-blur-sm border border-white/20"
      >
        <Mail className="w-6 h-6 text-white" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute top-16 right-4 p-3 bg-gradient-to-br from-[#9b87f5]/30 to-[#9b87f5]/40 rounded-lg backdrop-blur-sm border border-white/20"
      >
        <Phone className="w-6 h-6 text-white" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute bottom-4 left-4 p-3 bg-gradient-to-br from-[#9b87f5]/30 to-[#9b87f5]/40 rounded-lg backdrop-blur-sm border border-white/20"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute bottom-4 right-4 p-3 bg-gradient-to-br from-[#9b87f5]/30 to-[#9b87f5]/40 rounded-lg backdrop-blur-sm border border-white/20"
      >
        <FileText className="w-6 h-6 text-white" />
      </motion.div>

      {/* Shopping Cart Icon moved down */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 bg-gradient-to-br from-[#9b87f5]/30 to-[#9b87f5]/40 rounded-lg backdrop-blur-sm border border-white/20"
      >
        <ShoppingCart className="w-6 h-6 text-white" />
      </motion.div>
    </motion.div>
  );
};
