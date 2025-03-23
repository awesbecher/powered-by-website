
import React, { useState } from "react";
import { Play } from "lucide-react";

export const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <section className="pt-0 pb-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl -mt-8">
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
              Watch our Launch Video
            </div>
          </div>
        ) : (
          <div className="aspect-video">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/OtNDJ9_nv7E?si=hY-guS-6qI14qlO9&autoplay=1" 
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </section>
  );
};
