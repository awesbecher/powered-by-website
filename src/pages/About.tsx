
import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/home/ClosingCTA";

// Import the new components
import { AboutHero } from "@/components/about/AboutHero";
import { CollaborationSection } from "@/components/about/CollaborationSection";
import { StrategyImage } from "@/components/about/StrategyImage";
import { WhoWeAreSection } from "@/components/about/WhoWeAreSection";
import { CustomApproachSection } from "@/components/about/CustomApproachSection";
import { CustomerCentricitySection } from "@/components/about/CustomerCentricitySection";
import { AgentExpertiseSection } from "@/components/about/AgentExpertiseSection";
import { OurPromiseSection } from "@/components/about/OurPromiseSection";

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
      // Adding offset to account for the fixed navbar
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
      {/* Background image */}
      <div className="fixed inset-0 z-0 opacity-50">
        <img 
          src="/lovable-uploads/182eda36-d0bd-4c57-88b7-2f0dd4938f61.png" 
          alt="Team collaboration" 
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e]/75 via-[#2f1c4a]/60 to-[#1a0b2e]/75"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen bg-transparent">
        <div className="sticky top-0 z-50 w-full">
          <Navbar />
        </div>

        {/* Hero section */}
        <AboutHero 
          initialLoad={initialLoad}
          onScrollToSection={scrollToSection}
          whoWeAreRef={whoWeAreRef}
        />

        {/* Collaboration section */}
        <CollaborationSection 
          scrollPosition={scrollPosition} 
          collaborationRef={collaborationRef} 
        />

        {/* Strategy image */}
        <StrategyImage initialLoad={initialLoad} />

        {/* Who we are section */}
        <WhoWeAreSection 
          initialLoad={initialLoad} 
          whoWeAreRef={whoWeAreRef} 
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Custom approach section */}
          <CustomApproachSection initialLoad={initialLoad} />

          {/* Customer centricity section */}
          <CustomerCentricitySection initialLoad={initialLoad} />

          {/* Agent expertise section */}
          <AgentExpertiseSection initialLoad={initialLoad} />

          {/* Our promise section */}
          <OurPromiseSection initialLoad={initialLoad} />
        </div>
      </div>

      <ClosingCTA 
        customHeading="Ready to Put AI Agents to Work?" 
        customButtonText="Get Started"
        onContactClick={() => {}} // Remove this empty handler to use the default link behavior
      />

      <Footer />
    </div>
  );
};

export default About;
