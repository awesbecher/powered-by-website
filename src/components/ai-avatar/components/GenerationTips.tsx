
import React from 'react';

const GenerationTips = () => {
  return (
    <div className="mt-2 mb-2 text-xs text-gray-400">
      <p className="font-medium">Tips for a successful generation:</p>
      <ul className="list-disc pl-5 mt-1 space-y-1">
        <li>Use natural, conversational language</li>
        <li>Aim for 3-5 sentences minimum</li>
        <li>Avoid special characters when possible</li>
        <li>Keep your total script under 10,000 characters</li>
      </ul>
    </div>
  );
};

export default GenerationTips;
