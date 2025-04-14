
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { removeBackgroundAndColorize, loadImage } from "@/utils/imageProcessor";
import { useNavigate } from "react-router-dom";
import { Users, Rocket, Handshake } from "lucide-react";
import { InfoCard } from "@/components/ai-agency/InfoCard";

interface GPTScreenshotsSectionProps {
  initialLoad: boolean;
}

export const GPTScreenshotsSection: React.FC<GPTScreenshotsSectionProps> = ({ initialLoad }) => {
  const navigate = useNavigate();
  const [processedImages, setProcessedImages] = React.useState<string[]>([
    "/lovable-uploads/5304586a-4dc1-4e19-bcaa-8ddc0a81b38c.png", // Township Real Estate logo
    "/lovable-uploads/479993a0-28ec-4822-890d-a3763692122d.png", // Planter's Insurance logo
    "/lovable-uploads/307e1316-493f-44fb-87d2-b037b73e873c.png" // Grandview Hotels logo
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
      hasBlackBackground: false
    },
    {
      image: processedImages[1],
      title: "Insurance Provider",  // Changed from "Planter's Insurance"
      description: "Experience how Voice AI Agents power an insurance use case.",
      link: "/insurance",
      hasBlackBackground: false
    },
    {
      image: processedImages[2],
      title: "Hotel & Hospitality",
      description: "Order Room Service from a Voice AI Agent.",
      link: "/room-service",
      hasBlackBackground: false // Changed from true to false for white background
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
            <div className={`aspect-video overflow-hidden ${screenshot.hasBlackBackground ? 'bg-black' : 'bg-white'}`}>
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

      {/* Information boxes copied from /free-voiceagent */}
      <div className={`space-y-6 mt-20 transition-all duration-1000 ease-out transform delay-600 ${
        initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
      }`}>
        <InfoCard 
          title="How Does It Work?" 
          icon={Users}
          gradientFrom="blue-600"
          gradientTo="purple-600"
        >
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Simple Setup Process</h4>
              <p>Getting started with your free voice AI agent is straightforward. We'll guide you through a simple setup process to customize your agent for your specific business needs.</p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Personalized Configuration</h4>
              <p>Tailor your AI voice agent to match your brand voice, business requirements, and specific use cases. Our team will help you configure the perfect solution for your needs.</p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Seamless Integration</h4>
              <p>Integrate your voice AI agent with your existing systems with minimal effort. We handle the technical aspects so you can focus on your business.</p>
            </div>
          </div>
        </InfoCard>

        <InfoCard 
          title="What's Included" 
          icon={Rocket}
          gradientFrom="green-600"
          gradientTo="blue-600"
        >
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Core Voice AI Features</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Natural language understanding for human-like conversations</li>
                <li>Customizable voice and personality that matches your brand</li>
                <li>Basic integration with your existing business systems</li>
                <li>Standard reporting and analytics on agent interactions</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Support and Training</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Initial setup assistance from our expert team</li>
                <li>Basic documentation and self-service resources</li>
                <li>Community support for troubleshooting and best practices</li>
              </ul>
            </div>
          </div>
        </InfoCard>

        <InfoCard 
          title="Why Choose Our Free Voice AI" 
          icon={Handshake}
          gradientFrom="yellow-600"
          gradientTo="green-600"
        >
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">No Risk Trial</h4>
              <p>Experience the power of AI voice technology with no financial commitment. Our free tier gives you a genuine opportunity to test our solution in your real business environment.</p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Built for SMBs</h4>
              <p>Unlike enterprise solutions, our voice AI is specifically designed for small and medium-sized businesses, with appropriate features and complexity for your scale.</p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Upgrade Path</h4>
              <p>As your needs grow, easily upgrade to our premium tiers for additional features, integrations, and support without disrupting your existing setup.</p>
            </div>
          </div>
        </InfoCard>
      </div>
    </section>
  );
};
