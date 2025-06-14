
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  handleContact: () => void;
}

const CTASection = ({ handleContact }: CTASectionProps) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6342ff] to-[#a87cff] opacity-90"></div>
        <div className="relative z-10 px-8 py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Outbound Sales Strategy?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Deploy OutboundAI today and see how our intelligent, conversational AI agents can help your team reach more prospects, book more meetings, and close more deals without increasing headcount.
          </p>
          <Button 
            className="bg-white hover:bg-gray-100 text-[#6342ff] font-bold px-8 py-6 text-lg rounded-md"
            onClick={() => {
              if (window.Calendly) {
                window.Calendly.initPopupWidget({
                  url: 'https://calendly.com/d/crwx-mj8-x7y?hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=7800ff'
                });
              }
            }}
          >
            Schedule Your Demo Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
