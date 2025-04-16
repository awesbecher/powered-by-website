
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CTAButton } from "./cta/CTAButton";
import { CTAFeatureList } from "./cta/CTAFeatureList";

export const FinalCTASection = () => {
  const handleBookDemo = () => {
    console.log("Final CTA button clicked");
    try {
      // Direct modal trigger approach
      (window as any).Cal?.('ui', {
        styles: { branding: { brandColor: '#6342ff' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
      (window as any).Cal?.('showModal', {
        calLink: "team-powered-by-dfbtbb/get-started-today",
        config: {
          layout: 'month_view',
        },
      });
    } catch (err) {
      console.error("Failed to open Cal.com modal from Final CTA:", err);
    }
  };

  const handleTryDemos = () => {
    document.getElementById('interactive-demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  const ctaFeatures = [
    "No credit card required",
    "Custom solution planning",
    "Technical discussion with experts"
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#6342ff]/10 blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#9b87f5]/10 blur-[100px]"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <div className="bg-gradient-to-r from-[#1a0f2e] to-[#2a1c43] rounded-3xl border border-[#6342ff]/30 overflow-hidden shadow-2xl shadow-[#6342ff]/10">
          <div className="relative px-8 py-16 md:p-16">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden">
              <svg className="absolute top-0 right-0 h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMinYMin slice">
                <defs>
                  <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6342ff" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#9b87f5" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <circle cx="900" cy="200" r="600" fill="url(#circleGradient)" />
              </svg>
            </div>
            
            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Ready to transform your business with AI?
                </h2>
                
                <p className="text-xl text-gray-300 mb-8">
                  Join the companies revolutionizing customer engagement with intelligent AI agents. Schedule a personalized demo today.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <CTAButton 
                    data-cal-link="team-powered-by-dfbtbb/get-started-today"
                    onClick={handleBookDemo}
                    className="bg-[#6342ff] hover:bg-[#5233e0] text-white px-8 py-6 text-lg rounded-xl"
                  >
                    Book a Demo
                  </CTAButton>
                  
                  <CTAButton 
                    onClick={handleTryDemos}
                    variant="outline" 
                    className="bg-transparent border border-[#6342ff]/50 hover:bg-[#6342ff]/20 text-white px-8 py-6 text-lg rounded-xl"
                  >
                    Try Demos Again
                  </CTAButton>
                </div>
                
                <CTAFeatureList features={ctaFeatures} />
              </div>
              
              <div className="hidden md:block relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f2e] via-transparent to-transparent z-20"></div>
                <img 
                  src="/lovable-uploads/2855384c-487c-46d3-90a0-b663019ac215.png" 
                  alt="AI agent visualization" 
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
