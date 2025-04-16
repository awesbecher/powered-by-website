
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const TechnicalSection = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <svg className="absolute right-0 bottom-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="techGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6342ff" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#9b87f5" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,100 L100,0 L100,100 L0,100 Z" fill="url(#techGradient)"></path>
        </svg>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-[#9b87f5] to-[#6342ff] bg-clip-text text-transparent">
            How Our AI Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A peek behind the scenes of our advanced AI architecture that powers seamless, human-like interactions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Flow Diagram */}
          <div className="bg-[#1a0f2e]/60 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 relative">
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-3xl">
              <div className="w-[400px] h-[400px] rounded-full bg-[#6342ff]/5 blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6 text-white">
                AI Agent Architecture
              </h3>
              
              <div className="relative">
                {/* Input Stage */}
                <div className="relative mb-16">
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h4 className="text-lg font-bold text-white mb-2">Input Processing</h4>
                    <p className="text-gray-300">Voice recognition, natural language understanding, and intent classification</p>
                  </div>
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 h-12 w-0.5 bg-gradient-to-b from-[#6342ff] to-[#9b87f5]"></div>
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-8 w-8 rounded-full border-2 border-[#9b87f5] flex items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-[#6342ff]"></div>
                  </div>
                </div>
                
                {/* Processing Stage */}
                <div className="relative mb-16">
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h4 className="text-lg font-bold text-white mb-2">AI Processing Engine</h4>
                    <p className="text-gray-300">Context management, knowledge base integration, and response generation</p>
                  </div>
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 h-12 w-0.5 bg-gradient-to-b from-[#6342ff] to-[#9b87f5]"></div>
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-8 w-8 rounded-full border-2 border-[#9b87f5] flex items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-[#6342ff]"></div>
                  </div>
                </div>
                
                {/* Output Stage */}
                <div className="relative">
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h4 className="text-lg font-bold text-white mb-2">Output Delivery</h4>
                    <p className="text-gray-300">High-quality voice synthesis, text formatting, or channel-specific delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Key Technical Features */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-white">
              Technical Capabilities
            </h3>
            
            <div className="space-y-6">
              <div className="bg-[#1a0f2e]/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-[#6342ff]/50 transition-all duration-300">
                <h4 className="text-xl font-bold text-white mb-3 flex items-center">
                  <span className="inline-block w-6 h-6 rounded-full bg-[#6342ff] mr-3"></span>
                  Advanced Language Models
                </h4>
                <p className="text-gray-300 pl-9">
                  Our AI agents use state-of-the-art large language models that understand context, nuance, and complex queries with remarkable accuracy.
                </p>
              </div>
              
              <div className="bg-[#1a0f2e]/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-[#6342ff]/50 transition-all duration-300">
                <h4 className="text-xl font-bold text-white mb-3 flex items-center">
                  <span className="inline-block w-6 h-6 rounded-full bg-[#6342ff] mr-3"></span>
                  Multi-Channel Integration
                </h4>
                <p className="text-gray-300 pl-9">
                  Seamlessly connect with customers across voice, SMS, email, and chat platforms with consistent AI personality and capabilities.
                </p>
              </div>
              
              <div className="bg-[#1a0f2e]/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-[#6342ff]/50 transition-all duration-300">
                <h4 className="text-xl font-bold text-white mb-3 flex items-center">
                  <span className="inline-block w-6 h-6 rounded-full bg-[#6342ff] mr-3"></span>
                  Business Systems Integration
                </h4>
                <p className="text-gray-300 pl-9">
                  Connect directly to your CRM, ERP, or custom databases for real-time data access and updates during customer interactions.
                </p>
              </div>
              
              <div className="bg-[#1a0f2e]/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-[#6342ff]/50 transition-all duration-300">
                <h4 className="text-xl font-bold text-white mb-3 flex items-center">
                  <span className="inline-block w-6 h-6 rounded-full bg-[#6342ff] mr-3"></span>
                  Learning & Improvement
                </h4>
                <p className="text-gray-300 pl-9">
                  Our AI models continuously learn from interactions to improve response quality and handling of edge cases over time.
                </p>
              </div>
            </div>
            
            <div className="mt-10">
              <Button 
                data-cal-link="team-powered-by-dfbtbb/get-started-today"
                onClick={() => {
                  console.log("Technical Section CTA clicked");
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
                    console.error("Failed to open Cal.com modal from Technical Section:", err);
                  }
                }}
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl border border-gray-700"
              >
                Schedule a Technical Walkthrough
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
