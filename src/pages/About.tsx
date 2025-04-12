
import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/home/ClosingCTA";

import { AboutHero } from "@/components/about/AboutHero";
import { CollaborationSection } from "@/components/about/CollaborationSection";
import { StrategyImage } from "@/components/about/StrategyImage";
import { WhoWeAreSection } from "@/components/about/WhoWeAreSection";
import { CustomApproachSection } from "@/components/about/CustomApproachSection";
import { CustomerCentricitySection } from "@/components/about/CustomerCentricitySection";
import { AgentExpertiseSection } from "@/components/about/AgentExpertiseSection";
import { OurPromiseSection } from "@/components/about/OurPromiseSection";
import { MissionImageSection } from "@/components/about/MissionImageSection";

const About = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const collaborationRef = useRef<HTMLDivElement>(null);
  const whoWeAreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInitialLoad(false);

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      const yOffset = -100;
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY + yOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen w-full relative">
      <div className="fixed inset-0 z-0 opacity-50">
        <img 
          src="/lovable-uploads/182eda36-d0bd-4c57-88b7-2f0dd4938f61.png" 
          alt="Team collaboration" 
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e]/75 via-[#2f1c4a]/60 to-[#1a0b2e]/75"></div>
      </div>

      <div className="relative z-10 min-h-screen bg-transparent">
        <div className="sticky top-0 z-50 w-full">
          <Navbar />
        </div>

        <AboutHero 
          initialLoad={initialLoad}
          onScrollToSection={scrollToSection}
          whoWeAreRef={whoWeAreRef}
        />

        <CollaborationSection 
          scrollPosition={scrollPosition} 
          collaborationRef={collaborationRef} 
        />

        <StrategyImage initialLoad={initialLoad} />

        <WhoWeAreSection 
          initialLoad={initialLoad} 
          whoWeAreRef={whoWeAreRef} 
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Add the new workshop image above the CustomApproachSection */}
          <div className={`mt-16 mb-8 max-w-4xl mx-auto transition-all duration-1000 delay-400 ease-out transform
            ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            <img 
              src="/lovable-uploads/9adc47a5-7863-4041-9365-0a05139936a2.png" 
              alt="AI workshop presentation with audience" 
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
          
          <CustomApproachSection initialLoad={initialLoad} />
          
          <MissionImageSection initialLoad={initialLoad} />
          
          <CustomerCentricitySection initialLoad={initialLoad} />
          
          {/* Add the new image above the OurPromiseSection */}
          <div className={`mt-16 mb-8 max-w-4xl mx-auto transition-all duration-1000 delay-400 ease-out transform
            ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            <img 
              src="/lovable-uploads/faa9f337-664d-4ba0-b4b2-0b39450d9a12.png" 
              alt="Powered_by AI Agents presentation with two speakers on stage" 
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
          
          <AgentExpertiseSection initialLoad={initialLoad} />
          <OurPromiseSection initialLoad={initialLoad} />
        </div>
      </div>

      <div className="relative z-20">
        <ClosingCTA 
          customHeading="Ready to Put AI Agents to Work?" 
          customButtonText="Get Started"
        />
      </div>

      <Footer />
    </div>
  );
};

export default About;
