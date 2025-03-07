import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BlogPost } from "@/types/blog";
import { cn } from "@/lib/utils";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { getBlogExcerpt } from "./blogExcerpts";

interface BlogCarouselProps {
  blogPosts: BlogPost[];
}

export const BlogCarousel = ({ blogPosts }: BlogCarouselProps) => {
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

  const getExternalUrl = (index: number) => {
    switch (index) {
      case 0: return "https://poweredbyagency.ghost.io/ai-agents-a-laymans-guide/";
      case 1: return "https://poweredbyagency.ghost.io/how-has-ai-become-so-human-like/";
      case 2: return "https://poweredbyagency.ghost.io/ai-agents-the-next-1-trillion-mopportunity/";
      case 3: return "https://poweredbyagency.ghost.io/how-can-saas-customer-success-benefit-from-ai-agents-2/";
      case 4: return "https://poweredbyagency.ghost.io/practical-ways-smbs-can-use-conversational-ai-agents/";
      case 5: return "https://poweredbyagency.ghost.io/ai-agents-the-most-common-fears-for-smbs/";
      case 6: return "https://poweredbyagency.ghost.io/build-or-buy-the-ai-agents-evaluation-guide/";
      case 7: return "https://poweredbyagency.ghost.io/5-reasons-why-powered_by-exists/";
      case 8: return "https://poweredbyagency.ghost.io/ai-agents-vs-rpa-whats-the-difference/";
      case 9: return "https://poweredbyagency.ghost.io/the-business-case-for-ai-agents/";
      case 10: return "https://poweredbyagency.ghost.io/the-agentic-revolution-is-here/";
      default: return undefined;
    }
  };

  const getCustomImage = (index: number) => {
    switch (index) {
      case 0: return "/lovable-uploads/1d9e2ce4-55d8-420a-83ba-9f66a644ade8.png";
      case 1: return "/lovable-uploads/d01b909c-5068-4b11-99e2-56b8eed3c895.png";
      case 2: return "/lovable-uploads/cb3348ad-fffb-48e3-ae8f-f12e86dda512.png";
      case 3: return "/lovable-uploads/628d30f0-dbf5-4a0a-8ed9-2b193dee90c6.png";
      case 4: return "/lovable-uploads/95284a6f-5cd3-4e2c-abf1-b7b5d98cb8bd.png";
      case 5: return "/lovable-uploads/ac998611-204a-4c1d-984c-5f8d400f57ef.png";
      case 6: return "/lovable-uploads/18fb4a10-0b23-4838-8db0-7e02de039f1a.png";
      case 7: return "/lovable-uploads/ce50f548-f2b7-4f05-820b-79c23bb58625.png";
      case 8: return "/lovable-uploads/4a4cd2c8-60ca-4613-afa8-cf62ebc5ee1a.png";
      case 9: return "/lovable-uploads/fdae0d27-7df9-4062-b863-55b0961f6e23.png";
      case 10: return "/lovable-uploads/f971b5e9-817b-426a-9db0-5db472970633.png";
      default: return undefined;
    }
  };

  const getTitleOverride = (index: number) => {
    switch (index) {
      case 0: return "AI Agents: A Layman's Guide";
      case 1: return "How Has AI Become So \"Human-like\"?";
      case 2: return "AI Agents: The Next $1 Trillion Market Opportunity?";
      case 3: return "How Can SaaS Customer Success Benefit from AI Agents?";
      case 4: return "Practical Ways SMBs Can Use Conversational AI Agents";
      case 5: return "AI Agents: The Most Common Fears for SMBs";
      case 6: return "Build Or Buy? The AI Agents Evaluation Guide";
      case 7: return "5 Reasons Why Powered_by Exists";
      case 8: return "AI Agents vs. RPA. What's the difference?";
      case 9: return "The Business Case for AI Agents";
      case 10: return "From SaaS to Agentic AI";
      default: return undefined;
    }
  };

  return (
    <>
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
              externalUrl={getExternalUrl(index)}
              customImage={getCustomImage(index)}
              titleOverride={getTitleOverride(index)}
              excerptOverride={getBlogExcerpt(index)}
            />
          </div>
        ))}
      </div>

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
    </>
  );
};

export default BlogCarousel;
