
import { useParams } from "react-router-dom";
import { blogPosts } from "@/data/blog-posts";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((post) => post.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]); // Add slug as dependency to scroll to top when post changes

  if (!post) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
        <Navbar />
        <div className="container mx-auto px-4 pt-36">
          <h1 className="text-4xl font-bold text-white mb-4">Article not found</h1>
          <p className="text-gray-400">The article you're looking for doesn't exist.</p>
          <Link to="/blog">
            <Button className="mt-4">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Debug the content to see if it's available
  console.log(`Blog post content for ${slug}:`, post.content ? post.content.substring(0, 100) + "..." : "No content");

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-6">
        <Link to="/blog" className="text-purple-400 hover:text-purple-300 inline-flex items-center mb-6">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
        
        <div className="bg-white/5 rounded-lg p-6 md:p-10">
          <div className="flex flex-wrap items-center gap-4 text-sm text-purple-400 mb-4">
            <span>{post.category}</span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">{post.title}</h1>
          
          <div className="text-sm text-gray-300 mb-8">
            By {post.author}
          </div>
          
          {post.content ? (
            <div 
              className="prose prose-invert max-w-none [&>*]:text-white [&>p]:text-gray-300 [&>p]:leading-relaxed [&>p]:mb-6 prose-li:text-gray-300 prose-h2:text-2xl prose-h2:text-purple-400 prose-h2:mt-10 prose-h2:mb-6 prose-h3:text-xl prose-h3:text-purple-300 prose-h3:mt-8 prose-h3:mb-4 prose-h4:text-lg prose-h4:text-purple-200 prose-h4:mt-6 prose-h4:mb-3 prose-strong:text-white prose-ul:my-6 prose-li:mb-2"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <div className="text-gray-300">
              <p>Content for this article is currently unavailable. Please check back later.</p>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts
            .filter(relatedPost => relatedPost.id !== post.id)
            .slice(0, 3)
            .map((relatedPost) => (
              <Link 
                key={relatedPost.id} 
                to={`/blog/${relatedPost.slug}`}
                className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors"
              >
                <div className="p-6">
                  <div className="text-xs text-purple-400 mb-2">
                    {relatedPost.category} • {relatedPost.date}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{relatedPost.title}</h3>
                  <p className="text-gray-300 mb-4 line-clamp-2">{relatedPost.excerpt}</p>
                  <div className="flex items-center text-purple-400 hover:text-purple-300">
                    Read more
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>

      <ClosingCTA />
      <Footer />
    </div>
  );
};

export default BlogPost;
