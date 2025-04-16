
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface FeaturedSolutionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  isExternal?: boolean;
}

export const FeaturedSolutionCard: React.FC<FeaturedSolutionCardProps> = ({
  title,
  description,
  icon: Icon,
  link,
  isExternal = false
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (!isExternal) {
      // For internal links, check if we should trigger Cal.com for "Get Started"
      if (title.includes("Voice Chat") || title.includes("Receptionist") || 
          title.includes("Email Agent") || title.includes("Text Agent")) {
        e.preventDefault();
        console.log(`Featured Solution Card "${title}" clicked, checking for Cal.com integration`);
        
        // Try to find and click the Cal.com button
        const calBtn = document.querySelector('[data-cal-link="team-powered-by-dfbtbb/get-started-today"]');
        if (calBtn instanceof HTMLElement) {
          console.log(`Cal.com button found from FeaturedSolutionCard ${title}, triggering click`);
          calBtn.click();
          return;
        } else {
          console.log(`Cal.com button not found from FeaturedSolutionCard ${title}, proceeding with navigation`);
        }
      }
    }
  };

  return (
    <Card className="bg-white/5 backdrop-filter backdrop-blur-sm border border-white/10 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="bg-accent/20 p-4 rounded-full mb-4">
            <Icon className="h-8 w-8 text-accent" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-400 mb-4">{description}</p>
          {isExternal ? (
            <a 
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-light font-semibold flex items-center mt-auto"
            >
              Learn More
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          ) : (
            <Link 
              to={link}
              onClick={handleClick}
              className="text-accent hover:text-accent-light font-semibold flex items-center mt-auto"
            >
              Learn More
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
