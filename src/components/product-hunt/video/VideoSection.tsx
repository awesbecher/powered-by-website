
import React, { useState } from "react";
import { Play } from "lucide-react";

export const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="max-w-4xl mx-auto relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-r from-[#1a0b2e] to-[#2f1c4a] border border-white/10">
        {!isPlaying ? (
          <div className="aspect-video relative flex items-center justify-center cursor-pointer group" onClick={handlePlayClick}>
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300"></div>
            
            <button 
              className="relative z-10 w-20 h-20 flex items-center justify-center rounded-full bg-[#9b87f5]/90 group-hover:bg-[#9b87f5] transition-all duration-300 transform group-hover:scale-110"
            >
              <Play className="w-10 h-10 text-white fill-white ml-1" />
            </button>
            
            <div className="absolute bottom-6 left-6 text-white text-xl font-medium z-10 bg-black/60 px-4 py-2 rounded-lg">
              Watch Demo
            </div>
          </div>
        ) : (
          <div className="aspect-video">
            <video 
              className="w-full h-full" 
              controls 
              autoPlay
              src="/lovable-uploads/your-uploaded-video.mp4" // Replace with the actual uploaded video path
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
      <div className="max-w-2xl mx-auto text-center mt-6 text-gray-300 text-sm">
        <p>See how our AI agents can transform your business operations and customer interactions.</p>
      </div>
    </section>
  );
};
