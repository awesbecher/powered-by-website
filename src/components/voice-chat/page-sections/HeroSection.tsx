
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { WebsiteSimulation } from "@/components/voice-chat/WebsiteSimulation";

interface HeroSectionProps {
  initialLoad: boolean;
  handleContact: () => void;
}

export const HeroSection = ({ initialLoad, handleContact }: HeroSectionProps) => {
  const navigate = useNavigate();

  return (
    <section className="pt-28 pb-36 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className={`w-full lg:w-1/2 space-y-6 transition-all duration-1000 ease-out transform
          ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Transform Your Website With <span className="text-[#9b87f5]">AI Voice Chat</span>
          </h1>
          <p className="text-xl text-gray-300">
            Engage website visitors in natural conversations that convert. Unlock new opportunities to upsell and cross-sell. Delight your customers with state-of-the-art in voice AI.
          </p>
          <div className="space-y-4 text-gray-300">
            <p>Deploy Human-like AI Voice Chat Directly on Your Website to:</p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-sm">
              <li>Boost Conversions: Turn visitors into customers with engaging conversations</li>
              <li>Automate Customer Support: Provide immediate answers & reduce response times</li>
              <li>Offer 24/7 Availability: Ensure reliable, personalized support day or night</li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 pt-2">
            <Button 
              className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-8 py-6 text-lg rounded-md"
              onClick={handleContact}
            >
              Speak to our Voice Agent Now & Learn How it Works
            </Button>
            <Button 
              className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-8 py-6 text-lg rounded-md"
              onClick={handleContact}
            >
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className={`w-full lg:w-1/2 transition-all duration-1000 delay-300 ease-out transform
          ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
          <WebsiteSimulation />
        </div>
      </div>
    </section>
  );
};
