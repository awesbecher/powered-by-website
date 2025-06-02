
import React, { useEffect, useState } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VoiceConfigContent from "@/components/voice-config/VoiceConfigContent";
import { useToast } from "@/hooks/use-toast";

const VoiceConfig = () => {
  const [playHTLoaded, setPlayHTLoaded] = useState(false);
  const [playHTError, setPlayHTError] = useState<string | null>(null);
  const { toast } = useToast();

  // Inject PlayHT Web SDK and initialization scripts
  useEffect(() => {
    let sdkScript: HTMLScriptElement | null = null;
    let initScript: HTMLScriptElement | null = null;
    
    try {
      // Remove any existing PlayHT scripts first to prevent conflicts
      const existingScripts = document.querySelectorAll('script[src*="play-ai"]');
      existingScripts.forEach(script => script.remove());
      
      // First script for PlayHT Web SDK
      sdkScript = document.createElement('script');
      sdkScript.type = 'text/javascript';
      sdkScript.src = 'https://cdn.jsdelivr.net/npm/@play-ai/agent-web-sdk@ht';
      sdkScript.async = true;
      
      // Add onload event to track successful loading
      sdkScript.onload = () => {
        console.log("PlayHT SDK loaded successfully");
        
        // Second script for agent initialization - only add after SDK loads
        initScript = document.createElement('script');
        initScript.type = 'text/javascript';
        initScript.innerHTML = `
          try {
            window.addEventListener("load", () => {
              if (window.PlayAI) {
                console.log("Initializing PlayAI agent");
                window.PlayAI.open('xswK4S905J5N9KHm7x0gz');
                
                // Custom event listener for when the agent is ready
                window.addEventListener('playaiready', () => {
                  console.log('PlayAI agent is ready');
                  document.dispatchEvent(new CustomEvent('playht-loaded'));
                });
                
                // Set a timeout to check if the agent loaded
                setTimeout(() => {
                  if (document.querySelector('.playht-agent-container')) {
                    document.dispatchEvent(new CustomEvent('playht-loaded'));
                  }
                }, 3000);
              } else {
                console.error("PlayAI not found in window object");
                document.dispatchEvent(new CustomEvent('playht-error', { 
                  detail: { message: "PlayAI SDK not initialized correctly" } 
                }));
              }
            });
          } catch (e) {
            console.error("Error initializing PlayAI:", e);
            document.dispatchEvent(new CustomEvent('playht-error', { 
              detail: { message: e.message || "Unknown initialization error" } 
            }));
          }
        `;
        document.head.appendChild(initScript);
      };
      
      // Add error handling for script loading
      sdkScript.onerror = (e) => {
        console.error("Failed to load PlayHT SDK:", e);
        setPlayHTError("Failed to load PlayHT SDK");
        toast({
          title: "Error loading voice agent",
          description: "Could not load the PlayHT SDK. Please check your internet connection and try again.",
          variant: "destructive",
        });
      };
      
      document.head.appendChild(sdkScript);
      
      // Setup event listeners for custom events
      const handlePlayHTLoaded = () => {
        console.log("PlayHT agent loaded successfully");
        setPlayHTLoaded(true);
      };
      
      const handlePlayHTError = (e: CustomEvent) => {
        console.error("PlayHT error:", e.detail);
        setPlayHTError(e.detail?.message || "Unknown error");
        toast({
          title: "Voice agent error",
          description: e.detail?.message || "An error occurred with the voice agent",
          variant: "destructive",
        });
      };
      
      document.addEventListener('playht-loaded', handlePlayHTLoaded);
      document.addEventListener('playht-error', handlePlayHTError as EventListener);
      
      // Cleanup function to remove scripts and event listeners when component unmounts
      return () => {
        if (sdkScript && document.head.contains(sdkScript)) {
          document.head.removeChild(sdkScript);
        }
        if (initScript && document.head.contains(initScript)) {
          document.head.removeChild(initScript);
        }
        document.removeEventListener('playht-loaded', handlePlayHTLoaded);
        document.removeEventListener('playht-error', handlePlayHTError as EventListener);
      };
    } catch (error) {
      console.error("Error setting up PlayHT:", error);
      setPlayHTError("Error setting up PlayHT");
      toast({
        title: "Error setting up voice agent",
        description: "An unexpected error occurred while setting up the voice agent.",
        variant: "destructive",
      });
    }
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      <VoiceConfigContent playHTLoaded={playHTLoaded} playHTError={playHTError} />
      <Footer />
    </div>
  );
};

export default VoiceConfig;
