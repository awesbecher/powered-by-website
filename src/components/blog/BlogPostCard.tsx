
import { Link } from "react-router-dom";
import { Clock, User, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/types/blog";

interface BlogPostCardProps {
  post: BlogPost;
  featured?: boolean;
}

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

export const BlogPostCard = ({ post, featured = false }: BlogPostCardProps) => (
  <Link 
    to={`/blog/${post.slug}`}
    className="block group h-full"
  >
    <div className="bg-white/5 rounded-lg overflow-hidden group-hover:bg-white/10 transition-colors h-full">
      <div className="relative h-full min-h-[600px]">
        <div className="absolute inset-0">
          <img 
            src={getPostImage(post.slug)} 
            alt={post.title}
            className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/90 to-black" />
        </div>
        <div className="relative p-8 flex flex-col h-full">
          <h2 className={cn(
            "font-bold text-white mb-6 group-hover:text-[#9b87f5] transition-colors",
            featured ? "text-3xl" : "text-2xl"
          )}>
            {post.title}
          </h2>
          <p className="text-gray-200 text-lg leading-relaxed mb-8">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-400 mt-auto">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
              <div 
                className="flex items-center gap-1 text-[#9b87f5] group-hover:text-[#8b77e5] transition-colors"
              >
                Read more
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Link>
);
