
import React from 'react';
import { PoweredByText } from "@/components/shared/PoweredByText";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const VoiceConfigContent = () => {
  return (
    <main className="relative min-h-[calc(100vh-160px)] w-full bg-[#F9F9FB] flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none" />
      
      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-br from-[#6342ff]/10 to-[#a87cff]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-tr from-[#a87cff]/10 to-[#6342ff]/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 py-12 z-10 flex flex-col items-center">
        <div className="mb-8">
          <PoweredByText className="text-lg" />
        </div>
        
        <Card className="w-full max-w-3xl bg-white shadow-xl rounded-2xl border-0 overflow-hidden">
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
              <div id="playht-agent-container" className="min-h-[450px] w-full flex flex-col items-center justify-center relative bg-gray-50 rounded-xl overflow-hidden">
                {/* Loading state */}
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="relative h-12 w-12">
                    <div className="absolute inset-0 rounded-full border-t-2 border-[#6342ff] animate-spin"></div>
                    <div className="absolute inset-2 rounded-full bg-gradient-to-r from-[#6342ff] to-[#a87cff] opacity-30"></div>
                  </div>
                  <p className="text-gray-500 font-medium">Loading your voice agent...</p>
                </div>
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
        <p className="mt-8 text-center text-gray-500 max-w-lg">
          Your AI agent will be ready to assist you with any questions or tasks.
          Simply start talking when prompted.
        </p>
      </div>
    </main>
  );
};

export default VoiceConfigContent;
