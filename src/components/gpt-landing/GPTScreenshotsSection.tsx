
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { removeBackgroundAndColorize, loadImage } from "@/utils/imageProcessor";
import { useNavigate } from "react-router-dom";

interface GPTScreenshotsSectionProps {
  initialLoad: boolean;
}

export const GPTScreenshotsSection: React.FC<GPTScreenshotsSectionProps> = ({ initialLoad }) => {
  const navigate = useNavigate();
  const [processedImages, setProcessedImages] = React.useState<string[]>([
    "/lovable-uploads/242db4ad-39fc-4e58-8512-ef95edf5947c.png", // Updated Real Estate logo
    "/lovable-uploads/479993a0-28ec-4822-890d-a3763692122d.png", // Planter's Insurance logo
    "/lovable-uploads/32f9e4c1-c923-4a60-a49d-a838cedd2247.png"
  ]);

  React.useEffect(() => {
    const processImage = async (imageUrl: string, index: number) => {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const img = await loadImage(blob);
        const processedBlob = await removeBackgroundAndColorize(img, '#ffffff'); // White background
        const processedUrl = URL.createObjectURL(processedBlob);
        
        setProcessedImages(prev => {
          const newImages = [...prev];
          newImages[index] = processedUrl;
          return newImages;
        });
      } catch (error) {
        console.error(`Error processing image at index ${index}:`, error);
      }
    };

    processImage(processedImages[0], 0);
    processImage(processedImages[1], 1);
    processImage(processedImages[2], 2);
  }, []);

  const screenshots = [
    {
      image: processedImages[0],
      title: "Real Estate Agency",
      description: "Experience Voice AI in a real estate use case.",
      link: "/real-estate",
      hasBlackBackground: false // Changed to white background
    },
    {
      image: processedImages[1],
      title: "Planter's Insurance",
      description: "Experience how Voice AI Agents power an insurance use case.",
      link: "/insurance",
      hasBlackBackground: false
    },
    {
      image: processedImages[2],
      title: "Hotel & Hospitality",
      description: "Order Room Service from a Voice AI Agent.",
      link: "/room-service",
      hasBlackBackground: true
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
          <Card 
            key={index} 
            className="bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden hover:shadow-xl hover:shadow-[#9b87f5]/5 transition-all duration-300 cursor-pointer"
            onClick={() => screenshot.link && navigate(screenshot.link)}
          >
            <div className={`aspect-video overflow-hidden ${screenshot.hasBlackBackground ? 'bg-black' : ''}`}>
              <img 
                src={screenshot.image} 
                alt={screenshot.title} 
                className="w-full h-full object-contain transform hover:scale-105 transition-all duration-500"
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
