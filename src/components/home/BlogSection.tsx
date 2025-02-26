
import { Link } from "react-router-dom";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { samplePosts } from "@/data/blogPosts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

export const BlogSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = container.children[0].clientWidth;
      container.scrollTo({
        left: itemWidth * index,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = container.children[0].clientWidth;
      const index = Math.round(container.scrollLeft / itemWidth);
      setActiveIndex(index);
    }
  };

  const handleNext = () => {
    const newIndex = Math.min(activeIndex + 1, samplePosts.length - 1);
    setActiveIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const handlePrev = () => {
    const newIndex = Math.max(activeIndex - 0, 0);
    setActiveIndex(newIndex);
    scrollToIndex(newIndex);
  };

  return (
    <section className="relative z-10 py-16">
      <div className="w-full container mx-auto px-4">
        <h2 className="relative text-5xl font-bold text-white mb-16 transition-colors duration-300 hover:bg-gradient-to-r hover:from-purple-400 hover:to-indigo-400 hover:bg-clip-text hover:text-transparent pt-0 pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-purple-500 after:to-indigo-500">
          Our Latest Insights:
        </h2>
      </div>

      <div className="container mx-auto px-4 relative">
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory scrollbar-none -mx-4 px-4"
        >
          {samplePosts.map((post) => (
            <div 
              key={post.slug} 
              className="flex-none w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[30vw] snap-start"
            >
              <Link to={`/blog/${post.slug}`}>
                <BlogPostCard post={post} />
              </Link>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={handlePrev}
          className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all",
            activeIndex === 0 ? "opacity-50 cursor-not-allowed" : "opacity-100"
          )}
          disabled={activeIndex === 0}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        <button 
          onClick={handleNext}
          className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all",
            activeIndex === samplePosts.length - 1 ? "opacity-50 cursor-not-allowed" : "opacity-100"
          )}
          disabled={activeIndex === samplePosts.length - 1}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {samplePosts.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                scrollToIndex(index);
              }}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === activeIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
