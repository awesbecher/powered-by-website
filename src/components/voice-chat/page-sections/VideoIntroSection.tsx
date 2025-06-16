import React, { useState } from 'react';

export const VideoIntroSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // YouTube video ID extracted from the URL
  const videoId = 'wCSt1ZTXJSc';
  
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl bg-gradient-to-b from-black to-[#1a1a24]">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Intro to AI Voice Chat
        </h2>
      </div>
      <div className="mx-auto max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl shadow-[#6342ff]/20 border border-gray-800 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6342ff]"></div>
          </div>
        )}
        <iframe 
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&showinfo=0&modestbranding=1`}
          title="Intro to AI Voice Chat"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen
          onLoad={() => setIsLoading(false)}
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
};

export default VideoIntroSection;
