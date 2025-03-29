
import React from 'react';

export const InstructionsText: React.FC = () => {
  return (
    <div className="text-center text-gray-400 text-sm">
      <p>Click the microphone to ask a question. The AI will respond based on our knowledge base.</p>
      <p className="mt-1">For best results, speak clearly and ask specific questions.</p>
      <p className="mt-1">You can select your preferred language from the dropdown menu or leave it on auto-detect.</p>
    </div>
  );
};
