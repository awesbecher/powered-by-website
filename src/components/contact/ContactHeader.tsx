
import React from 'react';

interface ContactHeaderProps {
  initialLoad: boolean;
}

export const ContactHeader = ({ initialLoad }: ContactHeaderProps) => {
  return (
    <div 
      className={`transition-all duration-1000 ease-out
        ${initialLoad ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
    >
      <h1 className="text-5xl font-bold text-white text-center mb-4">
        <span className="text-[#9b87f5]">Get Started</span> Today
      </h1>
      <p className="text-lg text-white text-center mb-2">
        Ready to put AI agents to work? Book a Free Consultation with the Powered_by Team! In this 30-min meeting, we will demo our AI agent solutions, explore use case more deeply, & uncover where they could apply to your business. Use the calendar below to find time to schedule with us.
      </p>
    </div>
  );
};
