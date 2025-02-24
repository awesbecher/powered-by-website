import { Brain, Cpu, Network, Bot, Users, Database, Mail, Phone, MessageCircle, FileText, Workflow, Settings, ShoppingCart } from "lucide-react";
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
          {/* Brain Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Brain className="w-16 h-16 text-[#9b87f5] opacity-30" />
          </div>

          {/* Icons inside the brain box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute top-4 left-4 p-3 bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 rounded-lg backdrop-blur-sm border border-white/10"
          >
            <Mail className="w-6 h-6 text-[#9b87f5]" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute top-4 right-4 p-3 bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 rounded-lg backdrop-blur-sm border border-white/10"
          >
            <Phone className="w-6 h-6 text-[#9b87f5]" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute bottom-4 left-4 p-3 bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 rounded-lg backdrop-blur-sm border border-white/10"
          >
            <MessageCircle className="w-6 h-6 text-[#9b87f5]" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="absolute bottom-4 right-4 p-3 bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 rounded-lg backdrop-blur-sm border border-white/10"
          >
            <FileText className="w-6 h-6 text-[#9b87f5]" />
          </motion.div>
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

        {/* Bottom Process Icon */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute -bottom-16 left-8 p-4 bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 rounded-lg backdrop-blur-sm border border-white/10"
        >
          <Workflow className="w-8 h-8 text-[#9b87f5]" />
        </motion.div>

        {/* New Icons */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="absolute -bottom-16 right-8 p-4 bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 rounded-lg backdrop-blur-sm border border-white/10"
        >
          <Settings className="w-8 h-8 text-[#9b87f5]" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 p-4 bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 rounded-lg backdrop-blur-sm border border-white/10"
        >
          <ShoppingCart className="w-8 h-8 text-[#9b87f5]" />
        </motion.div>

        {/* Animated Dots and Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
          {/* Animated Dots */}
          <circle className="animate-pulse" r="3" fill="#4ade80">
            <animateMotion
              path="M 160,100 L 80,50"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle className="animate-pulse" r="3" fill="#4ade80">
            <animateMotion
              path="M 160,100 L 240,50"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle className="animate-pulse" r="3" fill="#4ade80">
            <animateMotion
              path="M 160,100 L 260,100"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </circle>
          <circle className="animate-pulse" r="3" fill="#4ade80">
            <animateMotion
              path="M 160,100 L 60,100"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </circle>
          <circle className="animate-pulse" r="3" fill="#4ade80">
            <animateMotion
              path="M 160,100 L 240,150"
              dur="2.2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle className="animate-pulse" r="3" fill="#4ade80">
            <animateMotion
              path="M 160,100 L 80,150"
              dur="2.2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle className="animate-pulse" r="3" fill="#4ade80">
            <animateMotion
              path="M 160,100 L 160,180"
              dur="2.4s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Hash Lines */}
          <line x1="160" y1="100" x2="80" y2="50" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" className="animate-dash">
            <animate attributeName="stroke-dashoffset" from="0" to="16" dur="1s" repeatCount="indefinite" />
          </line>
          <line x1="160" y1="100" x2="240" y2="50" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" className="animate-dash">
            <animate attributeName="stroke-dashoffset" from="0" to="16" dur="1s" repeatCount="indefinite" />
          </line>
          <line x1="160" y1="100" x2="260" y2="100" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" className="animate-dash">
            <animate attributeName="stroke-dashoffset" from="0" to="16" dur="1s" repeatCount="indefinite" />
          </line>
          <line x1="160" y1="100" x2="60" y2="100" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" className="animate-dash">
            <animate attributeName="stroke-dashoffset" from="0" to="16" dur="1s" repeatCount="indefinite" />
          </line>
          <line x1="160" y1="100" x2="240" y2="150" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" className="animate-dash">
            <animate attributeName="stroke-dashoffset" from="0" to="16" dur="1s" repeatCount="indefinite" />
          </line>
          <line x1="160" y1="100" x2="80" y2="150" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" className="animate-dash">
            <animate attributeName="stroke-dashoffset" from="0" to="16" dur="1s" repeatCount="indefinite" />
          </line>
          <line x1="160" y1="100" x2="160" y2="180" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" className="animate-dash">
            <animate attributeName="stroke-dashoffset" from="0" to="16" dur="1s" repeatCount="indefinite" />
          </line>
        </svg>
      </div>
    </div>
  );
};

export default AgencyIllustration;
