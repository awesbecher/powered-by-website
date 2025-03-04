
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Whitepaper } from "@/types/whitepaper";
import { BlogPost } from "@/types/blog";
import { WhitepaperCard } from "@/components/blog/WhitepaperCard";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => {
  const [whitepapers, setWhitepapers] = useState<Whitepaper[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchWhitepapers = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('whitepapers')
          .select('*')
          .order('published_at', { ascending: false });
        
        if (error) {
          console.error("Error fetching whitepapers:", error);
          throw error;
        }
        
        if (data) {
          setWhitepapers(data);
        }
      } catch (error) {
        console.error("Failed to fetch whitepapers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWhitepapers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] text-white pb-20">
      <header className="py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
          Blog & Resources
        </h1>
        <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto px-4">
          Explore our latest articles and whitepapers on AI voice technology and customer service innovation
        </p>
      </header>
      
      {/* Whitepapers Section */}
      <section className="container mx-auto mb-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Whitepapers</h2>
        
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : whitepapers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whitepapers.map((whitepaper) => (
              <WhitepaperCard 
                key={whitepaper.id} 
                whitepaper={whitepaper} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-400">No whitepapers found. Check back soon!</p>
          </div>
        )}
      </section>
      
      {/* Blog Posts Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Latest Articles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors">
              <div className="p-6">
                <div className="text-xs text-purple-400 mb-2">{post.category} • {post.date}</div>
                <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="text-purple-400 hover:text-purple-300 inline-flex items-center">
                  Read more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <div className="container mx-auto py-12 text-center">
        <Link 
          to="/admin" 
          className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-md transition-colors"
        >
          Admin Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Blog;
