
import { Link } from "react-router-dom";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { samplePosts } from "@/data/blogPosts";

export const BlogSection = () => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const getPostImage = (slug: string) => {
    switch (slug) {
      case "understanding-ai-agents":
        return "/lovable-uploads/b9c7959b-bd61-40d9-b0b3-317a40353486.png";
      case "openai-anthropic-smb-specialized-partners":
        return "/lovable-uploads/f971b5e9-817b-426a-9db0-5db472970633.png";
      case "voice-ai-agents-retail-customer-service":
        return "https://images.unsplash.com/photo-1556745753-b2904692b3cd";
      case "saas-customer-engagement-automation":
        return "https://images.unsplash.com/photo-1551288049-bebda4e38f71";
      case "human-like-ai-secrets":
        return "https://images.unsplash.com/photo-1535378917042-10a22c95931a";
      case "practical-ways-smbs-use-conversational-agents":
        return "https://images.unsplash.com/photo-1553877522-43269d4ea984";
      case "customer-service-evolution":
        return "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4";
      case "breaking-down-ai-fears-smb":
        return "https://images.unsplash.com/photo-1485827404703-89b55fcc595e";
      default:
        return "";
    }
  };

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

  // Reorder posts to put "AI Agents: A Layman's Guide" first
  const orderedPosts = [...samplePosts];
  const aiAgentsIndex = orderedPosts.findIndex(post => post.slug === "understanding-ai-agents");
  if (aiAgentsIndex !== -1) {
    const [aiAgentsPost] = orderedPosts.splice(aiAgentsIndex, 1);
    orderedPosts.unshift(aiAgentsPost);
  }

  return (
    <div className="mt-20 max-w-7xl mx-auto px-4">
      <div>
        <Link to="/blog">
          <h2 className="relative text-5xl font-bold text-white mb-16 transition-colors duration-300 hover:bg-gradient-to-r hover:from-purple-400 hover:to-indigo-400 hover:bg-clip-text hover:text-transparent pt-0 pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-purple-500 after:to-indigo-500">
            Our Latest Insights:
          </h2>
        </Link>
      </div>

      <div className="relative">
        <div ref={scrollContainerRef} className="relative overflow-x-auto scrollbar-hide pb-4" onScroll={handleScroll}>
          <div className="flex space-x-8 w-max">
            {orderedPosts.map((post, index) => (
              <Link key={index} to={`/blog/${post.slug}`} className="group w-[384px] flex-none">
                <div className="relative overflow-hidden rounded-xl bg-[#1a1a1a] transition-transform duration-300 group-hover:scale-[1.02]">
                  <div className="aspect-[16/9] relative">
                    <img 
                      src={getPostImage(post.slug)} 
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
            className={`p-2 rounded-full transition-all duration-300 ${canScrollLeft ? 'text-white/90 hover:text-[#9b87f5]' : 'text-white/30 cursor-not-allowed'}`} 
            aria-label="Scroll left"
          >
            <ArrowLeftCircle size={32} />
          </button>

          <div className="flex gap-2">
            {orderedPosts.map((_, index) => (
              <div 
                key={index} 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-[#9b87f5]' : 'bg-white/20 hover:bg-white/30'
                }`} 
              />
            ))}
          </div>

          <button 
            onClick={handleScrollRight} 
            disabled={currentIndex >= orderedPosts.length - 1} 
            className={`p-2 rounded-full transition-all duration-300 ${
              currentIndex < orderedPosts.length - 1 ? 'text-white/90 hover:text-[#9b87f5]' : 'text-white/30 cursor-not-allowed'
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
