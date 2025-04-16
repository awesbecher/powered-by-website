
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
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
      }}
      className="bg-gradient-to-br from-gray-900 to-[#1a0f2e] rounded-2xl border border-gray-800 p-8 hover:shadow-2xl hover:shadow-[#6342ff]/10 transition-all duration-300 hover:-translate-y-1"
    >
      <div className={`${color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
        <Icon className={`h-8 w-8 ${iconColor}`} />
      </div>
      
      <h3 className="text-2xl font-bold mb-4 text-white">
        {title}
      </h3>
      
      <p className="text-gray-300">
        {description}
      </p>
      
      <div className="mt-6 pt-6 border-t border-gray-800">
        <div className="flex items-center">
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#6342ff] to-[#9b87f5] h-full rounded-full"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <span className="ml-4 text-white font-bold">
            {percentage}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};
