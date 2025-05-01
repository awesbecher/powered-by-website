import { cn } from "@/lib/utils";
import { PoweredByText } from "@/components/shared/PoweredByText";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

interface ProductsHeroProps {
  className?: string;
}

const smoothScroll = (targetId: string) => {
  const element = document.getElementById(targetId);
  if (!element) return;
  
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = elementPosition - startPosition;
  const duration = 1500; // 1.5 seconds
  let start: number | null = null;

  const animation = (currentTime: number) => {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const progress = Math.min(timeElapsed / duration, 1);
    
    // Easing function for smoother animation
    const easeInOutCubic = (progress: number) => {
      return progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    };
    
    window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));
    
    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  };
  
  requestAnimationFrame(animation);
};

const handleCalendarClick = async () => {
  try {
    const cal = await getCalApi();
    cal("ui", {
      theme: "dark",
      styles: { branding: { brandColor: "#000000" } },
    });
  } catch (error) {
    console.error("Error initializing Cal.com:", error);
  }
};

export const ProductsHero = ({ className }: ProductsHeroProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={cn(
        "relative overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36",
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <h1 className="text-4xl font-medium tracking-tight text-white">
              AI Agents for Every Business Need
            </h1>
            <p className="mt-6 text-lg text-gray-300">
              Discover our suite of AI-powered solutions designed to transform your business operations. From customer service to sales automation, we have the perfect agent for your needs.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
              <button
                onClick={() => smoothScroll("voice-chat")}
                className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
              >
                Voice Chat AI
              </button>
              <button
                onClick={() => smoothScroll("chat")}
                className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
              >
                Chat AI
              </button>
              <button
                onClick={() => smoothScroll("email")}
                className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
              >
                Email AI
              </button>
              <button
                onClick={() => smoothScroll("text")}
                className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
              >
                Text AI
              </button>
              <button
                onClick={() => smoothScroll("custom-gpt")}
                className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
              >
                Custom GPT
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductsHero;
