
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
    <Card className="w-full max-w-md mx-auto shadow-sm">
      <CardContent className="p-4">
        <audio 
          ref={audioRef} 
          controls 
          autoPlay
          className="w-full rounded-lg py-3 accent-[#8B5CF6]"
          style={{ 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            background: 'transparent'
          }}
        >
          Your browser does not support the audio element.
        </audio>
      </CardContent>
    </Card>
  );
};
