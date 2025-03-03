
import { useState, useEffect } from "react";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { samplePosts } from "@/data/blogPosts";
import { ClosingCTA } from "@/components/home/ClosingCTA";

const Blog = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] pt-36">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden px-6 lg:px-8 pb-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h1 
                className={`text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6 transition-all duration-1000 ease-out transform
                  ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}
              >
                Delivering the state of the art in <span className="text-[#9b87f5]">AI agents</span> to SMBs.
              </h1>
              <p 
                className={`mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-bold transition-all duration-1000 delay-300 ease-out transform
                  ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}
              >
                AI agents from <span className="bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md">Powered_by</span> aren't just tools—<span className="border-b-2 border-[#9b87f5]">they're game-changers</span>. For small to medium-sized businesses, they mean doing more with less, delighting customers, and unlocking growth you didn't think was possible.
              </p>
            </div>
          </div>
          
          <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
        </div>

        <div className="mx-auto max-w-7xl">
          <h2 className="relative text-5xl font-bold text-white mb-8 transition-colors duration-300 hover:bg-gradient-to-r hover:from-purple-400 hover:to-indigo-400 hover:bg-clip-text hover:text-transparent pt-0 pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-purple-500 after:to-indigo-500">
            Our Latest Insights:
          </h2>
        </div>

        <div className="max-w-7xl mx-auto mt-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BlogPostCard post={samplePosts[0]} featured={true} />
            {samplePosts.slice(1).map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        <ClosingCTA />
      </div>
    </div>
  );
};

export default Blog;
