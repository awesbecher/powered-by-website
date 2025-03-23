
import React, { useState } from "react";
import { Play } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
            {/* Custom thumbnail image */}
            <img 
              src="/lovable-uploads/21245db4-d879-4add-9238-10f627230a98.png"
              alt="Introducing: POWERED_BY AGENCY - Custom AI Agents for SMBs" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
            
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

      {/* David's section */}
      <div className="max-w-4xl mx-auto mt-8 flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-[#1a0b2e]/80 to-[#2f1c4a]/80 p-6 rounded-xl border border-white/10">
        <div className="shrink-0">
          <Avatar className="h-16 w-16 border-2 border-[#9b87f5]/50">
            <AvatarImage 
              src="/lovable-uploads/7b166531-de46-44f6-9ce0-e480e95c055b.png"
              alt="David, an AI agent" 
            />
            <AvatarFallback>DA</AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full text-white">
          <p className="text-lg leading-relaxed">
            David is actually one of our AI agents himself. If you'd like, you can email him directly at{" "}
            <a href="mailto:david@poweredby.agency" className="text-[#9b87f5] hover:underline">
              david@poweredby.agency
            </a>. Or even send him a text @ <a href="sms:+14085506231" className="text-[#9b87f5] hover:underline">(408) 550-6231</a> to learn more about AI agents.
          </p>
        </div>
      </div>
    </section>
  );
};
