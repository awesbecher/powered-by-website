
import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface AudioPlayerProps {
  base64Audio: string | null;
}

export const AudioPlayer = ({ base64Audio }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (base64Audio && audioRef.current) {
      audioRef.current.src = `data:audio/wav;base64,${base64Audio}`;
      audioRef.current.load();
    }
  }, [base64Audio]);

  if (!base64Audio) return null;

  return (
    <div className="w-full max-w-[600px] mx-auto my-6">
      <Card className="border border-white/10">
        <CardContent className="p-3">
          <audio 
            ref={audioRef} 
            controls 
            autoPlay
            className="w-full rounded-xl"
            style={{ 
              accentColor: '#8B5CF6',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              padding: '6px',
              background: 'transparent'
            }}
          >
            Your browser does not support the audio element.
          </audio>
        </CardContent>
      </Card>
    </div>
  );
};
