
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const FinalCTASection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl text-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#9b87f5]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#6342ff]/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        <div className="inline-block mb-6 px-3 py-1 bg-[#9b87f5]/10 rounded-full border border-[#9b87f5]/20">
          <span className="text-[#9b87f5] font-medium">Ready to transform your business?</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8">
          Start Engaging Customers with Voice AI Today
        </h2>
        
        <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Join the businesses revolutionizing the way they work, communicate, and engage customers.
          Experience the future of customer interactions now.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            className="bg-[#6342ff] hover:bg-[#5233e0] text-white px-8 py-6 text-lg rounded-md flex items-center shadow-lg shadow-[#6342ff]/20 w-full sm:w-auto"
            data-cal-namespace="get-started-with-voice-ai-chat"
            data-cal-link="team-powered-by-dfbtbb/get-started-with-voice-ai-chat"
            data-cal-config='{"layout":"month_view"}'
          >
            Schedule a Demo <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            className="bg-transparent hover:bg-white/5 text-white border-2 border-white/20 hover:border-white/40 px-8 py-6 text-lg rounded-md flex items-center w-full sm:w-auto"
            onClick={() => window.open('/contact', '_self')}
          >
            Contact Sales
          </Button>
        </div>
        
        {/* Removed Powered_by text */}
      </div>
    </section>
  );
};
