
export const AnimatedConnections = () => {
  return (
    <svg 
      className="absolute inset-0 w-[400px] h-[400px]" 
      viewBox="0 0 400 400"
      style={{ zIndex: 1 }}
    >
      {/* Static Dots */}
      {/* Top Dots */}
      <circle cx="100" cy="20" r="3" fill="#4ade80" /> {/* Top left */}
      <circle cx="220" cy="20" r="3" fill="#4ade80" /> {/* Top right */}
      
      {/* Middle Dots */}
      <circle cx="20" cy="100" r="3" fill="#4ade80" /> {/* Left */}
      <circle cx="300" cy="100" r="3" fill="#4ade80" /> {/* Right */}
      
      {/* Side Middle Dots */}
      <circle cx="80" cy="180" r="3" fill="#4ade80" /> {/* Bottom left */}
      <circle cx="240" cy="180" r="3" fill="#4ade80" /> {/* Bottom right */}
      
      {/* Bottom Dots */}
      <circle cx="120" cy="260" r="3" fill="#4ade80" /> {/* Bottom left */}
      <circle cx="200" cy="260" r="3" fill="#4ade80" /> {/* Bottom right */}
      <circle cx="160" cy="280" r="3" fill="#4ade80" /> {/* Bottom center */}

      {/* Static Hash Lines - All starting from center (160, 100) */}
      {/* Top Lines */}
      <line x1="160" y1="100" x2="100" y2="20" stroke="#9b87f5" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
      <line x1="160" y1="100" x2="220" y2="20" stroke="#9b87f5" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
      
      {/* Middle Lines */}
      <line x1="160" y1="100" x2="20" y2="100" stroke="#9b87f5" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
      <line x1="160" y1="100" x2="300" y2="100" stroke="#9b87f5" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
      
      {/* Side Middle Lines */}
      <line x1="160" y1="100" x2="80" y2="180" stroke="#9b87f5" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
      <line x1="160" y1="100" x2="240" y2="180" stroke="#9b87f5" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
      
      {/* Bottom Lines */}
      <line x1="160" y1="100" x2="120" y2="260" stroke="#9b87f5" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
      <line x1="160" y1="100" x2="200" y2="260" stroke="#9b87f5" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
      <line x1="160" y1="100" x2="160" y2="280" stroke="#9b87f5" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
    </svg>
  );
};
