
import React, { useState } from "react";
import { Helmet } from 'react-helmet';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PricingHeader from "@/components/pricing/PricingHeader";
import PricingGrid from "@/components/pricing/PricingGrid";
import MultiChannelSection from "@/components/pricing/MultiChannelSection";
import FAQSection from "@/components/pricing/FAQSection";
import CTASection from "@/components/pricing/CTASection";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "AI Agent Solution",
    "provider": {
      "@type": "Organization",
      "name": "Powered By Agency",
      "url": "https://www.poweredby.agency/pricing",
      "logo": "https://www.poweredby.agency/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1 800-123-4567",
        "contactType": "Customer Service",
        "areaServed": "US",
        "availableLanguage": "English"
      }
    },
    "description": "AI-powered agent solution designed to automate and optimize business operations for small and medium-sized businesses.",
    "offers": {
      "@type": "Offer",
      "url": "https://www.poweredby.agency/pricing",
      "priceCurrency": "USD",
      "price": "299",
      "priceValidUntil": "2025-12-31",
      "eligibleRegion": {
        "@type": "Place",
        "name": "Global"
      },
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Powered By Agency"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Helmet>
        <title>AI Agent Pricing | Powered By Agency</title>
        <meta name="description" content="Affordable AI agent solutions for SMBs. Explore our pricing plans starting at $299/month per agent and transform your business operations." />
        <link rel="canonical" href="https://www.poweredby.agency/pricing" />
        <script type="application/ld+json">
          {JSON.stringify(pricingSchema)}
        </script>
      </Helmet>
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
