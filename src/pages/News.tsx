import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChevronRight, Newspaper, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { newsArticles } from "@/data/blog-posts";
import { Card, CardContent } from "@/components/ui/card";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { PoweredByText } from "@/components/shared/PoweredByText";

const News = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] text-white pb-20">
      <Navbar />
      
      {/* Updated Header Section with reduced vertical padding */}
      <header className="py-12 pt-20 pb-16 bg-[#2D1044] text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">News &</span> <span className="text-[#9b87f5]">Press Releases</span>
          </h1>
          
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto px-4 leading-relaxed">
            Stay in the loop with all <PoweredByText /> product launches, new articles, and AI research insights here.
          </p>
        </div>
      </header>
      
      {/* News Posts Section */}
      <section className="container mx-auto px-4 mb-20">
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
                      <h3 className="text-2xl font-bold mb-4 text-white">{post.title}</h3>
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
      
      {/* Replace subscription section with ClosingCTA */}
      <ClosingCTA customHeading="Ready to Deploy AI Agents for Your Business?" customButtonText="Get Started Today" />
      
      <Footer />
    </div>
  );
};

export default News;
