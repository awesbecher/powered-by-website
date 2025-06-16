import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getCalApi } from "@calcom/embed-react";

export const FinalCTABanner = () => {
  // Initialize Cal.com with direct API approach
  useEffect(() => {
    (async function() {
      try {
        const cal = await getCalApi({"namespace":"get-started-today"});
        cal("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#292929"},"dark":{"cal-brand":"#fafafa"}},"hideEventTypeDetails":false,"layout":"month_view"});
        
        // Preload calendar link
        cal("preload", { calLink: "team-powered-by-dfbtbb/get-started-today" });
        console.log("Cal.com embed initialized successfully in FinalCTABanner");
      } catch (error) {
        console.error("Error initializing Cal.com in FinalCTABanner:", error);
      }
    })();
  }, []);
  // Function to manually trigger Cal.com modal using direct API
  const triggerCalModal = async () => {
    try {
      console.log("Attempting to trigger Cal.com modal using direct API from FinalCTABanner");
      // Get fresh instance of Cal API
      const cal = await getCalApi({"namespace":"get-started-today"});
      
      // Configure UI
      cal("ui", {
        "cssVarsPerTheme": {
          "light": {"cal-brand":"#292929"},
          "dark": {"cal-brand":"#fafafa"}
        },
        "hideEventTypeDetails": false,
        "layout": "month_view"
      });
      
      // Directly open the calendar modal
      cal("modal", { calLink: "team-powered-by-dfbtbb/get-started-today" });
      console.log("Cal.com modal opened from FinalCTABanner");
    } catch (error) {
      console.error("Failed to trigger Cal.com modal from FinalCTABanner:", error);
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="bg-gradient-to-r from-[#9b87f5]/20 to-[#6342ff]/20 rounded-2xl p-8 md:p-12 border border-white/10 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-0">
                Ready to deploy your first AI agent?
              </h2>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button
                onClick={triggerCalModal}
                className="inline-flex items-center px-6 py-3 bg-[#6342ff] hover:bg-[#6342ff]/80 text-white font-semibold rounded-lg transition-colors duration-200"
                data-cal-link="team-powered-by-dfbtbb/get-started-today"
                data-cal-config='{"layout":"month_view"}'
              >
                Get Started Now!
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              
              <Link
                to="/demo"
                className="text-[#9b87f5] hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                Explore our AI Agent Demos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
