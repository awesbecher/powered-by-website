
import React, { useEffect, useState } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VoiceConfigContent from "@/components/voice-config/VoiceConfigContent";
import { useToast } from "@/hooks/use-toast";

const VoiceConfig = () => {
  const [playHTLoaded, setPlayHTLoaded] = useState(false);
  const { toast } = useToast();

  // Inject PlayHT Web SDK and initialization scripts
  useEffect(() => {
    let sdkScript: HTMLScriptElement | null = null;
    let initScript: HTMLScriptElement | null = null;
    
    try {
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
            addEventListener("load", () => {
              if (window.PlayAI) {
                console.log("Initializing PlayAI agent");
                PlayAI.open('xswK4S905J5N9KHm7x0gz');
                document.dispatchEvent(new CustomEvent('playht-loaded'));
              } else {
                console.error("PlayAI not found in window object");
              }
            });
          } catch (e) {
            console.error("Error initializing PlayAI:", e);
          }
        `;
        document.head.appendChild(initScript);
      };
      
      // Add error handling for script loading
      sdkScript.onerror = (e) => {
        console.error("Failed to load PlayHT SDK:", e);
        toast({
          title: "Error loading voice agent",
          description: "Please check your internet connection and try again.",
          variant: "destructive",
        });
      };
      
      document.head.appendChild(sdkScript);
      
      // Setup event listener for custom event
      const handlePlayHTLoaded = () => {
        console.log("PlayHT agent loaded successfully");
        setPlayHTLoaded(true);
      };
      
      document.addEventListener('playht-loaded', handlePlayHTLoaded);
      
      // Cleanup function to remove scripts when component unmounts
      return () => {
        if (sdkScript && document.head.contains(sdkScript)) {
          document.head.removeChild(sdkScript);
        }
        if (initScript && document.head.contains(initScript)) {
          document.head.removeChild(initScript);
        }
        document.removeEventListener('playht-loaded', handlePlayHTLoaded);
      };
    } catch (error) {
      console.error("Error setting up PlayHT:", error);
      toast({
        title: "Error setting up voice agent",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      <VoiceConfigContent playHTLoaded={playHTLoaded} />
      <Footer />
    </div>
  );
};

export default VoiceConfig;
