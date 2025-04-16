
import React, { useState, useEffect } from 'react';
import Navbar from "@/components/layout/Navbar";
import AnnouncementBanner from "@/components/layout/AnnouncementBanner";
import Footer from "@/components/layout/Footer";
import { HeroSection } from "@/components/ai-agency/HeroSection";
import { UniqueAgencySection } from "@/components/ai-agency/UniqueAgencySection";
import { DifferenceSection } from "@/components/ai-agency/DifferenceSection";
import { ProjectApproachSection } from "@/components/ai-agency/ProjectApproachSection";
import { PartnershipSection } from "@/components/ai-agency/PartnershipSection";
import { FinalCTASection } from "@/components/ai-agency/FinalCTASection";
import { SocialProofSection } from "@/components/product-hunt/social-proof/SocialProofSection";
import { FloatingContactButton } from "@/components/ai-agency/FloatingContactButton";
import { ScrollNav } from "@/components/ai-agency/ScrollNav";

const AIAgency = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="sticky top-0 z-50 w-full">
        <AnnouncementBanner />
        <Navbar />
      </div>
      
      <div id="hero">
        <HeroSection initialLoad={initialLoad} />
      </div>
      
      <UniqueAgencySection />
      
      <DifferenceSection />
      
      <ProjectApproachSection />
      
      <PartnershipSection />
      
      <SocialProofSection />
      
      <FinalCTASection />
      
      <ScrollNav />
      
      <FloatingContactButton />
      
      <Footer />

      {/* Background decorations */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20 pointer-events-none z-0" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20 pointer-events-none z-0" />
    </div>
  );
};

export default AIAgency;
