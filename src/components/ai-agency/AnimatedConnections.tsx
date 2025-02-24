
export const AnimatedConnections = () => {
  return (
    <svg 
      className="absolute inset-0 w-[400px] h-[400px]" 
      viewBox="0 0 400 400"
      style={{ zIndex: 1 }}
    >
      {/* Static Dots */}
      {/* Top Dots */}
      <circle cx="140" cy="10" r="3" fill="#4ade80" /> {/* Top left */}
      <circle cx="260" cy="10" r="3" fill="#4ade80" /> {/* Top right */}
      
      {/* Middle Dots */}
      <circle cx="60" cy="90" r="3" fill="#4ade80" /> {/* Left */}
      <circle cx="340" cy="90" r="3" fill="#4ade80" /> {/* Right */}
      
      {/* Side Middle Dots */}
      <circle cx="120" cy="170" r="3" fill="#4ade80" /> {/* Bottom left */}
      <circle cx="280" cy="170" r="3" fill="#4ade80" /> {/* Bottom right */}
      
      {/* Bottom Dots */}
      <circle cx="160" cy="250" r="3" fill="#4ade80" /> {/* Bottom left */}
      <circle cx="240" cy="250" r="3" fill="#4ade80" /> {/* Bottom right */}
      <circle cx="200" cy="270" r="3" fill="#4ade80" /> {/* Bottom center */}

      {/* Static Hash Lines - All starting from center (200, 90) */}
      {/* Top Lines */}
      <line x1="200" y1="90" x2="140" y2="10" stroke="#9b87f5" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
      <line x1="200" y1="90" x2="260" y2="10" stroke="#9b87f5" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
      
      {/* Middle Lines */}
      <line x1="200" y1="90" x2="60" y2="90" stroke="#9b87f5" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
      <line x1="200" y1="90" x2="340" y2="90" stroke="#9b87f5" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
      
      {/* Side Middle Lines */}
      <line x1="200" y1="90" x2="120" y2="170" stroke="#9b87f5" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
      <line x1="200" y1="90" x2="280" y2="170" stroke="#9b87f5" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
      
      {/* Bottom Lines */}
      <line x1="200" y1="90" x2="160" y2="250" stroke="#9b87f5" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
      <line x1="200" y1="90" x2="240" y2="250" stroke="#9b87f5" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
      <line x1="200" y1="90" x2="200" y2="270" stroke="#9b87f5" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
    </svg>
  );
};
