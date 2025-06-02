import { serviceCardsData } from "@/data/serviceCardsData";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface ProductIndexProps {
  activeSection?: string;
}

export const ProductIndex = ({ activeSection }: ProductIndexProps) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (index: number) => {
    const element = document.getElementById(`section-${index}`);
    if (element) {
      // Account for the sticky header
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Check if scroll container is overflowing
  useEffect(() => {
    const checkOverflow = () => {
      if (scrollContainerRef.current) {
        setIsOverflowing(
          scrollContainerRef.current.scrollWidth > scrollContainerRef.current.clientWidth
        );
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, []);

  // Horizontal scroll with mouse wheel
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollContainerRef.current && isOverflowing) {
        e.preventDefault();
        scrollContainerRef.current.scrollLeft += e.deltaY;
      }
    };

    const currentRef = scrollContainerRef.current;
    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, [isOverflowing]);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 relative">
      {isOverflowing && (
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#1a0b2e] to-transparent z-10 pointer-events-none" />
      )}
      
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide gap-3 py-2 pb-3 scroll-smooth"
      >
        <a
          href="#featured-solutions"
          className="flex-shrink-0 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-accent/50 transition-all duration-300 flex items-center gap-2 text-white font-medium"
        >
          Featured Solutions
        </a>
        
        {serviceCardsData.map((card, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`relative flex-shrink-0 px-4 py-2 rounded-lg ${
              activeSection === index.toString() 
                ? "bg-accent/30 border-accent" 
                : "bg-white/5 border-white/10 hover:border-accent/50"
            } border transition-all duration-300 flex items-center gap-2`}
            aria-current={activeSection === index.toString() ? "page" : undefined}
          >
            <card.icon className="h-5 w-5 text-white flex-shrink-0" />
            <p className="text-sm text-white whitespace-nowrap">{card.title.main.replace(':', '')}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
