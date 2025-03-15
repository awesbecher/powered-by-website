
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  initialLoad: boolean;
}

export const HeroSection = ({ initialLoad }: HeroSectionProps) => {
  return (
    <div className="relative overflow-hidden px-6 lg:px-8 pt-6 pb-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h1 className={`text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6 transition-all duration-1000 ease-out transform
              ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}>
            Just Like a Web Design Firm.<br />
            But with <span className="text-[#9b87f5]">much cooler tech</span>.
          </h1>
          
          <div className={`mt-4 flex flex-col space-y-1 text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-bold transition-all duration-1000 delay-300 ease-out transform
              ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}>
            <p>Why should those Silicon Valley <span className="font-bold text-[#9b87f5] border-b-4 border-[#9b87f5]">nerds</span> have all the fancy AI toys?</p>
          </div>
        </div>
      </div>
      
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
    </div>
  );
};
