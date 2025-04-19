
import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface AudioPlayerProps {
  base64Audio?: string | null;
  src?: string | null;
  accentColor?: string;
  controls?: boolean;
  autoplay?: boolean;
}

export const AudioPlayer = ({ 
  base64Audio, 
  src, 
  accentColor = '#8B5CF6', 
  controls = true, 
  autoplay = true 
}: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audioSource = base64Audio || src;
    if (audioSource && audioRef.current) {
      audioRef.current.src = base64Audio 
        ? `data:audio/wav;base64,${audioSource}` 
        : audioSource;
      audioRef.current.load();
    }
  }, [base64Audio, src]);

  // Only render if audio source exists
  if (!base64Audio && !src) return null;

  return (
    <div 
      style={{ 
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '16px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
        maxWidth: '600px',
        margin: '32px auto'
      }}
    >
      <audio 
        ref={audioRef} 
        controls={controls}
        autoPlay={autoplay}
        style={{ 
          width: '100%',
          accentColor: accentColor,
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          padding: '6px',
          background: 'transparent'
        }}
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};
