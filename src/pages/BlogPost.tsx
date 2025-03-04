
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { blogPosts } from "@/data/blogPosts";
import { BlogPost as BlogPostType } from "@/types/blog";
import Navbar from "@/components/layout/Navbar";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the post with the matching slug
    const foundPost = blogPosts.find(post => post.slug === slug);
    setPost(foundPost || null);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] text-white">
        <Navbar />
        <div className="container mx-auto py-20 px-4">
          <div className="animate-pulse flex flex-col max-w-3xl mx-auto">
            <div className="h-8 bg-white/10 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-white/10 rounded w-1/4 mb-12"></div>
            <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
            <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
            <div className="h-4 bg-white/10 rounded w-5/6 mb-2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] text-white">
        <Navbar />
        <div className="container mx-auto py-20 px-4 text-center">
          <h1 className="text-3xl font-bold mb-6">Article Not Found</h1>
          <p className="mb-8">Sorry, the article you're looking for doesn't exist.</p>
          <Link 
            to="/blog" 
            className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-md transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] text-white">
      <Navbar />
      <div className="container mx-auto py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to Blog
          </Link>
          
          <div className="mb-4 text-purple-400 text-sm">
            {post.category} • {post.date}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
          
          <div className="flex items-center mb-8">
            <div className="text-sm text-gray-300">
              By {post.author}
            </div>
          </div>
          
          <div className="prose prose-lg prose-invert max-w-none">
            {/* Dummy content for demonstration */}
            <p className="text-gray-200 leading-relaxed mb-4">
              {post.excerpt}
            </p>
            <p className="text-gray-200 leading-relaxed mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, 
              nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl. Sed euismod, nisl vel ultricies lacinia,
              nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">Key Insights</h2>
            <p className="text-gray-200 leading-relaxed mb-4">
              Nulla facilisi. Mauris efficitur, eros ut feugiat ultricies, velit orci aliquet turpis, 
              et vulputate turpis turpis vel ex. Maecenas semper libero ut nulla placerat, et vestibulum 
              turpis mollis. Donec posuere lorem a sem pulvinar, eu molestie mi feugiat.
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-gray-200 mb-2">Artificial intelligence is transforming customer service</li>
              <li className="text-gray-200 mb-2">Voice agents can handle multiple customer inquiries simultaneously</li>
              <li className="text-gray-200 mb-2">Implementation costs have decreased significantly in recent years</li>
              <li className="text-gray-200 mb-2">Customer satisfaction rates improve with AI-powered support</li>
            </ul>
            <p className="text-gray-200 leading-relaxed">
              Proin ac magna vel massa faucibus gravida. Vivamus vulputate metus sit amet dui feugiat, 
              at aliquam elit tincidunt. Suspendisse potenti. Maecenas consectetur purus in lectus 
              lobortis, vel commodo nisl finibus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
