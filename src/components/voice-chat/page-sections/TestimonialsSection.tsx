import React from "react";
import { Star } from "lucide-react";

interface TestimonialProps {
  quote: string;
  author: string;
  company: string;
  imageSrc?: string;
  stats?: string;
}

const Testimonial = ({ quote, author, company, imageSrc, stats }: TestimonialProps) => {
  return (
    <div className="bg-[#1a1a24] p-6 sm:p-8 rounded-xl border border-gray-800 h-full flex flex-col">
      <div className="flex mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      
      <blockquote className="text-gray-300 mb-6 flex-grow">
        "{quote}"
      </blockquote>
      
      <div className="flex items-center mt-auto">
        {imageSrc ? (
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
            <img src={imageSrc} alt={author} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-[#9b87f5]/20 flex items-center justify-center mr-4">
            <span className="text-[#9b87f5] font-bold text-lg">{author.charAt(0)}</span>
          </div>
        )}
        
        <div>
          <p className="font-semibold text-white">{author}</p>
          <p className="text-sm text-gray-400">{company}</p>
        </div>
      </div>
      
      {stats && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-[#9b87f5] font-bold">{stats}</p>
        </div>
      )}
    </div>
  );
};

export const TestimonialsSection = () => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      {/* Intentionally left empty, removing all testimonial boxes */}
    </section>
  );
};
