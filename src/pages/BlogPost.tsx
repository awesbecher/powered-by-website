
import { useParams } from "react-router-dom";
import { samplePosts } from "../data/blogPosts";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BlogPost = () => {
  const { slug } = useParams();
  const post = samplePosts.find((post) => post.slug === slug);

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
      <div className="relative w-full min-h-[30vh] overflow-hidden flex items-center py-8 pt-32">
        <div className="absolute top-0 w-full h-[1px] bg-white/20" />
        <div className="relative w-full">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-[#9b87f5] mb-2 drop-shadow-xl bg-[#1a0b2e]/70 p-4 rounded-lg backdrop-blur-sm break-words hyphens-auto">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-gray-200 text-sm bg-[#1a0b2e]/70 p-3 rounded-lg backdrop-blur-sm inline-block">
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

      <div className="container mx-auto px-4 max-w-4xl py-6">
        <div 
          className="prose prose-invert max-w-none [&>*]:text-white [&>p]:text-justify prose-h2:text-[#9b87f5] prose-h3:text-[#9b87f5] [&>p]:leading-relaxed [&>p]:mb-8 prose-li:text-white prose-strong:text-[#D6BCFA] prose-em:text-[#7E69AB] prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-ul:my-6 prose-li:mb-3 prose-a:text-[#9b87f5] [&>hr]:my-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      {/* Book a Consultation Button */}
      <div className="container mx-auto px-4 max-w-4xl py-12">
        <div className="flex justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-[#9b87f5] hover:bg-[#8b77e5] rounded-lg transition-colors duration-200"
          >
            Book a Consultation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;

