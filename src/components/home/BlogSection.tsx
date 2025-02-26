
import { Link } from "react-router-dom";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { samplePosts } from "@/data/blogPosts";

export const BlogSection = () => {
  return (
    <section className="relative z-10 py-16">
      <div className="w-full container mx-auto px-4">
        <h2 className="relative text-5xl font-bold text-white mb-16 transition-colors duration-300 hover:bg-gradient-to-r hover:from-purple-400 hover:to-indigo-400 hover:bg-clip-text hover:text-transparent pt-0 pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-purple-500 after:to-indigo-500">
          Our Latest Insights:
        </h2>
      </div>

      <div className="container mx-auto px-4 overflow-hidden">
        <div className="flex overflow-x-auto pb-6 gap-8 snap-x snap-mandatory scrollbar-none">
          {samplePosts.map((post) => (
            <div key={post.slug} className="flex-none w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] snap-start">
              <Link to={`/blog/${post.slug}`}>
                <BlogPostCard post={post} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
