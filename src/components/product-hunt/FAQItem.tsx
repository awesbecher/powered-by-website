
import React from "react";

interface FAQItemProps {
  question: string;
  answer: string;
}

export const FAQItem = ({ question, answer }: FAQItemProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-3">{question}</h3>
      <p className="text-gray-300">
        {answer}
      </p>
    </div>
  );
};
