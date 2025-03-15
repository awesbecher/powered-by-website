
import { cn } from "@/lib/utils";

interface ProductsHeroProps {
  initialLoad: boolean;
  className?: string;
}

export const ProductsHero = ({ initialLoad, className }: ProductsHeroProps) => {
  return (
    <div className={cn("relative overflow-hidden px-6 lg:px-8 pt-20 pb-4", className)}>
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <h1 
            className={`text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4 transition-all duration-1000 ease-out transform
              ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}
          >
            Agent <span className="text-[#9b87f5]">Solutions</span> Portfolio
          </h1>
          <p 
            className={`mt-4 text-base md:text-lg lg:text-xl text-gray-300 max-w-5xl mx-auto leading-snug font-bold transition-all duration-1000 delay-300 ease-out transform
              ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}
          >
            <span className="bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md">Powered_by</span> has a portfolio of pre-built AI agents to address vertical-industry & horizontal use cases.
          </p>
        </div>
      </div>
    </div>
  );
};
