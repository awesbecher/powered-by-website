import React from 'react';

export const VideoIntroSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl bg-gradient-to-b from-[#1a0b2e] to-[#2f1c4a]">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          How Does an AI Email Agent Work?
        </h2>
      </div>
      <div className="mx-auto max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl shadow-[#6342ff]/20 border border-gray-800">
        <iframe 
          className="w-full h-full"
          src="https://www.youtube.com/embed/xhNEpFzvX5A?si=qbolPwlaBdfmd4MH" 
          title="How Does an AI Email Agent Work?"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default VideoIntroSection;
