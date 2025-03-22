
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import AnnouncementBanner from "@/components/layout/AnnouncementBanner";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { ValuesSection } from "@/components/home/ValuesSection";
import { BlogSection } from "@/components/home/BlogSection";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { CallToActionButtons } from "@/components/home/CallToActionButtons";
import { SectionTitle } from "@/components/home/SectionTitle";
import { AgentTypes } from "@/components/home/AgentTypes";
import AIAgentIllustration from "@/components/home/AIAgentIllustration";
import Footer from "@/components/layout/Footer";

const Index = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  const handleNavigation = (path: string) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="sticky top-0 z-50 w-full">
        <AnnouncementBanner />
        <Navbar />
      </div>
      
      {/* ProductHunt Badge */}
      <div className="w-full flex justify-center pt-6">
        <div className={`transition-all duration-1000 ease-out transform ${initialLoad ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <a href="https://www.producthunt.com/posts/powered_by?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-powered&#0095;by" target="_blank" rel="noreferrer">
            <img 
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=942846&theme=dark&t=1742671943126" 
              alt="Powered&#0095;by - Custom&#0032;AI&#0032;Agents&#0032;for&#0032;SMBs&#0046;&#0032;Agentic&#0032;voice&#0044;&#0032;email&#0044;&#0032;SMS&#0044;&#0032;&#0038;&#0032;more | Product Hunt" 
              style={{ width: "180px", height: "39px" }} 
              width="180" 
              height="39" 
            />
          </a>
        </div>
      </div>
      
      <div className="pt-6">
        <HeroSection initialLoad={initialLoad} />
      </div>

      <div className="text-center px-6 mb-12 mt-2">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 max-w-4xl mx-auto leading-[1.1]">
          Custom AI Agent Solutions.{" "}
          <span className="text-[#9b87f5] block mt-4 bg-gradient-to-r from-[#9b87f5] to-[#7a6cc5] bg-clip-text text-transparent">
            Quick. Easy. Powerful.
          </span>
        </h2>
      </div>

      <div className="relative z-10 mb-16">
        <FeaturesGrid />
      </div>

      {/* Call to Action Buttons */}
      <div className="relative z-20 flex flex-col items-center justify-center px-6 mb-6">
        <CallToActionButtons 
          handleNavigation={handleNavigation}
          setShowDialog={() => document.dispatchEvent(new CustomEvent('open-voice-dialog'))}
        />
      </div>
      
      {/* AIAgentIllustration with reduced height */}
      <div className="relative z-10 mb-8">
        <div className="w-full max-w-xl mx-auto">
          <AIAgentIllustration />
        </div>
      </div>

      <div className="container mx-auto px-4 mb-8">
        <SectionTitle title="Deploy Multi-Channel Agents:" linked={false} />
        <AgentTypes />
      </div>

      <div className="container mx-auto px-4 mb-8">
        <SectionTitle title="Our Approach:" linked={false} />
      </div>

      <ValuesSection />
      <BlogSection />
      <ClosingCTA />
      <Footer />

      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
    </div>
  );
};

export default Index;
