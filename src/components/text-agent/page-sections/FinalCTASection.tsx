
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { PoweredByText } from "@/components/shared/PoweredByText";

export const FinalCTASection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-6xl text-center">
      {/* CTA Card with gradient background */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6342ff] to-[#9b87f5] opacity-90"></div>
        
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
        
        <div className="relative z-10 px-8 py-16">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white/20 p-3 rounded-full">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
            Ready to transform your SMB with AI agents?
          </h2>
          
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            Join the businesses revolutionizing the way they work, communicate, & engage customers.
          </p>
          
          <div className="flex justify-center items-center">
            <Button 
              data-cal-namespace="get-started-with-ai-sms-text-agents"
              data-cal-link="team-powered-by-dfbtbb/get-started-with-ai-sms-text-agents"
              data-cal-config='{"layout":"month_view"}'
              className="bg-white hover:bg-gray-100 text-[#6342ff] px-8 py-6 text-lg rounded-xl font-bold flex items-center"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
