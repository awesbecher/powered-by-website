
import { useState, useEffect } from "react";
import { ServiceCard } from "@/components/products/ServiceCard";
import { ProductsHero } from "@/components/products/ProductsHero";
import { serviceCardsData } from "@/data/serviceCardsData";
import { ClosingCTA } from "@/components/home/ClosingCTA";

const Products = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  const handleScroll = (index: number) => {
    const element = document.getElementById(`section-${index}`);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <ProductsHero initialLoad={initialLoad} className="hero-section" />

      {/* Solutions Index Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {serviceCardsData.map((card, index) => (
            <button
              key={index}
              onClick={() => handleScroll(index)}
              className="w-full p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300 border border-white/10 group cursor-pointer"
            >
              <div className="flex flex-col items-center text-center space-y-2">
                {card.icon && (
                  <div className="w-6 h-6 text-[#9b87f5] group-hover:text-white transition-colors duration-300">
                    <card.icon className="w-full h-full" />
                  </div>
                )}
                <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-300">
                  {card.title.main.replace(':', '')}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Solutions Grid */}
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
