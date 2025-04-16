
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChevronRight, ArrowRight, ExternalLink, Search, Calendar, Clock, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { newsArticles } from "@/data/blog-posts";
import { pressArticles } from "@/data/press-articles";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { PoweredByText } from "@/components/shared/PoweredByText";
import { PressArticleCard } from "@/components/news/PressArticleCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewsHero } from "@/components/news/NewsHero";
import { NewsCard } from "@/components/news/NewsCard";
import { NewsletterSignup } from "@/components/news/NewsletterSignup";
import { cn } from "@/lib/utils";

const News = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  
  // Filter news based on search query and category filter
  const filteredNews = newsArticles.filter(article => {
    const matchesSearch = searchQuery === "" || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesFilter = activeFilter === "all" || article.category.toLowerCase() === activeFilter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] text-white">
      <Navbar />
      
      {/* Hero Section */}
      <NewsHero />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Search and Filters */}
        <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search for news and articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border-white/10 pl-10 text-white placeholder:text-gray-400 w-full"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto">
            <Badge 
              variant={activeFilter === "all" ? "default" : "outline"}
              className={cn(
                "cursor-pointer py-2 px-4",
                activeFilter === "all" ? "bg-[#9b87f5] hover:bg-[#8976d9]" : "bg-white/5 hover:bg-white/10"
              )}
              onClick={() => setActiveFilter("all")}
            >
              All
            </Badge>
            <Badge 
              variant={activeFilter === "News" ? "default" : "outline"}
              className={cn(
                "cursor-pointer py-2 px-4",
                activeFilter === "News" ? "bg-[#9b87f5] hover:bg-[#8976d9]" : "bg-white/5 hover:bg-white/10"
              )}
              onClick={() => setActiveFilter("News")}
            >
              Company News
            </Badge>
            <Badge 
              variant={activeFilter === "PR Release" ? "default" : "outline"}
              className={cn(
                "cursor-pointer py-2 px-4",
                activeFilter === "PR Release" ? "bg-[#9b87f5] hover:bg-[#8976d9]" : "bg-white/5 hover:bg-white/10"
              )}
              onClick={() => setActiveFilter("PR Release")}
            >
              Press Releases
            </Badge>
          </div>
        </div>
        
        {/* Content Tabs */}
        <Tabs defaultValue="news" className="mb-16">
          <TabsList className="bg-white/5 border border-white/10 mb-8">
            <TabsTrigger value="news" className="data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white">Latest News</TabsTrigger>
            <TabsTrigger value="press" className="data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white">Press Coverage</TabsTrigger>
          </TabsList>
          
          {/* News Tab */}
          <TabsContent value="news" className="animate-fadeIn">
            {filteredNews.length > 0 ? (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Featured Article */}
                  {filteredNews.length > 0 && (
                    <div className="lg:col-span-2 animate-fade-in" style={{animationDelay: '0.1s'}}>
                      <NewsCard article={filteredNews[0]} featured={true} />
                    </div>
                  )}
                
                  {/* Newsletter Signup */}
                  <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
                    <NewsletterSignup />
                  </div>
                </div>
              
                <div className="mt-12">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">All Updates</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Filter className="h-4 w-4" />
                      <span>Sort by:</span>
                      <select className="bg-transparent border-b border-white/30 outline-none">
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNews.map((article, index) => (
                      <div key={article.id} className="animate-fade-in" style={{animationDelay: `${0.1 * (index + 1)}s`}}>
                        <NewsCard article={article} />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-20 bg-white/5 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">No articles found</h3>
                <p className="text-gray-300 mb-8">Try changing your search or filter criteria</p>
                <Button onClick={() => {setSearchQuery(""); setActiveFilter("all");}}>
                  Clear filters
                </Button>
              </div>
            )}
          </TabsContent>
          
          {/* Press Tab */}
          <TabsContent value="press" className="animate-fadeIn">
            <h2 className="text-3xl font-bold mb-8">
              <span className="text-white">In The </span>
              <span className="text-[#9b87f5]">Press</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pressArticles.map((article, index) => (
                <div key={article.id} className="animate-fade-in" style={{animationDelay: `${0.1 * (index + 1)}s`}}>
                  <PressArticleCard article={article} />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* CTA Section with custom heading */}
      <ClosingCTA 
        customHeading="Ready to Transform Your Business with AI?" 
        customButtonText="Schedule a Consultation"
      />
      
      <Footer />
    </div>
  );
};

export default News;
