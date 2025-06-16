import React, { useState } from 'react';

export const VideoIntroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  return (
    <div className="py-16 bg-gradient-to-b from-[#180D30] to-[#200F3E]">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="bg-gradient-to-r from-[#180D30] to-[#21103B] border border-white/10 rounded-2xl shadow-xl overflow-hidden">
          <div className="aspect-video">
            {!videoLoaded ? (
              // Video thumbnail with play button
              <div 
                className="w-full h-full bg-[#180D30] cursor-pointer flex items-center justify-center"
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
                src="https://www.youtube.com/embed/m2Cy-Bxk4TQ?autoplay=1&si=v4eu_vWDGUcTLjdC"
                title="What's an AI Agency?"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoIntroSection;
