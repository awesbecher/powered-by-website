
import React, { useState, useEffect } from 'react';

interface WordAnimationProps {
  words: string[];
  speed?: number;
  delay?: number;
  className?: string;
}

export const WordAnimation = ({ words, speed = 2000, delay = 200, className = '' }: WordAnimationProps) => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const visibilityInterval = setInterval(() => {
      setVisible(false);
      
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % words.length);
        setVisible(true);
      }, delay);
      
    }, speed);
    
    return () => clearInterval(visibilityInterval);
  }, [words.length, speed, delay]);

  return (
    <span 
      className={`transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0'} ${className}`}
    >
      {words[index]}
    </span>
  );
};
