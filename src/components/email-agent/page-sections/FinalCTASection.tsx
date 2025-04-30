import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const FinalCTASection = () => {
  const handleGetStarted = () => {
    const calBtn = document.querySelector('[data-cal-link="team-powered-by-dfbtbb/get-started-today"]');
    if (calBtn instanceof HTMLElement) {
      console.log("Cal.com button found, triggering click");
      calBtn.click();
    } else {
      console.error("Cal.com button not found in DOM, navigating to /contact as fallback");
      window.location.href = '/contact';
    }
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="bg-gradient-to-r from-[#6342ff] to-[#9b87f5] rounded-2xl p-8 sm:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Email Communication?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Get started with AI Email Agent today and experience the future of customer service.
          </p>
          <Button 
            className="bg-white hover:bg-gray-100 text-[#6342ff] px-8 py-6 text-lg rounded-md flex items-center gap-2 mx-auto"
            onClick={handleGetStarted}
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Hidden Cal.com button */}
      <button
        className="hidden"
        data-cal-link="team-powered-by-dfbtbb/get-started-today"
        data-cal-config='{"layout":"month_view"}'
      />
    </section>
  );
};