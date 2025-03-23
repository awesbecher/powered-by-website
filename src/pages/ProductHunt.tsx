
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnnouncementBanner from "@/components/layout/AnnouncementBanner";
import { HeroSection } from "@/components/product-hunt/hero/HeroSection";
import { SocialProofSection } from "@/components/product-hunt/social-proof/SocialProofSection";
import { FeaturesSection } from "@/components/product-hunt/features/FeaturesSection";
import { BenefitsSection } from "@/components/product-hunt/benefits/BenefitsSection";
import { TestimonialsSection } from "@/components/product-hunt/testimonials/TestimonialsSection";
import { PricingSection } from "@/components/product-hunt/pricing/PricingSection";
import { HowItWorksSection } from "@/components/product-hunt/how-it-works/HowItWorksSection";
import { FAQSection } from "@/components/product-hunt/faq/FAQSection";
import { FinalCTASection } from "@/components/product-hunt/cta/FinalCTASection";

const ProductHunt = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      {/* Sticky header with announcement banner and navbar */}
      <div className="sticky top-0 z-50 w-full">
        <AnnouncementBanner />
        <Navbar />
      </div>

      {/* Hero Section */}
      <HeroSection initialLoad={initialLoad} />

      {/* Social Proof */}
      <SocialProofSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Why Choose Us */}
      <BenefitsSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* FAQs */}
      <FAQSection />

      {/* CTA Section */}
      <FinalCTASection />

      <Footer />
    </div>
  );
};

export default ProductHunt;
