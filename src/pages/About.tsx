import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { Button } from "@/components/ui/button";
import { PresentationIcon } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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
  const [showPresentationDialog, setShowPresentationDialog] = useState(false);
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

  const handlePresentationClick = () => {
    setShowPresentationDialog(true);
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

        <div className="max-w-xl mx-auto my-12">
          <Button 
            variant="gradient" 
            size="lg"
            onClick={handlePresentationClick}
            className="w-full py-8 text-xl flex items-center justify-center"
          >
            <PresentationIcon className="mr-3 h-6 w-6" />
            Read our Overview Presentation
          </Button>
        </div>

        <WhoWeAreSection 
          initialLoad={initialLoad} 
          whoWeAreRef={whoWeAreRef} 
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <CustomApproachSection initialLoad={initialLoad} />
          <CustomerCentricitySection initialLoad={initialLoad} />
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

      <Dialog open={showPresentationDialog} onOpenChange={setShowPresentationDialog}>
        <DialogContent className="sm:max-w-5xl bg-white p-0 overflow-hidden">
          <iframe 
            src="https://custom-ai-agent-solution-nq1xz3i.gamma.site/" 
            className="w-full h-[80vh]" 
            title="Overview Presentation"
            allow="fullscreen"
          ></iframe>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default About;
