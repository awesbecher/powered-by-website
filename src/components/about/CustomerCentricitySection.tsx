
import React from "react";

interface CustomerCentricityProps {
  initialLoad: boolean;
}

export const CustomerCentricitySection = ({ initialLoad }: CustomerCentricityProps) => {
  return (
    <div className={`mt-16 p-8 bg-gradient-to-r from-[#2a1a47]/40 to-[#1a0b2e]/40 rounded-xl border border-[#9b87f5]/30 text-left
      transition-all duration-1000 delay-500 ease-out transform max-w-4xl mx-auto backdrop-blur-md shadow-lg
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <div className="mb-4">
        <h2 className="text-3xl font-bold text-white">Customer Centricity</h2>
      </div>
      <p className="text-xl text-gray-300 mb-4">
        Customer centricity is the foundation to our work here. We place the needs, preferences, and success of our customers at the heart of every decision and action. We build genuine relationships with our customers, listen intently to feedback, and commit to your success equalling ours.
      </p>
      <p className="text-xl text-gray-300">
        Advancements in AI are moving at astonishing speed. What the state-of-the-art in agent technology is today might be legacy within a year. When you work with us, you're not just getting a project delivered. You're getting a long-term partner dedicated to ensuring you stay ahead of the AI curve.
      </p>
    </div>
  );
};
