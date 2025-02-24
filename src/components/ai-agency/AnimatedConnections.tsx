
export const AnimatedConnections = () => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
      {/* Static Dots */}
      {/* Top Dots */}
      <circle cx="160" cy="40" r="3" fill="#4ade80" /> {/* Top left */}
      <circle cx="240" cy="40" r="3" fill="#4ade80" /> {/* Top right */}
      
      {/* Middle Dots */}
      <circle cx="100" cy="120" r="3" fill="#4ade80" /> {/* Left */}
      <circle cx="300" cy="120" r="3" fill="#4ade80" /> {/* Right */}
      
      {/* Side Middle Dots */}
      <circle cx="120" cy="180" r="3" fill="#4ade80" /> {/* Bottom left */}
      <circle cx="280" cy="180" r="3" fill="#4ade80" /> {/* Bottom right */}
      
      {/* Bottom Dots */}
      <circle cx="160" cy="220" r="3" fill="#4ade80" /> {/* Bottom left */}
      <circle cx="240" cy="220" r="3" fill="#4ade80" /> {/* Bottom right */}
      <circle cx="200" cy="240" r="3" fill="#4ade80" /> {/* Bottom center */}

      {/* Static Hash Lines - All starting from center (160, 120) */}
      {/* Top Lines */}
      <line x1="160" y1="120" x2="160" y2="40" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="160" y1="120" x2="240" y2="40" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" />
      
      {/* Middle Lines */}
      <line x1="160" y1="120" x2="100" y2="120" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="160" y1="120" x2="300" y2="120" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" />
      
      {/* Side Middle Lines */}
      <line x1="160" y1="120" x2="120" y2="180" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="160" y1="120" x2="280" y2="180" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" />
      
      {/* Bottom Lines */}
      <line x1="160" y1="120" x2="160" y2="220" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="160" y1="120" x2="240" y2="220" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="160" y1="120" x2="200" y2="240" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" />
    </svg>
  );
};
