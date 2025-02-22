
import { Link } from "react-router-dom";
import { Clock, User, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/types/blog";

interface BlogPostCardProps {
  post: BlogPost;
  featured?: boolean;
}

export const BlogPostCard = ({ post, featured = false }: BlogPostCardProps) => (
  <Link 
    to={`/blog/${post.slug}`}
    className="block group"
  >
    <div className={cn(
      "bg-white/5 rounded-lg overflow-hidden group-hover:bg-white/10 transition-colors",
      featured ? "col-span-full lg:col-span-2" : ""
    )}>
      <div className="p-6">
        <h2 className={cn(
          "font-bold text-white mb-3 group-hover:text-[#9b87f5] transition-colors",
          featured ? "text-3xl" : "text-xl"
        )}>
          {post.title}
        </h2>
        <p className={cn(
          "text-gray-400 mb-4",
          featured ? "line-clamp-3" : "line-clamp-2"
        )}>
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-400">
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
  </Link>
);
