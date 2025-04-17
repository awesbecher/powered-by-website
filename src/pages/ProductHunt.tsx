
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LaunchHeroSection } from "@/components/product-hunt/hero/LaunchHeroSection";
import { VideoSection } from "@/components/product-hunt/video/VideoSection";
import { HowItWorksSection } from "@/components/product-hunt/how-it-works/HowItWorksSection";
import { FeaturesSection } from "@/components/product-hunt/features/FeaturesSection";
import { BenefitsSection } from "@/components/product-hunt/benefits/BenefitsSection";
import { TestimonialsSection } from "@/components/product-hunt/testimonials/TestimonialsSection";
import { PricingSection } from "@/components/product-hunt/pricing/PricingSection";
import { FAQSection } from "@/components/product-hunt/faq/FAQSection";
import { FinalCTASection } from "@/components/product-hunt/cta/FinalCTASection";

const ProductHunt = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  
  useEffect(() => {
    // Set initialLoad to false after a short delay to trigger animations
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 100);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      
      {/* Hero Section with background image */}
      <LaunchHeroSection initialLoad={initialLoad} />
      
      {/* Main Content */}
      <main>
        <VideoSection initialLoad={initialLoad} />
        <HowItWorksSection initialLoad={initialLoad} />
        <FeaturesSection initialLoad={initialLoad} />
        <BenefitsSection initialLoad={initialLoad} />
        <TestimonialsSection initialLoad={initialLoad} />
        <PricingSection initialLoad={initialLoad} />
        <FAQSection initialLoad={initialLoad} />
        <FinalCTASection initialLoad={initialLoad} />
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductHunt;
