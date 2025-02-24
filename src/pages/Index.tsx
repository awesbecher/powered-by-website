import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { ValuesSection } from "@/components/home/ValuesSection";
import { BlogSection } from "@/components/home/BlogSection";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import AIAgentIllustration from "@/components/home/AIAgentIllustration";

const Index = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="absolute top-6 left-6 lg:left-8">
        <img 
          src="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
          alt="Parlar Logo"
          className="w-[192px] lg:w-[288px] h-auto"
        />
      </div>

      <HeroSection initialLoad={initialLoad} />

      <div className="relative z-10 mt-12 mb-12">
        <FeaturesGrid />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-6 mb-12">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-4xl">
          <Link to="/blog/understanding-ai-agents">
            <Button className="text-white bg-[#6E59A5] hover:bg-[#6E59A5]/80 px-3 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
              What's an AI agent?
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/contact">
            <Button className="bg-accent hover:bg-accent-dark text-white px-3 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
              Book a Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button className="bg-white hover:bg-gray-100 text-accent px-3 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
            Talk to an AI Agent Now
            <Phone className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="relative z-10 -mt-32 mb-0 flex justify-center">
        <div className="w-full max-w-xl">
          <AIAgentIllustration />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 mt-12">
        <h2 className="relative text-5xl font-bold text-white mb-4 transition-colors duration-300 hover:bg-gradient-to-r hover:from-purple-400 hover:to-indigo-400 hover:bg-clip-text hover:text-transparent pt-0 pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-purple-500 after:to-indigo-500">
          Our Approach:
        </h2>
      </div>
      
      <ValuesSection />
      <BlogSection />
      <ClosingCTA />

      {/* Background gradient orbs */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
    </div>
  );
};

export default Index;
