
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
                externalUrl={
                  index === 0 
                    ? "https://poweredbyagency.ghost.io/ai-agents-a-laymans-guide/" 
                    : index === 1 
                      ? "https://poweredbyagency.ghost.io/how-has-ai-become-so-human-like/" 
                      : index === 2
                        ? "https://poweredbyagency.ghost.io/ai-agents-the-next-1-trillion-mopportunity/"
                        : index === 3
                          ? "https://poweredbyagency.ghost.io/how-can-saas-customer-success-benefit-from-ai-agents-2/"
                          : index === 4
                            ? "https://poweredbyagency.ghost.io/practical-ways-smbs-can-use-conversational-ai-agents/"
                            : undefined
                }
                customImage={
                  index === 0 
                    ? "/lovable-uploads/1d9e2ce4-55d8-420a-83ba-9f66a644ade8.png" 
                    : index === 1 
                      ? "/lovable-uploads/d01b909c-5068-4b11-99e2-56b8eed3c895.png" 
                      : index === 2
                        ? "/lovable-uploads/cb3348ad-fffb-48e3-ae8f-f12e86dda512.png"
                        : index === 3
                          ? "/lovable-uploads/628d30f0-dbf5-4a0a-8ed9-2b193dee90c6.png"
                          : index === 4
                            ? "/lovable-uploads/95284a6f-5cd3-4e2c-abf1-b7b5d98cb8bd.png"
                            : undefined
                }
                titleOverride={
                  index === 0 
                    ? "AI Agents: A Layman's Guide" 
                    : index === 1 
                      ? "How Has AI Become So \"Human-like\"?" 
                      : index === 2
                        ? "AI Agents: The Next $1 Trillion Market Opportunity?"
                        : index === 3
                          ? "How Can SaaS Customer Success Benefit from AI Agents?"
                          : index === 4
                            ? "Practical Ways SMBs Can Use Conversational AI Agents"
                            : undefined
                }
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
