
import { WordAnimation } from "./WordAnimation";

interface HeroSectionProps {
  initialLoad: boolean;
}

export const HeroSection = ({ initialLoad }: HeroSectionProps) => {
  return (
    <div className="relative overflow-hidden px-6 lg:px-8 pt-4 pb-4">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 
            className={`text-[64px] sm:text-[96px] font-bold tracking-tight text-white mb-2 transition-all duration-1000 ease-out transform
              ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}
          >
            AI <WordAnimation /> Agents for SMBs
          </h1>
        </div>
      </div>
    </div>
  );
};
