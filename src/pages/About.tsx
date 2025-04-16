
import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/home/ClosingCTA";

import { AboutHero } from "@/components/about/AboutHero";
import { MissionSection } from "@/components/about/MissionSection";
import { VisionSection } from "@/components/about/VisionSection";
import { WhoWeAreSection } from "@/components/about/WhoWeAreSection";
import { FloatingCTA } from "@/components/about/FloatingCTA";
import { CollaborationSection } from "@/components/about/CollaborationSection";
import "@/components/ui/animations.css";

const About = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const collaborationRef = useRef<HTMLDivElement>(null);
  const whoWeAreRef = useRef<HTMLDivElement>(null);
  const skipLinkRef = useRef<HTMLAnchorElement>(null);

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
      
      // Focus the section for accessibility
      if (ref.current) {
        const focusableElement = ref.current.querySelector('h2, p, div[tabindex]') as HTMLElement;
        if (focusableElement) {
          focusableElement.focus();
        } else {
          ref.current.setAttribute('tabindex', '-1');
          ref.current.focus();
        }
      }
    }
  };

  return (
    <div className="min-h-screen w-full relative">
      {/* Skip to main content link for accessibility */}
      <a 
        ref={skipLinkRef}
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-[#9b87f5] focus:text-white focus:p-4 focus:m-4 focus:rounded focus-visible"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('main-content')?.focus();
          document.getElementById('main-content')?.scrollIntoView();
        }}
      >
        Skip to main content
      </a>

      <div className="fixed inset-0 z-0 opacity-50">
        <img 
          src="/lovable-uploads/182eda36-d0bd-4c57-88b7-2f0dd4938f61.png" 
          alt="Team collaboration background" 
          className="w-full h-full object-cover object-top"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e]/90 via-[#2f1c4a]/70 to-[#1a0b2e]/90"></div>
      </div>

      <div className="relative z-10 min-h-screen bg-transparent">
        <div className="sticky top-0 z-50 w-full">
          <Navbar />
        </div>

        <main id="main-content" tabIndex={-1} className="outline-none focus:outline-none">
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
          
          <VisionSection initialLoad={initialLoad} />

          <FloatingCTA />
        </main>
      </div>

      <div className="relative z-20">
        <ClosingCTA 
          customHeading="Ready to Transform Your Business with AI?" 
          customButtonText="Get Started"
          useCalendly={true}
        />
      </div>

      <Footer />
    </div>
  );
};

export default About;
