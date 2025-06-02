import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { openCalendarModal, useCalendarInitialization } from '@/utils/calendarUtils';

export const FinalCTASection = () => {
  // Use the centralized calendar initialization hook
  useCalendarInitialization("get-started-today");

  const handleGetStarted = async () => {
    // Use the centralized calendar utility with async/await
    if (!await openCalendarModal("team-powered-by-dfbtbb/get-started-with-ai-sms-text-agents")) {
      console.error("Failed to open Cal.com modal, navigating to /contact as fallback");
      window.location.href = '/contact';
    }
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="bg-gradient-to-r from-[#6342ff] to-[#9b87f5] rounded-2xl p-8 sm:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Text Communication?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Get started with AI Text Agent today and experience the future of customer service.
          </p>
          <Button 
            className="bg-white hover:bg-gray-100 text-[#6342ff] px-8 py-6 text-lg rounded-md flex items-center gap-2 mx-auto"
            onClick={handleGetStarted}
            data-cal-namespace="get-started-today"
            data-cal-link="team-powered-by-dfbtbb/get-started-with-ai-sms-text-agents"
            data-cal-config='{"layout":"month_view"}'
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};