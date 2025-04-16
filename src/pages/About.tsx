
import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/home/ClosingCTA";

import { AboutHero } from "@/components/about/AboutHero";
import { MissionSection } from "@/components/about/MissionSection";
import { TeamSection } from "@/components/about/TeamSection";
import { VisionSection } from "@/components/about/VisionSection";
import { WhoWeAreSection } from "@/components/about/WhoWeAreSection";
import { FloatingCTA } from "@/components/about/FloatingCTA";
import { CollaborationSection } from "@/components/about/CollaborationSection";

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
    window.scrollTo(0, 0);
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e]/90 via-[#2f1c4a]/70 to-[#1a0b2e]/90"></div>
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

        <MissionSection initialLoad={initialLoad} />

        <CollaborationSection 
          scrollPosition={scrollPosition} 
          collaborationRef={collaborationRef} 
        />

        <WhoWeAreSection 
          initialLoad={initialLoad} 
          whoWeAreRef={whoWeAreRef} 
        />

        <TeamSection initialLoad={initialLoad} />
        
        <VisionSection initialLoad={initialLoad} />

        <FloatingCTA />
      </div>

      <div className="relative z-20">
        <ClosingCTA 
          customHeading="Ready to Transform Your Business with AI?" 
          customButtonText="Schedule a Strategy Call"
        />
      </div>

      <Footer />
    </div>
  );
};

export default About;
