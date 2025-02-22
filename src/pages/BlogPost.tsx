
import { useParams } from "react-router-dom";
import { samplePosts } from "../data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams();
  const post = samplePosts.find((post) => post.slug === slug);

  const getHeroImage = (slug: string) => {
    switch (slug) {
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

  if (!post) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] pt-36">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">Article not found</h1>
          <p className="text-gray-400">The article you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="relative w-full min-h-[60vh] overflow-hidden flex items-center py-20">
        <div className="absolute inset-0">
          <img 
            src={getHeroImage(post.slug)} 
            alt={post.title}
            className="w-full h-full object-cover opacity-50 transition-opacity duration-700 hover:opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e]/60 via-[#2f1c4a]/70 to-[#1a0b2e] mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0b2e] via-transparent to-transparent" />
        </div>
        <div className="relative w-full">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-[#9b87f5] mb-6 drop-shadow-xl bg-[#1a0b2e]/30 p-4 rounded-lg backdrop-blur-sm break-words hyphens-auto">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-8 text-gray-200 text-sm bg-[#1a0b2e]/30 p-3 rounded-lg backdrop-blur-sm inline-block">
              <div className="flex items-center gap-2">
                <span>{post.author}</span>
              </div>
              <div>
                <span>{post.date}</span>
              </div>
              <div>
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl py-16">
        <div 
          className="prose prose-invert max-w-none [&>*]:text-white [&>p]:text-justify prose-h2:text-[#9b87f5] prose-h3:text-[#9b87f5] prose-p:leading-relaxed prose-p:mb-6 prose-li:text-white prose-strong:text-[#D6BCFA] prose-em:text-[#7E69AB] prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-ul:my-6 prose-li:mb-3 prose-a:text-[#9b87f5]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
};

export default BlogPost;
