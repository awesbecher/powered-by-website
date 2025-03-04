import { useState, useEffect } from "react";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { samplePosts } from "@/data/blogPosts";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { SectionTitle } from "@/components/home/SectionTitle";
import { WhitepaperCard } from "@/components/blog/WhitepaperCard";
import { supabase } from "@/integrations/supabase/client";
import { Whitepaper } from "@/types/whitepaper";
import { useToast } from "@/hooks/use-toast";

const Blog = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [whitepapers, setWhitepapers] = useState<Whitepaper[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchWhitepapers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('whitepapers')
        .select('*')
        .order('published_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setWhitepapers(data as Whitepaper[]);
    } catch (error) {
      console.error("Error fetching whitepapers:", error);
      toast({
        title: "Error",
        description: "Failed to load whitepapers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (id: string) => {
    try {
      // Increment the download counter
      await supabase
        .from('whitepapers')
        .update({ downloads: whitepapers.find(wp => wp.id === id)!.downloads + 1 })
        .eq('id', id);
      
      // Refresh the whitepaper list
      fetchWhitepapers();
    } catch (error) {
      console.error("Error updating download count:", error);
    }
  };

  useEffect(() => {
    setInitialLoad(false);
    fetchWhitepapers();
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
          <SectionTitle title="Our Latest Insights:" />
        </div>

        <div className="max-w-7xl mx-auto mt-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BlogPostCard post={samplePosts[0]} featured={true} />
            {samplePosts.slice(1).map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-7xl mt-20">
          <SectionTitle title="Whitepapers:" />
        </div>

        <div className="max-w-7xl mx-auto mt-8 mb-16">
          {loading ? (
            <div className="bg-white/5 rounded-lg p-8 text-center">
              <p className="text-white">Loading whitepapers...</p>
            </div>
          ) : whitepapers.length === 0 ? (
            <div className="bg-white/5 rounded-lg p-8 hover:bg-white/10 transition-all duration-300">
              <p className="text-white opacity-60 mb-2">No whitepapers available</p>
              <h3 className="text-xl font-bold text-white mb-2">Check back later</h3>
              <p className="text-white text-sm opacity-80">Our team will be adding whitepapers soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {whitepapers.map(whitepaper => (
                <WhitepaperCard 
                  key={whitepaper.id} 
                  whitepaper={whitepaper} 
                  onDownload={() => handleDownload(whitepaper.id)} 
                />
              ))}
            </div>
          )}
        </div>

        <ClosingCTA />
      </div>
    </div>
  );
};

export default Blog;
