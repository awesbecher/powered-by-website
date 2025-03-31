
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChevronRight, Newspaper, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { newsArticles } from "@/data/blog-posts";
import { pressArticles } from "@/data/press-articles";
import { Card, CardContent } from "@/components/ui/card";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { PoweredByText } from "@/components/shared/PoweredByText";
import { PressArticleCard } from "@/components/news/PressArticleCard";

const News = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] text-white pb-20">
      <Navbar />
      
      {/* Hero Section with Background Image */}
      <div className="relative">
        {/* Background image */}
        <div className="absolute inset-0 z-0 h-[500px] overflow-hidden">
          {/* Modified overlay gradient to be less opaque */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e]/60 via-[#1a0b2e]/70 to-[#1a0b2e] z-10"></div>
          <img 
            src="/lovable-uploads/a53ff8c8-9033-4442-8c48-6cde96e79af7.png"
            alt="Printing press in motion" 
            className="w-full h-full object-cover object-center opacity-60" 
          />
        </div>
        
        {/* Header content */}
        <header className="relative z-10 py-12 pt-20 pb-16 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-shadow">
              <span className="text-white">News &</span> <span className="text-[#9b87f5]">Press Releases</span>
            </h1>
            
            <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto px-4 leading-relaxed text-shadow">
              Stay in the loop with all <PoweredByText /> product launches, new articles, and AI research insights here.
            </p>
          </div>
        </header>
      </div>
      
      {/* Press Coverage Section */}
      <section className="container mx-auto px-4 mb-20 relative z-10">
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-2">
          <span>In The Press</span>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full ml-2"></div>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pressArticles.map((article) => (
            <PressArticleCard key={article.id} article={article} />
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="outline" className="bg-white/5 hover:bg-white/10 border-purple-500 group">
            <span>View Press Kit</span>
            <ExternalLink className="ml-2 h-4 w-4 text-purple-400 group-hover:text-white transition-colors" />
          </Button>
        </div>
      </section>
      
      {/* News Posts Section */}
      <section className="container mx-auto px-4 mb-20 relative z-10">
        {newsArticles.length > 0 ? (
          <>
            <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-2">
              <span>Company News</span>
              <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full ml-2"></div>
            </h2>
            
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
