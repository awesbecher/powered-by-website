
import { cn } from "@/lib/utils";

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
            Industry Solutions
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-gray-300">
            Discover how our AI voice agents can transform your business operations
            across different industries.
          </p>
        </div>
      </div>
    </div>
  );
};
