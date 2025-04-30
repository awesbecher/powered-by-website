import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  iconColor: string;
  percentage: number;
}

export const BenefitCard = ({ 
  icon: Icon, 
  title, 
  description, 
  color, 
  iconColor, 
  percentage 
}: BenefitCardProps) => {
  return (
    <motion.div 
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { 
          opacity: 1, 
          y: 0, 
          transition: { 
            duration: 0.8,
            ease: [0.21, 1.11, 0.81, 0.99]
          } 
        }
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="relative bg-gradient-to-br from-gray-900 via-[#1a0f2e] to-[#1a0f2e] rounded-2xl border border-gray-800 p-8 hover:shadow-2xl hover:shadow-[#6342ff]/20 transition-all duration-300 group"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent to-[#6342ff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Icon Container */}
      <motion.div 
        className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-[#1a0f2e]/80 border border-gray-800/50 overflow-hidden"
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
      >
        {/* Icon Background Glow */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-transparent to-[#6342ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ 
            background: `radial-gradient(circle at center, ${iconColor}20 0%, transparent 70%)` 
          }} 
        />
        
        {/* Icon */}
        <Icon 
          className="h-8 w-8 relative z-10 transition-transform duration-300 group-hover:scale-110" 
          style={{ color: iconColor }} 
        />
      </motion.div>
      
      {/* Content */}
      <motion.h3 
        className="text-2xl font-bold mb-4 text-white group-hover:text-[#6342ff] transition-colors duration-300"
        variants={{
          hidden: { opacity: 0, x: -20 },
          show: { 
            opacity: 1, 
            x: 0,
            transition: { 
              delay: 0.1,
              duration: 0.6
            }
          }
        }}
      >
        {title}
      </motion.h3>
      
      <motion.p 
        className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300"
        variants={{
          hidden: { opacity: 0 },
          show: { 
            opacity: 1,
            transition: { 
              delay: 0.2,
              duration: 0.6
            }
          }
        }}
      >
        {description}
      </motion.p>
      
      {/* Progress Bar */}
      <motion.div 
        className="mt-6 pt-6 border-t border-gray-800"
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { 
            opacity: 1,
            y: 0,
            transition: { 
              delay: 0.3,
              duration: 0.6
            }
          }
        }}
      >
        <div className="flex items-center">
          <div className="w-full bg-gray-800/50 h-2 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div 
              className="bg-gradient-to-r from-[#6342ff] to-[#9b87f5] h-full rounded-full"
              initial={{ width: 0 }}
              whileInView={{ 
                width: `${percentage}%`,
                transition: {
                  duration: 1,
                  ease: "easeOut",
                  delay: 0.5
                }
              }}
              viewport={{ once: true }}
            />
          </div>
          <span className="ml-4 text-white font-bold group-hover:text-[#6342ff] transition-colors duration-300">
            {percentage}%
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};
