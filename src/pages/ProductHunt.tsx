
import React, { useState, useEffect } from "react";
import Footer from "@/components/layout/Footer";
import { Header } from "@/components/product-hunt/Header";
import { HeroSection } from "@/components/product-hunt/HeroSection";
import { SocialProofSection } from "@/components/product-hunt/SocialProofSection";
import { FeaturesSection } from "@/components/product-hunt/FeaturesSection";
import { BenefitsSection } from "@/components/product-hunt/BenefitsSection";
import { TestimonialsSection } from "@/components/product-hunt/TestimonialsSection";
import { PricingSection } from "@/components/product-hunt/PricingSection";
import { HowItWorksSection } from "@/components/product-hunt/HowItWorksSection";
import { FAQSection } from "@/components/product-hunt/FAQSection";
import { FinalCTASection } from "@/components/product-hunt/FinalCTASection";

const ProductHunt = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      {/* Simple header with logo only - no navbar */}
      <Header />

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
