
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChevronRight, Newspaper, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { newsArticles } from "@/data/blog-posts";
import { Card, CardContent } from "@/components/ui/card";

const News = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] text-white pb-20">
      <Navbar />
      <header className="py-16 pt-36 text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
          News & Press Releases
        </h1>
        <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto px-4">
          Stay up-to-date with our latest announcements, PR releases, and company news
        </p>
      </header>
      
      {/* News Posts Section */}
      <section className="container mx-auto px-4">
        {newsArticles.length > 0 ? (
          <>
            <h2 className="text-3xl font-bold mb-8 text-center">Latest News</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {newsArticles.map((post) => (
                <Link 
                  key={post.id} 
                  to={`/blog/${post.slug}`}
                  className="block"
                >
                  <Card className="bg-[#1f0d35]/50 border-none hover:bg-[#2a1347]/80 transition-colors h-full">
                    <CardContent className="p-8">
                      <div className="text-sm text-purple-400 mb-3">
                        {post.category} • {post.date}
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
                      <p className="text-gray-300 mb-6 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center text-purple-400 hover:text-purple-300 mt-auto">
                        Read more
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <Newspaper className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">No news articles yet</h2>
            <p className="text-gray-300 mb-8 max-w-md mx-auto">
              We're working on our latest press releases and news articles. Check back soon for updates!
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild variant="outline" className="bg-white/5 hover:bg-white/10 border-purple-500">
                <Link to="/blog">
                  View Blog Posts
                </Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-[#6342ff] to-[#a87cff] text-white hover:from-[#5838e0] hover:to-[#9670ff]">
                <Link to="/">
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        )}
      </section>
      
      {/* Subscribe Section */}
      <section className="container mx-auto px-4 mt-20">
        <div className="bg-white/5 rounded-xl p-8 text-center max-w-3xl mx-auto backdrop-blur-sm border border-white/10">
          <h2 className="text-2xl font-bold mb-4">Stay Updated with Our News</h2>
          <p className="text-gray-300 mb-6">
            Subscribe to receive our latest press releases and company announcements directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Button className="bg-gradient-to-r from-[#6342ff] to-[#a87cff] text-white hover:from-[#5838e0] hover:to-[#9670ff]">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default News;
