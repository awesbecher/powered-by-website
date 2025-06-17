
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
            asChild
          >
            <a
              id="outbound-cta-demo-btn"
              href="https://cal.com/team-powered-by-dfbtbb/get-started-today"
              rel="nofollow noopener"
              data-cal-link="team-powered-by-dfbtbb/get-started-today"
              data-cal-namespace="poweredby"
              data-cal-config='{"layout":"month_view","hideEventTypeDetails":false}'
            >
              Schedule Your Demo Today
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
