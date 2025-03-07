
import { blogPosts } from "@/data/blog-posts";
import { SectionTitle } from "./SectionTitle";
import { BlogCarousel } from "./BlogCarousel";

export const BlogSection = () => {
  return (
    <section className="relative z-10 py-16">
      <div className="container mx-auto px-4">
        <SectionTitle title="Our Latest Insights" />
      </div>

      <div className="container mx-auto px-4 relative">
        <BlogCarousel blogPosts={blogPosts} />
      </div>
    </section>
  );
};

export default BlogSection;
