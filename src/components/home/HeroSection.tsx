
import { Link } from "react-router-dom";
import { NavigationButtons } from "@/components/home/NavigationButtons";
import { WordAnimation } from "./WordAnimation";

interface HeroSectionProps {
  initialLoad: boolean;
}

export const HeroSection = ({ initialLoad }: HeroSectionProps) => {
  return (
    <div className="relative overflow-hidden px-6 lg:px-8 pt-36 pb-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 
            className={`text-[64px] sm:text-[96px] font-bold tracking-tight text-white mb-2 transition-all duration-1000 ease-out transform
              ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}
          >
            Custom <WordAnimation /> AI for SMBs
          </h1>
          
          <p 
            className={`mt-0 text-xl md:text-2xl text-gray-300 mx-auto leading-tight font-bold text-center px-4 transition-all duration-1000 delay-300 ease-out transform
              ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}
          >
            Powered by AI. Run by small business. Why should those Silicon Valley <span className="font-extrabold text-purple-400">nerds</span> have all the fancy AI toys?
          </p>

          <div className={`mt-12 transition-all duration-1000 delay-500 ease-out transform
            ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            <NavigationButtons />
          </div>
        </div>
      </div>
    </div>
  );
};
