import { Link } from "react-router-dom";
import { Clock, User, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/types/blog";
import { useLocation } from "react-router-dom";

interface BlogPostCardProps {
  post: BlogPost;
  featured?: boolean;
  externalUrl?: string;
}

const getPostImage = (slug: string) => {
  switch (slug) {
    case "understanding-ai-agents":
      return "/lovable-uploads/b9c7959b-bd61-40d9-b0b3-317a40353486.png";
    case "ai-agents-trillion-market-opportunity":
      return "/lovable-uploads/248b1b18-6411-432d-8281-dc0d70f64a28.png";
    case "workflow-automation-ai-agents-vs-rpa":
      return "/lovable-uploads/13d3a8ff-b938-4d03-9efe-99fe283b96fe.png";
    case "build-or-buy-ai-agents-evaluation":
      return "/lovable-uploads/02977ad8-a831-4b23-909d-7010d4bb02b6.png";
    case "openai-anthropic-smb-specialized-partners":
      return "/lovable-uploads/f971b5e9-817b-426a-9db0-5db472970633.png";
    case "voice-ai-retail-customer-service":
      return "/lovable-uploads/ba13be0d-77b7-49f3-aa99-9524e25c5294.png";
    case "saas-customer-engagement-automation":
      return "/lovable-uploads/d2c09a06-b1ad-4f03-bcc5-6ea523b06f41.png";
    case "human-like-ai-secrets":
      return "/lovable-uploads/ba7183d3-c2d6-46b1-b51e-afa9de2b5af2.png";
    case "practical-ways-smbs-use-conversational-agents":
      return "/lovable-uploads/57b14d49-eab1-4dd2-827d-dceb363f5514.png";
    case "customer-service-evolution":
      return "/lovable-uploads/8505af38-6a90-44dc-b6bc-554d254475ea.png";
    case "breaking-down-ai-fears-smb":
      return "/lovable-uploads/e504e0c0-aac1-498a-9e32-e6e42a133dee.png";
    case "ai-voice-customer-service":
      return "/lovable-uploads/ec9dd264-4bb3-4b03-9b50-e31383652af9.png";
    case "future-of-ai-interactions":
      return "/lovable-uploads/d496422a-1cc8-4b83-9d26-16bfda3ac8ed.png";
    case "ai-driven-personalization":
      return "/lovable-uploads/e305eace-d64d-4437-9d8e-533d49b3d934.png";
    default:
      return "/lovable-uploads/af07ee0c-70fa-4261-a83e-98ef6108f8ae.png"; // Default image
  }
};

export const BlogPostCard = ({ post, featured = false, externalUrl }: BlogPostCardProps) => {
  const location = useLocation();
  const isOnBlogPage = location.pathname === "/blog";

  const CardContent = () => (
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
  );

  if (externalUrl) {
    return (
      <a 
        href={externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block group text-white"
      >
        <CardContent />
      </a>
    );
  }

  return (
    <Link 
      to={`/blog/${post.slug}`}
      className="block group text-white"
    >
      <CardContent />
    </Link>
  );
};
