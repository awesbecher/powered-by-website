
import React from "react";
import { removeBackgroundAndColorize, loadImage } from "@/utils/imageProcessor";
import { Users, Rocket, Handshake } from "lucide-react";
import { InfoCard } from "@/components/ai-agency/InfoCard";
import { ScreenshotCard } from "./ScreenshotCard";
import { BackgroundGradient } from "./BackgroundGradient";
import { SectionHeader } from "./SectionHeader";
import { InfoCardContent, InfoCardListItem } from "./InfoCardContent";

interface GPTScreenshotsSectionProps {
  initialLoad: boolean;
}

export const GPTScreenshotsSection: React.FC<GPTScreenshotsSectionProps> = ({ initialLoad }) => {
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

  // Different gradients for each card to enhance logo visibility
  const cardGradients = [
    "from-[#331f60]/80 to-[#1c113a]", // Lighter for Real Estate
    "from-[#37285f]/80 to-[#1e1340]", // Slightly different for Insurance
    "from-[#30235a]/80 to-[#1a1239]"  // For Hotel
  ];

  const screenshots = [
    {
      image: processedImages[0],
      title: "Real Estate Agency",
      description: "Experience Voice AI in a real estate use case.",
      link: "/real-estate",
      gradientClass: cardGradients[0]
    },
    {
      image: processedImages[1],
      title: "Insurance Provider",
      description: "Experience how Voice AI Agents power an insurance use case.",
      link: "/insurance",
      gradientClass: cardGradients[1]
    },
    {
      image: processedImages[2],
      title: "Hotel & Hospitality",
      description: "Order Room Service from a Voice AI Agent.",
      link: "/room-service",
      gradientClass: cardGradients[2]
    }
  ];

  return (
    <section className="py-16 px-4 relative">
      {/* Background gradient elements */}
      <BackgroundGradient />
      
      <div className="relative z-10">
        <SectionHeader title="See Our Voice AI Agents in Action Here" initialLoad={initialLoad} />
        
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ease-out transform delay-500 ${
          initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
        }`}>
          {screenshots.map((screenshot, index) => (
            <ScreenshotCard
              key={index}
              image={screenshot.image}
              title={screenshot.title}
              description={screenshot.description}
              link={screenshot.link}
              gradientClass={screenshot.gradientClass}
            />
          ))}
        </div>

        {/* Information boxes with enhanced styling */}
        <div className={`space-y-8 mt-24 transition-all duration-1000 ease-out transform delay-600 ${
          initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
        }`}>
          <InfoCard 
            title="How Does It Work?" 
            icon={Users}
            gradientFrom="blue-600"
            gradientTo="purple-600"
          >
            <InfoCardContent title="Simple Setup Process">
              <p className="text-gray-300">Getting started with your free voice AI agent is straightforward. We'll guide you through a simple setup process to customize your agent for your specific business needs.</p>
            </InfoCardContent>

            <InfoCardContent title="Personalized Configuration">
              <p className="text-gray-300">Tailor your AI voice agent to match your brand voice, business requirements, and specific use cases. Our team will help you configure the perfect solution for your needs.</p>
            </InfoCardContent>

            <InfoCardContent title="Seamless Integration">
              <p className="text-gray-300">Integrate your voice AI agent with your existing systems with minimal effort. We handle the technical aspects so you can focus on your business.</p>
            </InfoCardContent>
          </InfoCard>

          <InfoCard 
            title="What's Included" 
            icon={Rocket}
            gradientFrom="green-600"
            gradientTo="blue-600"
          >
            <InfoCardContent title="Core Voice AI Features">
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <InfoCardListItem>Natural language understanding for human-like conversations</InfoCardListItem>
                <InfoCardListItem>Customizable voice and personality that matches your brand</InfoCardListItem>
                <InfoCardListItem>Basic integration with your existing business systems</InfoCardListItem>
                <InfoCardListItem>Standard reporting and analytics on agent interactions</InfoCardListItem>
              </ul>
            </InfoCardContent>

            <InfoCardContent title="Support and Training">
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <InfoCardListItem>Initial setup assistance from our expert team</InfoCardListItem>
                <InfoCardListItem>Basic documentation and self-service resources</InfoCardListItem>
                <InfoCardListItem>Community support for troubleshooting and best practices</InfoCardListItem>
              </ul>
            </InfoCardContent>
          </InfoCard>

          <InfoCard 
            title="Why Choose Our Free Voice AI" 
            icon={Handshake}
            gradientFrom="yellow-600"
            gradientTo="green-600"
          >
            <InfoCardContent title="No Risk Trial">
              <p className="text-gray-300">Experience the power of AI voice technology with no financial commitment. Our free tier gives you a genuine opportunity to test our solution in your real business environment.</p>
            </InfoCardContent>

            <InfoCardContent title="Built for SMBs">
              <p className="text-gray-300">Unlike enterprise solutions, our voice AI is specifically designed for small and medium-sized businesses, with appropriate features and complexity for your scale.</p>
            </InfoCardContent>

            <InfoCardContent title="Upgrade Path">
              <p className="text-gray-300">As your needs grow, easily upgrade to our premium tiers for additional features, integrations, and support without disrupting your existing setup.</p>
            </InfoCardContent>
          </InfoCard>
        </div>
      </div>
    </section>
  );
};
