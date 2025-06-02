import React from 'react';

interface VoiceWaveformProps {
  isActive: boolean;
}

export const VoiceWaveform: React.FC<VoiceWaveformProps> = ({ isActive }) => {
  return (
    <div className="flex items-center justify-center gap-[2px] h-4">
      {[...Array(16)].map((_, i) => (
        <div
          key={i}
          className={`
            w-[3px] rounded-full bg-white/80
            transition-all duration-150 ease-in-out
            ${isActive ? 'animate-voice-wave' : 'h-1'}
            ${isActive ? `animation-delay-${(i * 60) % 1000}` : ''}
          `}
          style={{
            animationDelay: isActive ? `${(i * 60) % 1000}ms` : '0ms'
          }}
        />
      ))}
    </div>
  );
};
