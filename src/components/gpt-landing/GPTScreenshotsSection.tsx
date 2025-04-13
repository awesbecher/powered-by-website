
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface GPTScreenshotsSectionProps {
  initialLoad: boolean;
}

export const GPTScreenshotsSection: React.FC<GPTScreenshotsSectionProps> = ({ initialLoad }) => {
  // We'll use placeholder screenshots until real ones are provided
  const screenshots = [
    {
      image: "/lovable-uploads/775c9836-f165-462f-ba92-71e5889ef819.png",
      title: "Real Estate Agency",
      description: "Experience Voice AI in a real estate use case."
    },
    {
      image: "/lovable-uploads/1a963891-b5e5-4c4c-85fd-e5ec489343bd.png",
      title: "Dynamic Conversation Flow",
      description: "Create natural conversation paths for your voice agent"
    },
    {
      image: "/lovable-uploads/a4604ec9-99e3-4930-918e-ee95e7e58d81.png",
      title: "Call Analytics Dashboard",
      description: "Monitor performance and optimize your voice agent"
    }
  ];

  return (
    <section className="py-16 px-4">
      <h2 className={`text-3xl sm:text-4xl font-bold text-white text-center mb-12 transition-all duration-1000 ease-out transform delay-400 ${
        initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
      }`}>
        See Our Voice AI Agents in Action Here:
      </h2>
      
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ease-out transform delay-500 ${
        initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
      }`}>
        {screenshots.map((screenshot, index) => (
          <Card key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden hover:shadow-xl hover:shadow-[#9b87f5]/5 transition-all duration-300">
            <div className="aspect-video overflow-hidden">
              <img 
                src={screenshot.image} 
                alt={screenshot.title} 
                className="w-full h-full object-cover transform hover:scale-105 transition-all duration-500"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="text-xl font-bold text-white mb-2">{screenshot.title}</h3>
              <p className="text-gray-400">{screenshot.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
