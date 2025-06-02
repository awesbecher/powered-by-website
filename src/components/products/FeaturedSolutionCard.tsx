import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface FeaturedSolutionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  isExternal?: boolean;
  className?: string;
}

export const FeaturedSolutionCard = ({
  title,
  description,
  icon: Icon,
  link,
  isExternal = false,
  className,
}: FeaturedSolutionCardProps) => {
  const CardContent = () => (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-start">
        <div className="bg-gradient-to-br from-accent to-accent/60 p-3 rounded-lg shadow-lg shadow-accent/20">
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      <h3 className="text-xl font-bold text-white mt-4">{title}</h3>
      <p className="text-gray-300 mt-2 flex-grow">{description}</p>
      
      <motion.div 
        className="mt-6"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center text-white font-bold">
          <span>Learn more</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </motion.div>
    </div>
  );

  return (
    <motion.div
      id="featured-solutions"
      className={cn(
        "relative overflow-hidden rounded-xl h-full bg-gradient-to-b from-white/5 to-transparent border border-white/10 shadow-xl shadow-accent/5",
        "hover:border-accent/30 transition-all duration-300",
        className
      )}
      whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(155, 135, 245, 0.1), 0 10px 10px -5px rgba(155, 135, 245, 0.04)' }}
      transition={{ duration: 0.3 }}
    >
      {isExternal ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full"
        >
          <CardContent />
        </a>
      ) : (
        <Link to={link} className="block h-full">
          <CardContent />
        </Link>
      )}

      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
    </motion.div>
  );
};
