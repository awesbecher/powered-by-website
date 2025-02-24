
export const AnimatedConnections = () => {
  return (
    <svg className="absolute inset-0 w-[400px] h-[400px]" viewBox="0 0 400 400">
      {/* Static Dots */}
      {/* Top Dots */}
      <circle cx="120" cy="40" r="3" fill="#4ade80" /> {/* Top left */}
      <circle cx="280" cy="40" r="3" fill="#4ade80" /> {/* Top right */}
      
      {/* Middle Dots */}
      <circle cx="80" cy="200" r="3" fill="#4ade80" /> {/* Left */}
      <circle cx="320" cy="200" r="3" fill="#4ade80" /> {/* Right */}
      
      {/* Side Middle Dots */}
      <circle cx="140" cy="280" r="3" fill="#4ade80" /> {/* Bottom left */}
      <circle cx="260" cy="280" r="3" fill="#4ade80" /> {/* Bottom right */}
      
      {/* Bottom Dots */}
      <circle cx="160" cy="320" r="3" fill="#4ade80" /> {/* Bottom left */}
      <circle cx="240" cy="320" r="3" fill="#4ade80" /> {/* Bottom right */}
      <circle cx="200" cy="340" r="3" fill="#4ade80" /> {/* Bottom center */}

      {/* Static Hash Lines - All starting from center (200, 200) */}
      {/* Top Lines */}
      <line x1="200" y1="200" x2="120" y2="40" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="200" y1="200" x2="280" y2="40" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" />
      
      {/* Middle Lines */}
      <line x1="200" y1="200" x2="80" y2="200" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="200" y1="200" x2="320" y2="200" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" />
      
      {/* Side Middle Lines */}
      <line x1="200" y1="200" x2="140" y2="280" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="200" y1="200" x2="260" y2="280" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" />
      
      {/* Bottom Lines */}
      <line x1="200" y1="200" x2="160" y2="320" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="200" y1="200" x2="240" y2="320" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="200" y1="200" x2="200" y2="340" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" />
    </svg>
  );
};
