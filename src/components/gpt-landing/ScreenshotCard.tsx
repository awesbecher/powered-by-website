
import React from "react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface ScreenshotCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
  gradientClass: string;
}

export const ScreenshotCard: React.FC<ScreenshotCardProps> = ({
  image,
  title,
  description,
  link,
  gradientClass,
}) => {
  const navigate = useNavigate();

  return (
    <div 
      className="group cursor-pointer transition-all duration-300 transform hover:translate-y-[-8px]"
      onClick={() => link && navigate(link)}
    >
      <Card className={`overflow-hidden h-full bg-gradient-to-br ${gradientClass} border-0 shadow-lg shadow-purple-900/20 hover:shadow-xl hover:shadow-purple-800/30`}>
        <div className="p-4 relative">
          {/* Light glow effect behind the logo for better visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50 rounded-t-lg"></div>
          
          {/* Logo container with glass effect for better visibility */}
          <div className="flex justify-center items-center h-32 relative z-10 mb-4 border-b border-[#9b87f5]/30 pb-4">
            <div className="w-3/4 h-full flex items-center justify-center px-4 py-2 backdrop-blur-sm bg-white/10 rounded-lg">
              <img 
                src={image} 
                alt={title} 
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
              />
            </div>
          </div>
          
          {/* Content with improved spacing and glow effects */}
          <div className="p-4">
            <h3 className="text-xl font-bold text-[#9b87f5] mb-3 group-hover:text-white transition-colors duration-300">{title}</h3>
            <p className="text-[#c4b8f0] font-medium text-sm leading-relaxed">{description}</p>
            
            {/* View demo button */}
            <div className="mt-4 pt-3 flex justify-end">
              <div className="inline-flex items-center text-sm font-medium text-[#9b87f5] group-hover:text-white transition-colors duration-300">
                View Demo
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
