import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

export const VoiceWaveform = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Load the animation
    animationRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/assets/animations/voice-waveform.json',
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
        progressiveLoad: true,
      },
    });

    // Add floating particles
    const particles = Array.from({ length: 20 }, (_, i) => {
      const particle = document.createElement('div');
      particle.className = `absolute w-1 h-1 rounded-full bg-purple-500/20 animate-float`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 2}s`;
      containerRef.current?.appendChild(particle);
      return particle;
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
      }
      particles.forEach(particle => particle.remove());
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5 animate-gradient"
        style={{ backgroundSize: '200% 200%' }}
      />
      
      {/* Waveform container */}
      <div 
        ref={containerRef}
        className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/10"
        aria-label="Voice waveform visualization"
        role="img"
      />

      {/* Glass overlay */}
      <div className="absolute inset-0 backdrop-blur-[2px]" />
    </div>
  );
};
