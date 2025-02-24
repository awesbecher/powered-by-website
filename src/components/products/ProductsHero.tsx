
import { cn } from "@/lib/utils";
import { WordAnimation } from "@/components/home/WordAnimation";

interface ProductsHeroProps {
  initialLoad: boolean;
  className?: string;
}

export const ProductsHero = ({ initialLoad, className }: ProductsHeroProps) => {
  return (
    <div className={cn("relative overflow-hidden px-6 lg:px-8 pt-36 pb-8", className)}>
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4">
            <WordAnimation /> Agent Solutions Portfolio
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-tight font-bold">
            We offer a range of pre-built AI agent solutions designed to transform your 
            business operations. Each solution is customizable to meet your specific needs, 
            while allowing for quick deployment to get you started right away.
          </p>
        </div>
      </div>
    </div>
  );
};
