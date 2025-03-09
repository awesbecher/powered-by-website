
import { LucideIcon, Sparkles, Zap, Star, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface FeaturedSolutionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
}

export const FeaturedSolutionCard = ({ title, description, icon: Icon, link }: FeaturedSolutionCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = () => {
    // Ensure the user is scrolled to the top of the page when navigating
    window.scrollTo(0, 0);
  };

  // Select appropriate accent icon based on title
  const getAccentIcon = () => {
    switch (title) {
      case "AI Voice Chat":
        return <Sparkles className={`w-8 h-8 transition-all duration-300 ${isHovered ? 'text-accent scale-110' : 'text-accent/70'}`} />;
      case "AI Receptionist":
        return <Zap className={`w-8 h-8 transition-all duration-300 ${isHovered ? 'text-accent scale-110' : 'text-accent/70'}`} />;
      case "Email Agent":
        return <Star className={`w-8 h-8 transition-all duration-300 ${isHovered ? 'text-accent scale-110' : 'text-accent/70'}`} />;
      case "Text Agent":
        return <Flame className={`w-8 h-8 transition-all duration-300 ${isHovered ? 'text-accent scale-110' : 'text-accent/70'}`} />;
      default:
        return <Sparkles className={`w-8 h-8 transition-all duration-300 ${isHovered ? 'text-accent scale-110' : 'text-accent/70'}`} />;
    }
  };

  return (
    <Link 
      to={link}
      className="group bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-white/10 hover:border-accent/50 transition-all duration-300 flex flex-col h-64"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start mb-4">
        <Icon className="w-8 h-8 text-accent" />
        {getAccentIcon()}
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      
      <p className="text-gray-300 mb-4 flex-grow">{description}</p>
      
      <div className="mt-auto">
        <span className="text-accent text-sm font-medium group-hover:underline">Learn more</span>
      </div>
    </Link>
  );
};
