
import React from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "./SectionTitle";
import { blogPosts } from "@/data/blogPosts";

const BlogSection = () => {
  // Show only the first 3 blog posts
  const displayPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-20 bg-gradient-to-b from-[#1a0b2e]/50 to-[#1a0b2e]">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Our Latest Insights" 
          subtitle="Discover our thoughts on AI voice technology, customer service innovations, and more"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {displayPosts.map((post) => (
            <div 
              key={post.id}
              className="bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:bg-white/10 transition-colors"
            >
              <div className="p-6">
                <div className="text-xs text-purple-400 mb-2">{post.category} • {post.date}</div>
                <h3 className="text-xl font-semibold mb-3 text-white">{post.title}</h3>
                <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                <Link 
                  to={`/blog/${post.slug}`} 
                  className="text-purple-400 hover:text-purple-300 inline-flex items-center"
                >
                  Read more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/blog" 
            className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-md transition-colors text-white"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
