import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { cn } from '@/lib/utils';

interface WaveformAnimationProps {
  isPlaying: boolean;
}

export const WaveformAnimation: React.FC<WaveformAnimationProps> = ({ isPlaying }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Load the animation
    animationRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: false,
      path: '/assets/animations/waveform.json', // We'll create this animation file
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
        progressiveLoad: true,
      },
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!animationRef.current) return;

    if (isPlaying) {
      animationRef.current.play();
    } else {
      animationRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div 
      ref={containerRef}
      className="h-16 bg-gray-50"
      style={{ 
        '--waveform-color': '#8B5CF6',
      } as React.CSSProperties}
      aria-label={isPlaying ? "Active voice waveform" : "Paused voice waveform"}
      role="img"
    />
  );
};
