
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { ExternalLink } from "lucide-react";

interface MediaArticle {
  id: string;
  url: string;
  title: string;
  source: string;
  date?: string;
}

const MediaCoverageSection = () => {
  // Load saved articles from localStorage on component mount
  const [articles, setArticles] = useState<MediaArticle[]>([]);
  const [newUrl, setNewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Load articles from localStorage on initial render
  useEffect(() => {
    const savedArticles = localStorage.getItem("mediaArticles");
    if (savedArticles) {
      try {
        setArticles(JSON.parse(savedArticles));
      } catch (error) {
        console.error("Error parsing saved articles:", error);
      }
    }
  }, []);

  // Save articles to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("mediaArticles", JSON.stringify(articles));
  }, [articles]);

  const fetchMetadata = async (url: string) => {
    setIsLoading(true);
    try {
      // In a real implementation, you would use a server function to fetch the HTML
      // and parse it server-side to avoid CORS issues
      
      // For now, we'll simulate extraction with some basic parsing
      const domain = new URL(url).hostname.replace('www.', '');
      const source = domain.split('.')[0];
      
      // Generate a random title for demonstration
      // In production, you would extract this from the page's HTML
      const id = Date.now().toString();
      const title = `Article about Powered_by from ${source.charAt(0).toUpperCase() + source.slice(1)}`;
      
      const newArticle: MediaArticle = {
        id,
        url,
        title,
        source: source.charAt(0).toUpperCase() + source.slice(1),
        date: new Date().toLocaleDateString()
      };
      
      setArticles(prev => [newArticle, ...prev]);
      setNewUrl("");
      toast({
        title: "Article added",
        description: "The article has been added to your media coverage section.",
      });
    } catch (error) {
      console.error("Error parsing URL:", error);
      toast({
        title: "Error adding article",
        description: "Please check the URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;
    
    try {
      // Simple URL validation
      new URL(newUrl);
      fetchMetadata(newUrl);
    } catch (error) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL including http:// or https://",
        variant: "destructive",
      });
    }
  };

  const handleRemoveArticle = (id: string) => {
    setArticles(prev => prev.filter(article => article.id !== id));
    toast({
      title: "Article removed",
      description: "The article has been removed from your media coverage.",
    });
  };

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Media Coverage</h2>
      
      <form onSubmit={handleAddArticle} className="mb-8 max-w-xl mx-auto">
        <div className="flex gap-3">
          <Input
            type="url"
            placeholder="Enter article URL (https://...)"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="bg-[#1f0d35]/50 border-none text-white placeholder:text-gray-400"
            required
          />
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-gradient-to-r from-[#6342ff] to-[#a87cff] text-white hover:from-[#5838e0] hover:to-[#9670ff]"
          >
            {isLoading ? "Adding..." : "Add Article"}
          </Button>
        </div>
      </form>
      
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <a 
              key={article.id} 
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
            >
              <Card className="bg-[#1f0d35]/50 border-none hover:bg-[#2a1347]/80 transition-colors h-full">
                <CardContent className="p-6">
                  <div className="text-sm text-purple-400 mb-2">
                    {article.source} {article.date && `• ${article.date}`}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-purple-300">
                    {article.title}
                  </h3>
                  <div className="flex items-center text-purple-400 hover:text-purple-300 mt-4">
                    Read on {article.source}
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleRemoveArticle(article.id);
                    }}
                    className="mt-4 text-xs text-gray-400 hover:text-red-400"
                  >
                    Remove
                  </button>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-[#1f0d35]/30 rounded-lg max-w-2xl mx-auto">
          <h3 className="text-xl font-medium text-gray-300 mb-2">No media coverage added yet</h3>
          <p className="text-gray-400">
            Add links to articles that mention your company to display them here.
          </p>
        </div>
      )}
    </div>
  );
};

export default MediaCoverageSection;
