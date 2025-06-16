import React from 'react';

export const VideoIntroSection = () => {
  // YouTube video ID from the URL https://youtu.be/vY4RC4EiUUM?si=g4NGcUTtOTGoXU0W
  const videoId = 'vY4RC4EiUUM';
  
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl bg-gradient-to-b from-black to-[#1a1a24]">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Intro to AI Voice Chat
        </h2>
      </div>
      <div className="mx-auto max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl shadow-[#6342ff]/20 border border-gray-800 cursor-pointer youtube-container">
        <div className="youtube-player w-full h-full relative" onClick={(e) => {
          const iframe = e.currentTarget.querySelector('iframe');
          if (iframe) {
            // Update src to force video to play when clicked
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&si=g4NGcUTtOTGoXU0W`;
            // Remove thumbnail overlay
            const overlay = e.currentTarget.querySelector('.youtube-thumbnail') as HTMLElement;
            if (overlay) overlay.style.display = 'none';
          }
        }}>
          {/* Thumbnail overlay */}
          <div className="youtube-thumbnail absolute inset-0 flex items-center justify-center">
            <img 
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt="Intro to AI Voice Chat"
              className="w-full h-full object-cover" 
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-[#9b87f5]/80 flex items-center justify-center transition-all duration-300 hover:bg-[#6342ff] hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-10 h-10">
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              </div>
            </div>
          </div>
          
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="about:blank" // Initial blank source, will be updated on click
            title="Intro to AI Voice Chat"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default VideoIntroSection;
