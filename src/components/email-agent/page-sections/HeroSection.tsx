
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { HeroContent } from "./HeroContent";
import { TallyFormEmbed } from "@/components/voice-chat/TallyFormEmbed";

interface HeroSectionProps {
  initialLoad: boolean;
  handleContact: () => void;
}

export const HeroSection = ({ initialLoad, handleContact }: HeroSectionProps) => {
  const { toast } = useToast();

  return (
    <section className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl overflow-hidden">
      {/* Envelope background image - positioned absolutely */}
      <div className="absolute top-16 right-12 w-[400px] h-[400px] pointer-events-none opacity-15 select-none z-0">
        <img 
          src="/lovable-uploads/f91f05ea-4227-4ab9-94c0-8588b4a3efa8.png" 
          alt="Envelope" 
          className="w-full h-full object-contain"
          fetchPriority="high"
        />
      </div>
      
      {/* Background gradients similar to AI Agency page */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-[#9b87f5]/20 blur-3xl opacity-20 z-0" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#9b87f5]/30 blur-3xl opacity-20 z-0" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 relative z-10">
        {/* Left side - Hero content */}
        <div className="lg:col-span-6">
          <HeroContent initialLoad={initialLoad} handleContact={handleContact} />
        </div>
        
        {/* Right side - Tally.so form */}
        <div className="lg:col-span-6">
          <div className={`mt-8 lg:mt-0 transition-all duration-1000 delay-300 ease-out transform
            ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            <div className="rounded-[2rem] border border-white/50 p-5 overflow-hidden">
              <TallyFormEmbed 
                formId="mRjo4p"
                height={420}
                transparentBackground={true}
                alignLeft={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
