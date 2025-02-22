import { Clock, User } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  slug: string;
  category: string;
}

const samplePosts: BlogPost[] = [{
  id: "1",
  title: "Implementing AI Agents in Customer Service",
  excerpt: "Learn how AI agents can transform your customer service operations and improve satisfaction rates.",
  author: "Jane Smith",
  date: "March 15, 2024",
  readTime: "5 min read",
  slug: "ai-agents-customer-service",
  category: "AI Innovation"
}, {
  id: "2",
  title: "The Future of Business Automation",
  excerpt: "Discover how modern businesses are leveraging AI to automate routine tasks and boost productivity.",
  author: "John Doe",
  date: "March 14, 2024",
  readTime: "7 min read",
  slug: "future-business-automation",
  category: "Automation"
}, {
  id: "3",
  title: "AI Integration Success Stories",
  excerpt: "Real-world examples of successful AI agent implementations in small and medium-sized businesses.",
  author: "Sarah Johnson",
  date: "March 13, 2024",
  readTime: "6 min read",
  slug: "ai-integration-success-stories",
  category: "Case Studies"
}];

const BlogPostCard = ({
  post
}: {
  post: BlogPost;
}) => <div className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors">
    <div className="p-6">
      <div className="text-sm text-[#9b87f5] font-medium mb-2">{post.category}</div>
      <h2 className="text-xl font-bold text-white mb-3 hover:text-[#9b87f5] transition-colors">
        {post.title}
      </h2>
      <p className="text-gray-400 mb-4 line-clamp-2">
        {post.excerpt}
      </p>
      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <span>{post.author}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{post.readTime}</span>
        </div>
      </div>
    </div>
  </div>;

const Blog = () => {
  return <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] pt-36">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden px-6 lg:px-8 pb-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                Delivering the state of the art in <span className="text-[#9b87f5]">AI agents</span> to SMBs.
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-bold">
                AI agents aren't just tools—they're game-changers. For small to medium-sized businesses, they mean doing more with less, delighting customers, and unlocking growth you didn't think was possible. 
              </p>
            </div>
          </div>
          
          <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto mt-16 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {samplePosts.map(post => <BlogPostCard key={post.id} post={post} />)}
          </div>
        </div>
      </div>
    </div>;
};

export default Blog;
