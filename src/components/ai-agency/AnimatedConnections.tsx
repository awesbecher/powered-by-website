
export const AnimatedConnections = () => {
  return (
    <svg 
      className="absolute inset-0 w-[400px] h-[400px]" 
      viewBox="0 0 400 400"
      style={{ zIndex: 1 }}
    >
      {/* Static Dots */}
      {/* Top Dots */}
      <circle cx="50" cy="70" r="3" fill="#4ade80" /> {/* Top left - Mail icon */}
      <circle cx="250" cy="50" r="3" fill="#4ade80" /> {/* Top right - Moved right */}
      
      {/* Middle Dots */}
      <circle cx="20" cy="100" r="3" fill="#4ade80" /> {/* Left - Adjusted to robot icon */}
      <circle cx="300" cy="100" r="3" fill="#4ade80" /> {/* Right */}
      
      {/* Side Middle Dots */}
      <circle cx="80" cy="180" r="3" fill="#4ade80" /> {/* Bottom left */}
      <circle cx="210" cy="180" r="3" fill="#4ade80" /> {/* Bottom right - Moved left */}
      
      {/* Bottom Dots */}
      <circle cx="120" cy="260" r="3" fill="#4ade80" /> {/* Bottom left */}
      <circle cx="200" cy="260" r="3" fill="#4ade80" /> {/* Bottom right */}
      <circle cx="160" cy="280" r="3" fill="#4ade80" /> {/* Bottom center */}

      {/* Static Hash Lines - All starting from center (160, 100) */}
      {/* Top Lines */}
      <line x1="160" y1="100" x2="50" y2="70" stroke="#9b87f5" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" /> {/* Mail icon line */}
      <line x1="160" y1="100" x2="250" y2="50" stroke="#9b87f5" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" /> {/* Top right line - Moved right */}
      
      {/* Middle Lines */}
      <line x1="160" y1="100" x2="20" y2="100" stroke="#9b87f5" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" /> {/* Robot icon line */}
      <line x1="160" y1="100" x2="300" y2="100" stroke="#9b87f5" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
      
      {/* Side Middle Lines */}
      <line x1="160" y1="100" x2="80" y2="180" stroke="#9b87f5" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
      <line x1="160" y1="100" x2="210" y2="180" stroke="#9b87f5" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" /> {/* Bottom right line - Moved left */}
      
      {/* Bottom Lines */}
      <line x1="160" y1="100" x2="120" y2="260" stroke="#9b87f5" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
      <line x1="160" y1="100" x2="200" y2="260" stroke="#9b87f5" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
      <line x1="160" y1="100" x2="160" y2="280" stroke="#9b87f5" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
    </svg>
  );
};
