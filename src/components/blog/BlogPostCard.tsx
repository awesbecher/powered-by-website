
import { Link } from "react-router-dom";
import { Clock, User, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/types/blog";
import { useLocation } from "react-router-dom";

interface BlogPostCardProps {
  post: BlogPost;
  featured?: boolean;
}

const getPostImage = (slug: string) => {
  switch (slug) {
    case "understanding-ai-agents":
      return "/lovable-uploads/b9c7959b-bd61-40d9-b0b3-317a40353486.png";
    case "ai-agents-trillion-market-opportunity":
      return "/lovable-uploads/248b1b18-6411-432d-8281-dc0d70f64a28.png";
    case "build-or-buy-ai-agents-evaluation":
      return "/lovable-uploads/02977ad8-a831-4b23-909d-7010d4bb02b6.png";
    case "openai-anthropic-smb-specialized-partners":
      return "/lovable-uploads/f971b5e9-817b-426a-9db0-5db472970633.png";
    case "voice-ai-retail-customer-service":
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

export const BlogPostCard = ({ post, featured = false }: BlogPostCardProps) => {
  const location = useLocation();
  const isOnBlogPage = location.pathname === "/blog";

  return (
    <Link 
      to={`/blog/${post.slug}`}
      className="block group text-white"
    >
      <div className={cn(
        "bg-white/5 rounded-lg overflow-hidden group-hover:bg-white/10 transition-all duration-300 transform group-hover:-translate-y-1 hover:shadow-lg",
        featured ? "col-span-full lg:col-span-2" : ""
      )}>
        <div className="relative h-[350px]">
          {!isOnBlogPage && (
            <div className="absolute inset-0">
              <img 
                src={getPostImage(post.slug)} 
                alt={post.title}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
            </div>
          )}
          <div className={cn(
            "relative p-8 flex flex-col h-full",
            isOnBlogPage ? "bg-[#1a0b2e]" : ""
          )}>
            <h2 className={cn(
              "font-bold text-white !important mb-6 group-hover:text-[#9b87f5] transition-colors text-shadow",
              featured ? "text-2xl" : "text-xl"
            )}>
              {post.title}
            </h2>
            <p className="text-white text-sm leading-relaxed mb-6 line-clamp-4 text-shadow">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-white mt-auto">
              <div className="flex items-center gap-2">
                <User className="w-3 h-3" />
                <span className="text-shadow">{post.author}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  <span className="text-shadow">{post.readTime}</span>
                </div>
                <div 
                  className="flex items-center gap-1 text-[#9b87f5] group-hover:text-[#8b77e5] transition-colors bg-black/50 px-2 py-1 rounded"
                >
                  Read more
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
