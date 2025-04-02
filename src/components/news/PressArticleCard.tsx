
import { PressArticle } from "@/types/news";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface PressArticleCardProps {
  article: PressArticle;
}

export const PressArticleCard = ({ article }: PressArticleCardProps) => {
  // Check which card this is to apply the appropriate background
  const isYahooFinance = article.id === "yahoo-finance-ai";
  const isMarketWatch = article.id === "marketwatch-feature";
  const isAssociatedPress = article.id === "associated-press-virtual-se";
  const isSeekingAlpha = article.id === "seeking-alpha-ai-innovation";
  const isMorningStar = article.id === "morningstar-ai-innovation";
  const isKtla = article.id === "ktla-ai-feature";
  const isPrNewswire = article.id === "pr-newswire-ai-agency";
  const isWgn9 = article.id === "wgn9-ai-agency";
  const isPix11News = article.id === "pix11-news-ai-agency";
  
  return (
    <a 
      href={article.externalUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block h-full"
    >
      <Card className="bg-[#1f0d35]/50 border-none hover:bg-[#2a1347]/80 transition-colors h-full">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-3">
            <span className="text-sm text-purple-400">{article.publication}</span>
            <ExternalLink className="h-4 w-4 text-purple-400 flex-shrink-0" />
          </div>
          
          {article.imageUrl && (
            <div className={`mb-4 overflow-hidden rounded-md ${isYahooFinance ? 'bg-purple-800' : ''} ${isMarketWatch || isAssociatedPress || isMorningStar || isKtla || isPrNewswire || isWgn9 ? 'bg-white' : ''} ${isSeekingAlpha ? 'bg-black' : ''} ${isPix11News ? 'bg-black' : ''}`}>
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          
          <h3 className="text-xl font-bold mb-3 text-white">{article.title}</h3>
          <p className="text-gray-300 line-clamp-3 mb-3">{article.excerpt}</p>
          <div className="text-sm text-gray-400">{article.date}</div>
        </CardContent>
      </Card>
    </a>
  );
};

