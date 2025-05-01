import React from 'react';
import Link from 'next/link';
import { cn } from "@/lib/utils";

interface FeaturedSolutionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  isExternal?: boolean;
  className?: string;
}

export const FeaturedSolutionCard = ({
  title,
  description,
  icon,
  link,
  isExternal = false,
  className
}: FeaturedSolutionCardProps) => {
  const CardContent = () => (
    <div className={cn("group relative flex flex-col h-full bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all", className)}>
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-300 mb-4 flex-grow">{description}</p>
      <div className="flex items-center text-white/80 group-hover:text-white transition-colors">
        Learn more
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
          className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </div>
    </div>
  );

  if (isExternal) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full">
        <CardContent />
      </a>
    );
  }

  return (
    <Link href={link} className="block h-full">
      <CardContent />
    </Link>
  );
};

export default FeaturedSolutionCard;
