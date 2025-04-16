
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NewsArticle } from '@/types/news';
import { motion } from 'framer-motion';

interface NewsCardProps {
  article: NewsArticle;
  featured?: boolean;
}

export const NewsCard = ({ article, featured = false }: NewsCardProps) => {
  const getArticleImage = (id: string) => {
    // This is just a placeholder - you would map article IDs to image URLs
    switch (id.substring(0, 5)) {
      case 'launc':
        return "/lovable-uploads/ec9dd264-4bb3-4b03-9b50-e31383652af9.png";
      case 'voice':
        return "/lovable-uploads/ba13be0d-77b7-49f3-aa99-9524e25c5294.png";
      case 'futur':
        return "/lovable-uploads/d496422a-1cc8-4b83-9d26-16bfda3ac8ed.png";
      case 'perso':
        return "/lovable-uploads/e305eace-d64d-4437-9d8e-533d49b3d934.png";
      default:
        return "/lovable-uploads/af07ee0c-70fa-4261-a83e-98ef6108f8ae.png";
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className={`bg-[#1f0d35]/50 rounded-xl overflow-hidden shadow-lg border border-[#9b87f5]/20 h-full flex flex-col`}
    >
      {/* Card Image */}
      <div className="relative">
        <img 
          src={getArticleImage(article.id)}
          alt={article.title}
          className={`w-full object-cover ${featured ? 'h-72' : 'h-56'}`}
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-[#9b87f5]">{article.category}</Badge>
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-xs text-gray-400 mb-3 gap-4">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>5 min read</span>
          </div>
        </div>
        
        <Link to={`/blog/${article.slug}`} className="group">
          <h3 className={`${featured ? 'text-2xl' : 'text-xl'} font-bold text-white mb-3 group-hover:text-[#9b87f5] transition-colors`}>
            {article.title}
          </h3>
        </Link>
        
        <p className="text-gray-300 mb-6 line-clamp-3">{article.excerpt}</p>
        
        <div className="mt-auto">
          <Button asChild variant="ghost" className="text-[#9b87f5] hover:text-white hover:bg-[#9b87f5]/20 p-0 flex items-center gap-2">
            <Link to={`/blog/${article.slug}`}>
              Read Article
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
