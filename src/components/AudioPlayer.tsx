
import React, { useEffect, useRef } from 'react';

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

  return (
    <audio 
      ref={audioRef} 
      controls 
      className="w-full max-w-md"
      style={{ display: base64Audio ? 'block' : 'none' }}
    >
      Your browser does not support the audio element.
    </audio>
  );
};
