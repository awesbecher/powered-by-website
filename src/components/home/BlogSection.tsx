
import { Link } from "react-router-dom";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { blogPosts } from "@/data/blog-posts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { SectionTitle } from "./SectionTitle";

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
    const newIndex = Math.min(activeIndex + 1, blogPosts.length - 1);
    setActiveIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const handlePrev = () => {
    const newIndex = Math.max(activeIndex - 1, 0);
    setActiveIndex(newIndex);
    scrollToIndex(newIndex);
  };

  return (
    <section className="relative z-10 py-16">
      <div className="container mx-auto px-4">
        <SectionTitle title="Our Latest Insights" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory scrollbar-none -mx-4 px-4"
        >
          {blogPosts.map((post, index) => (
            <div 
              key={post.slug} 
              className="flex-none w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[30vw] snap-start"
            >
              <BlogPostCard 
                post={post} 
                externalUrl={index === 0 ? "https://poweredbyagency.ghost.io/ai-agents-a-laymans-guide/" : undefined}
              />
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button 
            onClick={handlePrev}
            className={cn(
              "p-2 rounded-full transition-all bg-white/10 hover:bg-white/20",
              activeIndex === 0 ? "opacity-50 cursor-not-allowed" : "opacity-100"
            )}
            disabled={activeIndex === 0}
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          <div className="flex justify-center gap-2">
            {blogPosts.map((_, index) => (
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

          <button 
            onClick={handleNext}
            className={cn(
              "p-2 rounded-full transition-all bg-white/10 hover:bg-white/20",
              activeIndex === blogPosts.length - 1 ? "opacity-50 cursor-not-allowed" : "opacity-100"
            )}
            disabled={activeIndex === blogPosts.length - 1}
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
