
import { useState, useEffect } from "react";
import { ServiceCard } from "@/components/products/ServiceCard";
import { ProductsHero } from "@/components/products/ProductsHero";
import { ProductIndex } from "@/components/products/ProductIndex";
import { serviceCardsData } from "@/data/serviceCardsData";
import { ClosingCTA } from "@/components/home/ClosingCTA";

const Products = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
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

      <ClosingCTA />

      {/* Gradient orbs for visual interest */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
    </div>
  );
};

export default Products;
