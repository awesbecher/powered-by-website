
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { PoweredByText } from '@/components/shared/PoweredByText';
import { toast } from "sonner";

const AgentPodcast: React.FC = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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
          toast.success("Podcast started playing");
        } else if (event.data?.event === 'pause') {
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
    
    // Send a message to the iframe to verify connection
    setTimeout(() => {
      if (iframeRef.current) {
        try {
          iframeRef.current.contentWindow?.postMessage({
            action: 'ready-check'
          }, 'https://powered-by-ai-agents.jellypod.ai');
          console.log('Ready check sent to podcast iframe');
        } catch (e) {
          console.error('Error sending message to iframe:', e);
        }
      }
    }, 1000);
  };

  // Function to try playing the podcast manually
  const tryPlayPodcast = () => {
    if (iframeRef.current) {
      try {
        iframeRef.current.contentWindow?.postMessage({
          action: 'play'
        }, 'https://powered-by-ai-agents.jellypod.ai');
        console.log('Play command sent to podcast iframe');
      } catch (e) {
        console.error('Error sending play command to iframe:', e);
      }
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
                <iframe 
                  ref={iframeRef}
                  src="https://powered-by-ai-agents.jellypod.ai/embed?theme=slate&rounded=lg&enable_api=true&mini=true"
                  width="100%" 
                  height="194" 
                  frameBorder="0" 
                  scrolling="no" 
                  allow="autoplay" 
                  title="Powered by AI Agents Podcast Player"
                  className={`shadow-xl rounded-lg ${!iframeLoaded ? 'hidden' : ''}`}
                  onLoad={handleIframeLoad}
                ></iframe>
                
                {iframeLoaded && (
                  <button 
                    onClick={tryPlayPodcast}
                    className="mt-4 px-6 py-2 bg-[#9b87f5] hover:bg-[#8976d9] text-white rounded-lg transition-colors"
                  >
                    Play Podcast
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
