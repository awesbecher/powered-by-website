
import { cn } from "@/lib/utils";
import { WordAnimation } from "@/components/home/WordAnimation";

interface ProductsHeroProps {
  initialLoad: boolean;
  className?: string;
}

export const ProductsHero = ({ initialLoad, className }: ProductsHeroProps) => {
  return (
    <div className={cn("relative overflow-hidden pt-16 pb-20", className)}>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            <WordAnimation /> Agent Solutions Portfolio
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-gray-300">
            While we approach each new client with custom solutions to meet their needs, 
            we have a range of pre-built AI agent solutions designed to transform your 
            business operations. Each solution is customizable to meet your specific needs 
            but it is templated to allow you to deploy very quickly. Explore these pre-built 
            solutions below.
          </p>
        </div>
      </div>
    </div>
  );
};
