
import { WordAnimation } from "@/components/home/WordAnimation";

interface ProductsHeroProps {
  initialLoad: boolean;
}

export const ProductsHero = ({ initialLoad }: ProductsHeroProps) => {
  return (
    <div className="relative overflow-hidden px-6 lg:px-8 pt-36">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 
            className={`text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6 transition-all duration-1000 ease-out transform
              ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}
          >
            <WordAnimation />
            Agent{" "}
            <span className="text-[#9b87f5]">
              Solutions Portfolio
            </span>
          </h1>
          
          <p 
            className={`mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ease-out transform
              ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}
          >
            Discover our comprehensive range of pre-built AI solutions designed to transform your business operations. Each solution is customizable to meet your specific needs.
          </p>
        </div>
      </div>
    </div>
  );
};
