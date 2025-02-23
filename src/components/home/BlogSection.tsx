
import { Link } from "react-router-dom";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { samplePosts } from "@/data/blogPosts";

export const BlogSection = () => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setCanScrollLeft(scrollContainerRef.current.scrollLeft > 0);
      
      const scrollPosition = scrollContainerRef.current.scrollLeft;
      const itemWidth = 392;
      const newIndex = Math.round(scrollPosition / itemWidth);
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div className="mt-20 max-w-7xl mx-auto px-4">
      <Link to="/blog">
        <h2 className="text-5xl font-bold text-white mb-16 whitespace-nowrap bg-gradient-to-r from-purple-500/20 to-purple-400/20 inline-block px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-purple-500/30 hover:to-purple-400/30 transition-all">
          Our Latest Insights on AI Agents for SMBs:
        </h2>
      </Link>
    
      <div className="relative">
        <div 
          ref={scrollContainerRef}
          className="relative overflow-x-auto scrollbar-hide pb-4"
          onScroll={handleScroll}
        >
          <div className="flex space-x-8 w-max">
            {samplePosts.map((post, index) => (
              <Link key={index} to={`/blog/${post.slug}`} className="group w-[384px] flex-none">
                <div className="relative overflow-hidden rounded-xl bg-[#1a1a1a] transition-transform duration-300 group-hover:scale-[1.02]">
                  <div className="aspect-[16/9] relative">
                    <img 
                      src={index === 0 
                        ? "/lovable-uploads/f971b5e9-817b-426a-9db0-5db472970633.png"
                        : `https://images.unsplash.com/${
                          index === 1 ? 'photo-1556745753-b2904692b3cd' : 
                          index === 2 ? 'photo-1551288049-bebda4e38f71' : 
                          index === 3 ? 'photo-1535378917042-10a22c95931a' : 
                          index === 4 ? 'photo-1553877522-43269d4ea984' : 
                          index === 5 ? 'photo-1517245386807-bb43f82c33c4' : 
                          'photo-1485827404703-89b55fcc595e'
                        }`}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-[#1a1a1a]/60 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1a1a] z-10" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#9b87f5] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-center gap-6">
          <button
            onClick={handleScrollLeft}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full transition-all duration-300 ${
              canScrollLeft 
                ? 'text-white/90 hover:text-[#9b87f5]' 
                : 'text-white/30 cursor-not-allowed'
            }`}
            aria-label="Scroll left"
          >
            <ArrowLeftCircle size={32} />
          </button>
          
          <div className="flex gap-2">
            {samplePosts.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-[#9b87f5]' 
                    : 'bg-white/20 hover:bg-white/30'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={handleScrollRight}
            disabled={currentIndex >= samplePosts.length - 1}
            className={`p-2 rounded-full transition-all duration-300 ${
              currentIndex < samplePosts.length - 1
                ? 'text-white/90 hover:text-[#9b87f5]'
                : 'text-white/30 cursor-not-allowed'
            }`}
            aria-label="Scroll right"
          >
            <ArrowRightCircle size={32} />
          </button>
        </div>
      </div>
    </div>
  );
};
