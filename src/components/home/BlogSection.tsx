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
          {blogPosts.map((post, index) => {
            let customExcerpt;
            if (index === 0) {
              customExcerpt = "What are AI Agents? How hard would they be for us to implement? Will they take my job? All common questions answered in the following definitive A Layman's Guide to AI Agents";
            } else if (index === 1) {
              customExcerpt = "The AI that was was considered science fiction in the 2013 film \"Her\", has now become our reality. Learn how has the state-of-the-art in AI engineering has made this possible.";
            } else if (index === 2) {
              customExcerpt = "Powered_by's research estimates that AI agents represent the next $1 Trillion market opportunity. All businesses stand to benefit from this tidal shift in computing. See why in this article.";
            } else if (index === 3) {
              customExcerpt = "The sales and customer support functions of any SaaS company are deeply human-intensive. In this article, we detail how SaaS organizations can reduce the human labor strain on their sales & support functions while upholding the highest standard of quality and customer centricity.";
            } else if (index === 9) {
              customExcerpt = "For SMBs, evaluating any new technology investment can be daunting. How do you build a business case for implementing AI agents? How do you justify the spend? How will it positively impact our business quickly? To help, we present: The Business Case for AI Agents.";
            }
            
            return (
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
                              : index === 5
                                ? "https://poweredbyagency.ghost.io/ai-agents-the-most-common-fears-for-smbs/"
                                : index === 6
                                  ? "https://poweredbyagency.ghost.io/build-or-buy-the-ai-agents-evaluation-guide/"
                                  : index === 7
                                    ? "https://poweredbyagency.ghost.io/5-reasons-why-powered_by-exists/"
                                    : index === 8
                                      ? "https://poweredbyagency.ghost.io/ai-agents-vs-rpa-whats-the-difference/"
                                      : index === 9
                                        ? "https://poweredbyagency.ghost.io/the-agentic-revolution-is-here/"
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
                            : index === 5
                              ? "/lovable-uploads/ac998611-204a-4c1d-984c-5f8d400f57ef.png"
                              : index === 6
                                ? "/lovable-uploads/18fb4a10-0b23-4838-8db0-7e02de039f1a.png"
                                : index === 7
                                  ? "/lovable-uploads/ce50f548-f2b7-4f05-820b-79c23bb58625.png"
                                  : index === 8
                                    ? "/lovable-uploads/4a4cd2c8-60ca-4613-afa8-cf62ebc5ee1a.png"
                                    : index === 9
                                      ? "/lovable-uploads/7815dd46-92f4-4475-809a-a644ec7fd3b9.png"
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
                              : index === 5
                                ? "AI Agents: The Most Common Fears for SMBs"
                                : index === 6
                                  ? "Build Or Buy? The AI Agents Evaluation Guide"
                                  : index === 7
                                    ? "5 Reasons Why Powered_by Exists"
                                    : index === 8
                                      ? "AI Agents vs. RPA. What's the difference?"
                                      : index === 9
                                        ? "The Agentic Revolution is Here"
                                        : undefined
                  }
                  excerptOverride={customExcerpt}
                />
              </div>
            );
          })}
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
      </div>
    </section>
  );
};

export default BlogSection;
