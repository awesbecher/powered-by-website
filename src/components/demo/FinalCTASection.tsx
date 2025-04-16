
import { motion } from "framer-motion";
import { ArrowRight, Zap, Rocket, Globe } from "lucide-react";
import { CTAButton } from "./cta/CTAButton";
import { CTAFeatureList } from "./cta/CTAFeatureList";

export const FinalCTASection = () => {
  const handleBookDemo = () => {
    console.log("Final CTA button clicked");
    try {
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

  const ctaFeatures = [
    "Custom AI Agent Solutions",
    "Multi-Channel Communication",
    "Seamless Integration",
    "24/7 Intelligent Support"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 lg:p-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Transform Your Business with AI Agents
              </h2>
              
              <p className="text-xl text-gray-300 mb-8">
                Unlock intelligent, scalable communication solutions that adapt to your unique business needs.
              </p>
              
              <CTAButton 
                data-cal-link="team-powered-by-dfbtbb/get-started-today"
                onClick={handleBookDemo}
                className="bg-[#6342ff] hover:bg-[#5233e0] text-white px-8 py-6 text-lg rounded-xl"
              >
                Book a Demo
              </CTAButton>

              <CTAFeatureList features={ctaFeatures} />
            </div>
            
            <div className="hidden md:flex justify-center items-center space-x-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#9b87f5]/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <Zap className="h-12 w-12 text-[#6342ff] mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Instant Setup</h3>
                  <p className="text-xs text-gray-400">Quick and easy configuration</p>
                </div>
                
                <div className="bg-[#7E69AB]/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <Globe className="h-12 w-12 text-[#9b87f5] mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Global Reach</h3>
                  <p className="text-xs text-gray-400">Connect across channels</p>
                </div>
                
                <div className="bg-[#6E59A5]/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <Rocket className="h-12 w-12 text-[#a87cff] mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Scalable</h3>
                  <p className="text-xs text-gray-400">Grow with your business</p>
                </div>
                
                <div className="bg-[#8B5CF6]/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <ArrowRight className="h-12 w-12 text-[#6342ff] mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Future-Ready</h3>
                  <p className="text-xs text-gray-400">Stay ahead of trends</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
