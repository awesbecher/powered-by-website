import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import PricingHeader from "@/components/pricing/PricingHeader";
import PricingGrid from "@/components/pricing/PricingGrid";
import MultiChannelSection from "@/components/pricing/MultiChannelSection";
import FAQSection from "@/components/pricing/FAQSection";
import CTASection from "@/components/pricing/CTASection";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-20">
        <PricingHeader isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
        <PricingGrid isAnnual={isAnnual} />
        <MultiChannelSection />
        <FAQSection />
        <CTASection />
      </div>
    </PageLayout>
  );
};

export default Pricing;
