
import { useState, useEffect } from "react";
import { ServiceCard } from "@/components/products/ServiceCard";
import { ProductsHero } from "@/components/products/ProductsHero";
import { ProductIndex } from "@/components/products/ProductIndex";
import { serviceCardsData } from "@/data/serviceCardsData";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import Navbar from "@/components/layout/Navbar";
import { SectionTitle } from "@/components/home/SectionTitle";

const Products = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      <ProductsHero initialLoad={initialLoad} className="hero-section" />
      
      <ProductIndex />

      {/* Detailed Solutions */}
      <div className="max-w-full pt-12">
        <div className="space-y-0 divide-y divide-white/10">
          {serviceCardsData.map((card, index) => (
            <div 
              key={index}
              id={`section-${index}`}
              className="scroll-mt-24"
            >
              <ServiceCard
                title={
                  <>
                    <span className="font-bold text-white">{card.title.main}</span>{' '}
                    <span className="font-normal text-[#9b87f5]">{card.title.sub}</span>
                  </>
                }
                icon={card.icon}
                description={card.description}
                features={card.features}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Featured Agent Solutions Section */}
      <div className="container mx-auto px-4 py-12">
        <SectionTitle title="Featured Agent Solutions:" linked={false} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {/* Placeholder for featured agent solutions content */}
          <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-white/10 h-64 flex items-center justify-center">
            <p className="text-white text-center">Featured solution content will be added soon</p>
          </div>
          <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-white/10 h-64 flex items-center justify-center">
            <p className="text-white text-center">Featured solution content will be added soon</p>
          </div>
          <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-white/10 h-64 flex items-center justify-center">
            <p className="text-white text-center">Featured solution content will be added soon</p>
          </div>
        </div>
      </div>

      <ClosingCTA />

      {/* Gradient orbs for visual interest */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
    </div>
  );
};

export default Products;
