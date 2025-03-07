
import { blogPosts } from "@/data/blog-posts";
import { SectionTitle } from "./SectionTitle";
import { BlogCarousel } from "./BlogCarousel";
import { ExternalLink, Twitter } from "lucide-react";
import { Button } from "../ui/button";

export const BlogSection = () => {
  return (
    <section className="relative z-10 py-16">
      <div className="container mx-auto px-4">
        <SectionTitle title="Our Latest Insights" />
        
        <div className="flex items-center justify-end mb-4">
          <a 
            href="https://x.com/poweredbyagency" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-[#9b87f5] transition-colors group"
          >
            <Twitter className="h-4 w-4 group-hover:text-[#9b87f5]" />
            <span>Follow us on</span>
            <span className="font-bold underline-offset-2 underline">X</span>
            <ExternalLink className="h-3 w-3 opacity-70 group-hover:text-[#9b87f5]" />
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        <BlogCarousel blogPosts={blogPosts} />
      </div>
      
      <div className="container mx-auto px-4 mt-16">
        <SectionTitle title="Follow Us on X:" />
        <div className="flex justify-center mt-8">
          <a 
            href="https://x.com/poweredbyagency" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#9b87f5] focus:ring-offset-2 focus:ring-offset-[#1a0b2e] rounded-lg"
          >
            <img 
              src="/lovable-uploads/9e0bc0a2-04e0-4179-bc8f-d7ad5f20dd32.png" 
              alt="Follow us on X" 
              className="w-24 h-24 md:w-32 md:h-32 object-contain"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
