
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PricingHeader from "@/components/pricing/PricingHeader";
import PricingGrid from "@/components/pricing/PricingGrid";
import MultiChannelSection from "@/components/pricing/MultiChannelSection";
import FAQSection from "@/components/pricing/FAQSection";
import CTASection from "@/components/pricing/CTASection";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>

      <div className="container mx-auto px-4 py-20">
        <PricingHeader isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
        <PricingGrid isAnnual={isAnnual} />
        <MultiChannelSection />
        <FAQSection />
        <CTASection />
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;
