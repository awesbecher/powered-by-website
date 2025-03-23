
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkTo: string;
}

export const FeatureCard = ({ icon, title, description, linkTo }: FeatureCardProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:transform hover:-translate-y-2">
      <div className="w-12 h-12 bg-gradient-to-br from-[#6342ff] to-[#a87cff] rounded-full flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-300 mb-4">
        {description}
      </p>
      <Link to={linkTo} className="text-[#9b87f5] hover:text-[#a87cff] inline-flex items-center">
        Learn more <ArrowRight className="ml-1 w-4 h-4" />
      </Link>
    </div>
  );
};
