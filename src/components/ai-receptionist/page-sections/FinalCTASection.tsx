
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const FinalCTASection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl relative">
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#6342ff]/20 blur-3xl"></div>
      </div>
      
      <div className="relative z-10 bg-gradient-to-r from-[#1f1235]/80 to-[#2a1d45]/80 backdrop-blur-lg p-12 rounded-3xl border border-[#9b87f5]/30 shadow-xl text-center max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Ready to Transform Your Business Communications?
        </h2>
        
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join hundreds of businesses using our AI Receptionist to save costs, improve customer experience, and never miss an opportunity.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            className="w-full sm:w-auto bg-[#6342ff] hover:bg-[#5835e0] text-white px-8 py-6 text-lg rounded-xl flex items-center justify-center gap-2"
            data-cal-link="team-powered-by-dfbtbb/get-started-with-ai-receptionist"
            data-cal-namespace="get-started-with-ai-receptionist"
            data-cal-config='{"layout":"month_view"}'
          >
            <ArrowRight className="w-5 h-5" />
            Schedule Your Demo
          </Button>
          
          <Button 
            className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white px-8 py-6 text-lg rounded-xl flex items-center justify-center border-2 border-white"
            onClick={() => window.open('/ai-receptionist#try-demo', '_self')}
          >
            Try It For Free
          </Button>
        </div>
        
        <p className="mt-6 text-gray-400 text-sm">
          No credit card required. 14-day free trial available.
        </p>
      </div>
    </section>
  );
};
