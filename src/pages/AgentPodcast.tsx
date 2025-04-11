
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { PoweredByText } from '@/components/shared/PoweredByText';
import { toast } from "sonner";
import { Play, Pause } from "lucide-react";

const AgentPodcast: React.FC = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setInitialLoad(false);
    window.scrollTo(0, 0);
    
    // Add event listener for messages from the iframe
    const handleIframeMessages = (event: MessageEvent) => {
      // Only handle messages from our podcast domain
      if (event.origin === 'https://powered-by-ai-agents.jellypod.ai') {
        console.log('Received message from podcast iframe:', event.data);
        
        // Show toast when playback state changes
        if (event.data?.event === 'play') {
          setIsPlaying(true);
          toast.success("Podcast started playing");
        } else if (event.data?.event === 'pause') {
          setIsPlaying(false);
          toast.info("Podcast paused");
        }
      }
    };
    
    window.addEventListener('message', handleIframeMessages);
    return () => window.removeEventListener('message', handleIframeMessages);
  }, []);

  const handleIframeLoad = () => {
    console.log('Podcast iframe loaded');
    setIframeLoaded(true);
  };

  // Function to play/pause the podcast
  const togglePlayPodcast = () => {
    if (!iframeRef.current) return;
    
    // Create a new URL based on the current src
    const url = new URL(iframeRef.current.src);
    
    // Update the action parameter
    url.searchParams.set('action', isPlaying ? 'pause' : 'play');
    
    // Add a timestamp to force the iframe to recognize the parameter change
    url.searchParams.set('t', Date.now().toString());
    
    // Update the iframe src with the new URL
    iframeRef.current.src = url.toString();
    
    console.log(`Sending ${isPlaying ? 'pause' : 'play'} command to podcast iframe:`, url.toString());
    
    // Update local state immediately for better UX
    if (!isPlaying) {
      setIsPlaying(true);
      toast.success("Playing podcast...");
    } else {
      setIsPlaying(false);
      toast.info("Pausing podcast...");
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
              
              {/* Podcast Player */}
              <div className={`mt-10 mx-auto max-w-3xl transition-all duration-1000 delay-500 ease-out transform
                  ${initialLoad ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                {!iframeLoaded && (
                  <div className="bg-white/5 rounded-lg h-[194px] flex items-center justify-center">
                    <div className="text-white">Loading podcast player...</div>
                  </div>
                )}
                
                <div className="relative rounded-lg overflow-hidden">
                  <iframe 
                    ref={iframeRef}
                    src="https://powered-by-ai-agents.jellypod.ai/embed?theme=slate&rounded=lg&mini=true&enable_api=true"
                    width="100%" 
                    height="194" 
                    frameBorder="0" 
                    scrolling="no" 
                    title="Powered by AI Agents Podcast Player"
                    className={`shadow-xl rounded-lg ${!iframeLoaded ? 'hidden' : ''}`}
                    onLoad={handleIframeLoad}
                    allow="autoplay"
                  ></iframe>
                </div>
                
                {iframeLoaded && (
                  <button 
                    onClick={togglePlayPodcast}
                    className="mt-6 px-6 py-3 bg-[#9b87f5] hover:bg-[#8976d9] text-white rounded-lg transition-colors flex items-center justify-center mx-auto gap-2"
                    aria-label={isPlaying ? "Pause podcast" : "Play podcast"}
                  >
                    {isPlaying ? (
                      <>
                        <Pause size={18} />
                        <span>Pause Podcast</span>
                      </>
                    ) : (
                      <>
                        <Play size={18} />
                        <span>Play Podcast</span>
                      </>
                    )}
                  </button>
                )}
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
