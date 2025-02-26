
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  initialLoad: boolean;
}

export const HeroSection = ({ initialLoad }: HeroSectionProps) => {
  return (
    <div className="relative overflow-hidden px-6 lg:px-8 pt-12 pb-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h1 className={`text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6 transition-all duration-1000 ease-out transform
              ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}>
            Just Like a Web Design Firm. But with <span className="text-[#9b87f5]">much cooler tech</span>.
          </h1>
          
          <p className={`mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-bold transition-all duration-1000 delay-300 ease-out transform
              ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}>
            <span className="text-[#9b87f5]">Powered_by</span> AI for small business. You think of a workflow to automate or a task to agent-enable and we'll build it.
          </p>
        </div>
      </div>
      
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
    </div>
  );
};
