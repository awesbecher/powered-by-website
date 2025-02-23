
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

  const scrollToSection = (index: number) => {
    setTimeout(() => {
      const element = document.getElementById(`solution-${index}`);
      if (element) {
        const headerOffset = 90; // Reduced offset
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 50); // Reduced delay
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <ProductsHero initialLoad={initialLoad} />

      {/* Solutions Index Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {serviceCardsData.map((card, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(index)}
              className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 group"
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <card.icon className="w-6 h-6 text-[#9b87f5] group-hover:text-white transition-colors" />
                <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
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
              id={`solution-${index}`} 
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

