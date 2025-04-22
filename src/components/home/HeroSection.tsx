
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  subtitle?: string;
  initialLoad?: boolean;
}

export const HeroSection = ({ subtitle, initialLoad }: HeroSectionProps) => {
  const [loaded, setLoaded] = useState(!initialLoad);

  useEffect(() => {
    if (initialLoad) {
      const timer = setTimeout(() => {
        setLoaded(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [initialLoad]);

  // Function to create ripple effect on button click
  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.querySelector(".ripple");
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  return (
    <section className="hero-2025 relative overflow-hidden" aria-label="Hero 2025">
      {/* Background grid and glow effect */}
      <div className="hero-2025-grid"></div>
      <div className="hero-2025-glow"></div>
      
      <div className="hero-2025-container flex flex-col items-center justify-center relative z-10">
        {/* Badge */}
        <div className={`hero-2025-badge hero-animate hero-badge ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          AI Agents for Small & Medium Businesses
        </div>
        
        {/* Heading */}
        <h1 className={`hero-2025-title text-white text-center hero-animate hero-title ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          Custom AI Agents for SMBs
        </h1>
        
        {/* Subtitle */}
        <p className={`hero-2025-subtitle text-white/90 text-center hero-animate hero-subtitle ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          Super-smart AI Agents That Talk, Text, &amp; Email. Go Live Fast. Scale Even Faster.
        </p>
        
        {/* CTA Buttons */}
        <div className={`cta-group hero-animate hero-cta ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <Link to="/contact">
            <button 
              className="cta-primary ripple-container"
              onClick={createRipple}
            >
              What's an AI Agent?
            </button>
          </Link>
          
          <Link to="/demo">
            <button 
              className="cta-primary ripple-container"
              onClick={createRipple}
            >
              Try Demos
            </button>
          </Link>
          
          <Link to="/contact">
            <button className="cta-secondary">
              Talk to an AI Agent now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
