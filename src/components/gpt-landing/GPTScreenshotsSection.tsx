
import React from "react";
import { Card } from "@/components/ui/card";
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
      title: "Insurance Provider",
      description: "Experience how Voice AI Agents power an insurance use case.",
      link: "/insurance",
      hasBlackBackground: false
    },
    {
      image: processedImages[2],
      title: "Hotel & Hospitality",
      description: "Order Room Service from a Voice AI Agent.",
      link: "/room-service",
      hasBlackBackground: false
    }
  ];

  return (
    <section className="py-16 px-4 relative">
      {/* Background gradient elements */}
      <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none overflow-hidden">
        <div className="absolute top-[30%] right-[5%] w-[20rem] h-[20rem] bg-purple-600/20 rounded-full blur-[7rem]"></div>
        <div className="absolute bottom-[10%] left-[5%] w-[20rem] h-[20rem] bg-blue-600/20 rounded-full blur-[7rem]"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#9b87f5]/50"></div>
          <h2 className={`text-3xl sm:text-4xl font-bold text-white text-center transition-all duration-1000 ease-out transform delay-400 ${
            initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
          }`}>
            See Our Voice AI Agents in Action Here
          </h2>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#9b87f5]/50"></div>
        </div>
        
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ease-out transform delay-500 ${
          initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
        }`}>
          {screenshots.map((screenshot, index) => {
            // Use different gradients for each card to enhance logo visibility
            const cardGradients = [
              "from-[#331f60]/80 to-[#1c113a]", // Lighter for Real Estate
              "from-[#37285f]/80 to-[#1e1340]", // Slightly different for Insurance
              "from-[#30235a]/80 to-[#1a1239]"  // For Hotel
            ];
            
            return (
              <div 
                key={index} 
                className="group cursor-pointer transition-all duration-300 transform hover:translate-y-[-8px]"
                onClick={() => screenshot.link && navigate(screenshot.link)}
              >
                <Card className={`overflow-hidden h-full bg-gradient-to-br ${cardGradients[index]} border-0 shadow-lg shadow-purple-900/20 hover:shadow-xl hover:shadow-purple-800/30`}>
                  <div className="p-4 relative">
                    {/* Light glow effect behind the logo for better visibility */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50 rounded-t-lg"></div>
                    
                    {/* Logo container with glass effect for better visibility */}
                    <div className={`flex justify-center items-center h-32 relative z-10 mb-4 border-b border-[#9b87f5]/30 pb-4`}>
                      <div className="w-3/4 h-full flex items-center justify-center px-4 py-2 backdrop-blur-sm bg-white/10 rounded-lg">
                        <img 
                          src={screenshot.image} 
                          alt={screenshot.title} 
                          className="max-h-full max-w-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                        />
                      </div>
                    </div>
                    
                    {/* Content with improved spacing and glow effects */}
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-[#9b87f5] mb-3 group-hover:text-white transition-colors duration-300">{screenshot.title}</h3>
                      <p className="text-[#c4b8f0] font-medium text-sm leading-relaxed">{screenshot.description}</p>
                      
                      {/* View demo button */}
                      <div className="mt-4 pt-3 flex justify-end">
                        <div className="inline-flex items-center text-sm font-medium text-[#9b87f5] group-hover:text-white transition-colors duration-300">
                          View Demo
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
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
            <div className="space-y-6">
              <div className="bg-white/5 p-5 rounded-lg hover:bg-white/10 transition-all duration-300">
                <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Simple Setup Process</h4>
                <p className="text-gray-300">Getting started with your free voice AI agent is straightforward. We'll guide you through a simple setup process to customize your agent for your specific business needs.</p>
              </div>

              <div className="bg-white/5 p-5 rounded-lg hover:bg-white/10 transition-all duration-300">
                <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Personalized Configuration</h4>
                <p className="text-gray-300">Tailor your AI voice agent to match your brand voice, business requirements, and specific use cases. Our team will help you configure the perfect solution for your needs.</p>
              </div>

              <div className="bg-white/5 p-5 rounded-lg hover:bg-white/10 transition-all duration-300">
                <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Seamless Integration</h4>
                <p className="text-gray-300">Integrate your voice AI agent with your existing systems with minimal effort. We handle the technical aspects so you can focus on your business.</p>
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
              <div className="bg-white/5 p-5 rounded-lg hover:bg-white/10 transition-all duration-300">
                <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Core Voice AI Features</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Natural language understanding for human-like conversations</li>
                  <li>Customizable voice and personality that matches your brand</li>
                  <li>Basic integration with your existing business systems</li>
                  <li>Standard reporting and analytics on agent interactions</li>
                </ul>
              </div>

              <div className="bg-white/5 p-5 rounded-lg hover:bg-white/10 transition-all duration-300">
                <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Support and Training</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
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
              <div className="bg-white/5 p-5 rounded-lg hover:bg-white/10 transition-all duration-300">
                <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">No Risk Trial</h4>
                <p className="text-gray-300">Experience the power of AI voice technology with no financial commitment. Our free tier gives you a genuine opportunity to test our solution in your real business environment.</p>
              </div>

              <div className="bg-white/5 p-5 rounded-lg hover:bg-white/10 transition-all duration-300">
                <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Built for SMBs</h4>
                <p className="text-gray-300">Unlike enterprise solutions, our voice AI is specifically designed for small and medium-sized businesses, with appropriate features and complexity for your scale.</p>
              </div>

              <div className="bg-white/5 p-5 rounded-lg hover:bg-white/10 transition-all duration-300">
                <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Upgrade Path</h4>
                <p className="text-gray-300">As your needs grow, easily upgrade to our premium tiers for additional features, integrations, and support without disrupting your existing setup.</p>
              </div>
            </div>
          </InfoCard>
        </div>
      </div>
    </section>
  );
};
