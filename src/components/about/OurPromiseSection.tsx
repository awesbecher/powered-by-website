
import React from "react";

interface OurPromiseSectionProps {
  initialLoad: boolean;
}

export const OurPromiseSection = ({ initialLoad }: OurPromiseSectionProps) => {
  return (
    <div className={`mt-16 p-8 bg-gradient-to-r from-[#2a1a47]/40 to-[#1a0b2e]/40 rounded-xl border border-[#9b87f5]/30 text-left
      transition-all duration-1000 delay-700 ease-out transform max-w-4xl mx-auto backdrop-blur-md shadow-lg
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <h2 className="text-3xl font-bold text-white mb-4">Our Promise</h2>
      <p className="text-xl text-gray-300 mb-8">
        You don't need vast resources or pools of cash to run the latest AI agents. You just need a great partner. With <span className="bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md">Powered_by</span>, we're not just building you solutions, we're powering your success. One agent at a time.
      </p>
    </div>
  );
};
