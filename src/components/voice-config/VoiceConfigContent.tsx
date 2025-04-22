
import React, { useState, useEffect } from 'react';
import { PoweredByText } from "@/components/shared/PoweredByText";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VoiceConfigContentProps {
  playHTLoaded?: boolean;
}

const VoiceConfigContent: React.FC<VoiceConfigContentProps> = ({ playHTLoaded = false }) => {
  const { toast } = useToast();
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  // Set a timeout to show an error message if the agent doesn't load within 15 seconds
  useEffect(() => {
    if (playHTLoaded) return;
    
    const timeoutId = setTimeout(() => {
      setLoadingTimeout(true);
    }, 15000);
    
    return () => clearTimeout(timeoutId);
  }, [playHTLoaded]);

  // Function to refresh the page
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <main className="relative flex-1 w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] flex flex-col items-center justify-center overflow-hidden py-12">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none" />
      
      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-br from-[#6342ff]/10 to-[#a87cff]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-tr from-[#a87cff]/10 to-[#6342ff]/10 rounded-full blur-3xl" />
      
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotPattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#9b87f5" fillOpacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotPattern)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 z-10 flex flex-col items-center">
        <div className="mb-8">
          <PoweredByText className="text-lg" />
        </div>
        
        <Card className="w-full max-w-3xl bg-black/20 backdrop-blur-md shadow-xl rounded-2xl border border-white/10 overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-[#6342ff] to-[#a87cff] p-6 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
                Let's Build Your AI Agent
              </h1>
              
              <p className="text-center text-white/90 text-lg">
                Talk to our voice assistant and we'll handle the rest
              </p>
            </div>
            
            <div className="p-8">
              {/* Agent container */}
              <div id="playht-agent-container" className="min-h-[450px] w-full flex flex-col items-center justify-center relative bg-black/30 rounded-xl overflow-hidden border border-white/10">
                {/* Loading state */}
                {!playHTLoaded && (
                  <div className="flex flex-col items-center justify-center gap-4">
                    {!loadingTimeout ? (
                      <>
                        <div className="relative h-12 w-12">
                          <div className="absolute inset-0 rounded-full border-t-2 border-[#6342ff] animate-spin"></div>
                          <div className="absolute inset-2 rounded-full bg-gradient-to-r from-[#6342ff] to-[#a87cff] opacity-30"></div>
                        </div>
                        <p className="text-gray-300 font-medium">Loading your voice agent...</p>
                      </>
                    ) : (
                      <div className="text-center p-6">
                        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">Voice Agent Failed to Load</h3>
                        <p className="text-gray-300 mb-6">We're having trouble connecting to the voice service.</p>
                        <Button 
                          variant="outline" 
                          onClick={handleRetry}
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Retry
                        </Button>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Success state - this will be hidden until agent loads */}
                {playHTLoaded && (
                  <div className="absolute top-4 left-4 bg-green-500/20 text-green-300 px-3 py-1 rounded-full flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 mr-1" /> Agent connected
                  </div>
                )}
              </div>
              
              {/* Optional additional CTA */}
              <div className="mt-8 flex justify-center">
                <Button variant="ghost" className="text-[#6342ff] hover:bg-[#6342ff]/10">
                  Need help? Contact support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Additional info text */}
        <p className="mt-8 text-center text-gray-400 max-w-lg">
          Your AI agent will be ready to assist you with any questions or tasks.
          Simply start talking when prompted.
        </p>
      </div>
    </main>
  );
};

export default VoiceConfigContent;
