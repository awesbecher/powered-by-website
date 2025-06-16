import React, { useState } from 'react';

export const VideoIntroSection = () => {
  // YouTube video ID from the URL https://youtu.be/vY4RC4EiUUM?si=g4NGcUTtOTGoXU0W
  const videoId = 'vY4RC4EiUUM';
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl bg-gradient-to-b from-black to-[#1a1a24]">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Intro to AI Voice Chat
        </h2>
      </div>
      <div className="mx-auto max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl shadow-[#6342ff]/20 border border-gray-800">
        {!videoLoaded ? (
          // Video thumbnail with play button
          <div 
            className="w-full h-full bg-black cursor-pointer flex items-center justify-center"
            onClick={() => setVideoLoaded(true)}
          >
            {/* Play button */}
            <div className="w-20 h-20 rounded-full bg-[#9b87f5]/80 flex items-center justify-center hover:bg-[#6342ff] hover:scale-105 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-10 h-10">
                <path d="M8 5.14v14l11-7-11-7z" />
              </svg>
            </div>
          </div>
        ) : (
          // YouTube iframe
          <iframe
            className="w-full h-full border-0"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&si=g4NGcUTtOTGoXU0W`}
            title="Intro to AI Voice Chat"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </section>
  );
};

export default VideoIntroSection;
