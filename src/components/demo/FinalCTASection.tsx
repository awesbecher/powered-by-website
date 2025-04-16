
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CTAButton } from "./cta/CTAButton";

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
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
