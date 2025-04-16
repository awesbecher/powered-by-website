
import { cn } from "@/lib/utils";
import { PoweredByText } from "@/components/shared/PoweredByText";
import { motion } from "framer-motion";
import { OptimizedImage } from "@/components/shared/OptimizedImage";

interface ProductsHeroProps {
  initialLoad: boolean;
  className?: string;
}

export const ProductsHero = ({ initialLoad, className }: ProductsHeroProps) => {
  return (
    <motion.div 
      className={cn("relative overflow-hidden px-6 lg:px-8 pt-20 pb-12", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center relative z-10">
          <motion.h1 
            className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Empower SMB Growth with <span className="text-[#9b87f5]">PoweredBy's AI Agent Solutions</span>
          </motion.h1>
          
          <motion.p 
            className="mt-4 text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore products engineered to drive your success. <PoweredByText /> offers a comprehensive suite of AI agents that transform how businesses operate and engage with their customers.
          </motion.p>
          
          <motion.div 
            className="mt-8 flex justify-center gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a 
              href="#featured-solutions" 
              className="bg-gradient-to-r from-[#6342ff] to-[#a87cff] text-white px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-all duration-300 flex items-center gap-2"
            >
              Explore Solutions
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </a>
            
            <a 
              href="#contact" 
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-md font-semibold transition-colors"
              data-cal-link="team-powered-by-dfbtbb/get-started-today"
              data-cal-namespace="get-started-today"
            >
              Schedule a Demo
            </a>
          </motion.div>
        </div>
        
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[#1a0b2e]/30 backdrop-blur-sm"></div>
          <OptimizedImage 
            src="/lovable-uploads/7e5ffc92-3c33-4a4a-8d6d-add3197d2f2f.png" 
            alt="AI network visualization" 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover opacity-20"
            priority={true}
          />
        </div>
      </div>
    </motion.div>
  );
};
