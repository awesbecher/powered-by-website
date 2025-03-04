
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blog-posts";
import Navbar from "@/components/layout/Navbar";
import { ChevronRight } from "lucide-react";

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] text-white pb-20">
      <Navbar />
      <header className="py-16 pt-36 text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
          Blog & Resources
        </h1>
        <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto px-4">
          Explore our latest articles on AI voice technology and customer service innovation
        </p>
      </header>
      
      {/* Blog Posts Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Latest Articles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.slug}`}
              className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="text-xs text-purple-400 mb-2">
                  {post.category} • {post.date}
                </div>
                <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                <p className="text-gray-300 mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                <div className="flex items-center text-purple-400 hover:text-purple-300 mt-auto">
                  Read more
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blog;
