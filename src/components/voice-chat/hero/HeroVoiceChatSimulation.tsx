import React, { useEffect, useState } from 'react';
import { ChatBubble } from './ChatBubble';
import { WaveformAnimation } from './WaveformAnimation';
import { AudioControls } from './AudioControls';
import { cn } from '@/lib/utils';

const CHAT_SEQUENCE = [
  {
    id: 1,
    text: "Hello, I need help finding a specific product...",
    isUser: true,
    delay: 1000,
  },
  {
    id: 2,
    text: "I'd be happy to help you find what you're looking for! What type of product are you interested in?",
    isUser: false,
    delay: 3000,
  },
  {
    id: 3,
    text: "I'm looking for a wireless gaming headset under $200",
    isUser: true,
    delay: 6000,
  },
  {
    id: 4,
    text: "Great choice! Based on your budget, I'd recommend the SteelSeries Arctis 7. It has excellent sound quality, comfortable fit, and is currently on sale for $149.99. Would you like to know more about its features?",
    isUser: false,
    delay: 8000,
  },
];

export const HeroVoiceChatSimulation = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);

  useEffect(() => {
    if (!isPlaying) return;

    // Show messages sequentially
    const messageTimers = CHAT_SEQUENCE.map(({ id, delay }) => {
      return setTimeout(() => {
        setVisibleMessages(prev => [...prev, id]);
      }, delay);
    });

    // Update time counter
    const timeInterval = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= 15) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => {
      messageTimers.forEach(timer => clearTimeout(timer));
      clearInterval(timeInterval);
    };
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (!isPlaying) {
      setVisibleMessages([]);
      setCurrentTime(0);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Device Frame */}
      <div className="relative bg-white rounded-[2.5rem] shadow-2xl p-6 aspect-[9/19] overflow-hidden">
        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-gray-100 flex items-center justify-between px-6">
          <div className="w-16 h-2 bg-black rounded-full" />
          <div className="w-16 h-2 bg-black rounded-full" />
        </div>

        {/* Dynamic Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl" />

        {/* Waveform */}
        <div className="mt-8 mb-4" aria-label="Voice chat waveform visualization">
          <WaveformAnimation isPlaying={isPlaying} />
        </div>

        {/* Chat Container */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-20">
          {CHAT_SEQUENCE.map((message) => (
            <ChatBubble
              key={message.id}
              message={message}
              isVisible={visibleMessages.includes(message.id)}
            />
          ))}
        </div>

        {/* Audio Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
          <AudioControls
            isPlaying={isPlaying}
            currentTime={currentTime}
            onPlayPause={handlePlayPause}
          />
        </div>
      </div>
    </div>
  );
};
