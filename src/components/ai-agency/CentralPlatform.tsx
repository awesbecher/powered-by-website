
import { motion } from "framer-motion";

export const CentralPlatform = () => {
  return (
    <motion.div 
      className="w-[150px] h-[150px] rounded-full bg-gradient-to-br from-[#9b87f5]/80 to-[#6342ff]/80 flex items-center justify-center z-10 relative"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2 
      }}
    >
      <div className="text-white text-center">
        <h3 className="font-bold text-lg mb-1">AI Agency</h3>
        <p className="text-xs opacity-80">Powering your business</p>
      </div>
      
      {/* Inner glow effect */}
      <div className="absolute inset-0 rounded-full bg-[#9b87f5]/30 blur-md z-[-1]"></div>
      
      {/* Pulse animation */}
      <motion.div 
        className="absolute inset-0 rounded-full border-2 border-[#9b87f5]/50 z-[-1]"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.7, 0.2, 0.7]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      ></motion.div>
    </motion.div>
  );
};
