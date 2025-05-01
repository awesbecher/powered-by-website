import React from 'react';
import { useEffect } from "react";
import Link from "next/link";
import PageLayout from "@/components/layout/PageLayout";
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
    <PageLayout>
      {/* Hero Section with Background Image */}
      <div className="relative">
        {/* Background image */}
        <div className="absolute inset-0 z-0 h-[500px] overflow-hidden">
          {/* Modified overlay gradient to be less opaque */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e]/60 via-[#1a0b2e]/70 to-[#1a0b2e] z-10"></div>
          <img 
            src="/assets/images/a53ff8c8-9033-4442-8c48-6cde96e79af7.png"
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
      <section className="container mx-auto px-4 mt-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Press Coverage</h2>
          <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
            View All Press <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pressArticles.slice(0, 3).map((article) => (
            <PressArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="container mx-auto px-4 mt-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Latest Articles</h2>
          <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
            View All Articles <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsArticles.slice(0, 6).map((article) => (
            <Card key={article.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Newspaper className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                    <p className="text-gray-400 mb-4">{article.excerpt}</p>
                    <div className="flex items-center text-primary">
                      <Link href={`/blog/${article.slug}`} className="flex items-center hover:underline">
                        Read More <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Closing CTA Section */}
      <ClosingCTA customHeading="Ready to Deploy AI Agents for Your Business?" customButtonText="Get Started Today" />
    </PageLayout>
  );
};

export default News;
