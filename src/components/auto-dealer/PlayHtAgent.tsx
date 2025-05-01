import React, { useState, useCallback } from 'react';
import { PLAYHT_CONFIG } from '@/services/playhtService';

interface Props {
  className?: string;
}

export const PlayHtAgent: React.FC<Props> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleStartChat = useCallback(() => {
    console.log('Opening chat...');
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    console.log('Closing chat...');
    setIsOpen(false);
  }, []);

  return (
    <div className={`text-center ${className}`}>
      <button
        onClick={handleStartChat}
        className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
      >
        Talk to an AI Agent
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full h-full max-w-2xl max-h-[80vh] bg-white rounded-lg shadow-xl p-4">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="w-full h-full">
              <iframe
                src={PLAYHT_CONFIG.embedUrl}
                width="100%"
                height="100%"
                allow="microphone"
                className="rounded-lg"
                style={{ minHeight: '500px' }}
                title="Play.ht Agent"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
