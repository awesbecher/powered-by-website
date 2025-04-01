
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PoweredByText } from "@/components/shared/PoweredByText";
import { useEffect } from "react";

interface FinalCTASectionProps {
  handleContact: () => void;
}

export const FinalCTASection = ({ handleContact }: FinalCTASectionProps) => {
  useEffect(() => {
    // Load Calendly script if it doesn't exist
    if (!window.Calendly) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
      
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, []);

  // Function to open Calendly popup
  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/d/crr5-c3g-q3z?hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=7100ff'
      });
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
        Stop missing important text messages.
        <br />
        Start engaging customers with <span className="italic text-[#9b87f5]">intelligent</span> conversations.
      </h2>
      <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
        Boost response rates, improve customer satisfaction, and enhance your business communications—all with the power of a <PoweredByText /> AI Text Agent.
      </p>
      <Button 
        className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-8 py-6 text-lg rounded-md mx-auto"
        onClick={openCalendly}
      >
        Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </section>
  );
};
