
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { PoweredByText } from '@/components/shared/PoweredByText';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';

const AgentPodcast: React.FC = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setInitialLoad(false);
    window.scrollTo(0, 0);
  }, []);
  
  const togglePlayPause = () => {
    if (!iframeRef.current) return;
    
    try {
      // Send postMessage to the Jellypod iframe to control playback
      iframeRef.current.contentWindow?.postMessage({
        action: isPlaying ? 'pause' : 'play'
      }, 'https://powered-by-ai-agents.jellypod.ai');
      
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Error controlling podcast playback:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      <main className="flex-grow">
        <div className="relative overflow-hidden px-6 lg:px-8 pt-16 pb-16">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h1 className={`text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6 transition-all duration-1000 ease-out transform
                  ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}>
                Powered by AI Agents Podcast
              </h1>
              
              <div className={`mt-4 text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ease-out transform
                  ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}>
                <p>Join <PoweredByText /> as we explore how AI agents are transforming the way businesses work, communicate, & engage customers.</p>
              </div>
              
              {/* Custom Play Button */}
              <div className="mt-8 flex justify-center">
                <Button 
                  onClick={togglePlayPause}
                  className="rounded-full w-16 h-16 bg-[#9b87f5] hover:bg-[#8a74e8] text-white flex items-center justify-center transition-all duration-300"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8 ml-1" />
                  )}
                </Button>
              </div>
              
              {/* Podcast Player */}
              <div className={`mt-8 mx-auto max-w-3xl transition-all duration-1000 delay-500 ease-out transform
                  ${initialLoad ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                <iframe 
                  ref={iframeRef}
                  src="https://powered-by-ai-agents.jellypod.ai/embed?theme=slate&rounded=lg&mini=true"
                  width="100%" 
                  height="194" 
                  frameBorder="0" 
                  scrolling="no" 
                  allow="autoplay" 
                  title="Powered by AI Agents Podcast Player"
                  className="shadow-xl rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
          
          <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AgentPodcast;
