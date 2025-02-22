
import { useParams } from "react-router-dom";
import { samplePosts } from "./Blog";

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
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] pt-36 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-[#9b87f5] mb-6">{post.title}</h1>
        <div className="flex items-center gap-6 mb-8 text-gray-400 text-sm">
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
        <div 
          className="prose prose-invert max-w-none text-white prose-p:text-white prose-li:text-white prose-strong:text-white prose-headings:text-white prose-p:text-justify"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
};

export default BlogPost;
