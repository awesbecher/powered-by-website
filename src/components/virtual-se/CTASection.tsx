
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  handleContact: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ handleContact }) => {
  return (
    <section className="py-16 my-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#6342ff]/20 to-[#9b87f5]/20 rounded-3xl border border-purple-300/20 backdrop-blur-sm shadow-lg">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to Multiply Your SE Team Effectiveness?
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
          Free up your human SE resources for the highest value engagements while Virtual SE handles routine demos, product walkthroughs, and technical Q&A.
        </p>
        <Button 
          className="bg-[#ea384c] hover:bg-[#d42e40] text-white px-8 py-6 text-lg rounded-md"
          onClick={() => {
            // Open Calendly popup instead of redirecting
            if (window.Calendly) {
              window.Calendly.initPopupWidget({
                url: 'https://calendly.com/teampoweredby/powered_by-demo-virtual-se?hide_gdpr_banner=1'
              });
            }
          }}
        >
          Schedule a Virtual SE Demo <ArrowRight className="ml-2 h-6 w-6" />
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
