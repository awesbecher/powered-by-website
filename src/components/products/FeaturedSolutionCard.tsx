
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

interface FeaturedSolutionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
}

export const FeaturedSolutionCard = ({ title, description, icon: Icon, link }: FeaturedSolutionCardProps) => {
  const handleClick = () => {
    // Ensure the user is scrolled to the top of the page when navigating
    window.scrollTo(0, 0);
  };

  return (
    <Link 
      to={link}
      className="group bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-white/10 hover:border-accent/50 transition-all duration-300 flex flex-col h-64"
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-4">
        <Icon className="w-8 h-8 text-accent" />
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6342ff] to-[#9b87f5] opacity-20 group-hover:opacity-40 transition-opacity" />
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      
      <p className="text-gray-300 mb-4 flex-grow">{description}</p>
      
      <div className="mt-auto">
        <span className="text-accent text-sm font-medium group-hover:underline">Learn more</span>
      </div>
    </Link>
  );
};
