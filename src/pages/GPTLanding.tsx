
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { GPTHeroSection } from "@/components/gpt-landing/GPTHeroSection";
import { GPTFeaturesSection } from "@/components/gpt-landing/GPTFeaturesSection";
import { GPTEmailSection } from "@/components/gpt-landing/GPTEmailSection";
import { GPTScreenshotsSection } from "@/components/gpt-landing/GPTScreenshotsSection";

const GPTLanding = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      <div className="pt-12 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <GPTHeroSection initialLoad={initialLoad} />
          <GPTFeaturesSection initialLoad={initialLoad} />
          <GPTScreenshotsSection initialLoad={initialLoad} />
          <GPTEmailSection initialLoad={initialLoad} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GPTLanding;
