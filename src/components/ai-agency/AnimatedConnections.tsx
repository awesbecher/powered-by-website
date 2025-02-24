
export const AnimatedConnections = () => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
      {/* Static Dots */}
      {/* Top Dots */}
      <circle cx="120" cy="75" r="3" fill="#4ade80" />
      <circle cx="200" cy="75" r="3" fill="#4ade80" />
      
      {/* Middle Dots */}
      <circle cx="110" cy="160" r="3" fill="#4ade80" />
      <circle cx="210" cy="160" r="3" fill="#4ade80" />
      
      {/* Side Dots */}
      <circle cx="60" cy="120" r="3" fill="#4ade80" />
      <circle cx="260" cy="120" r="3" fill="#4ade80" />
      
      {/* Bottom Dots */}
      <circle cx="120" cy="200" r="3" fill="#4ade80" />
      <circle cx="200" cy="200" r="3" fill="#4ade80" />
      <circle cx="160" cy="220" r="3" fill="#4ade80" />

      {/* Static Hash Lines */}
      {/* Top Lines */}
      <line x1="160" y1="120" x2="120" y2="75" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="160" y1="120" x2="200" y2="75" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" />
      
      {/* Middle Lines */}
      <line x1="160" y1="120" x2="110" y2="160" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="160" y1="120" x2="210" y2="160" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" />
      
      {/* Side Lines */}
      <line x1="160" y1="120" x2="60" y2="120" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="160" y1="120" x2="260" y2="120" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" />
      
      {/* Bottom Lines */}
      <line x1="160" y1="120" x2="120" y2="200" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="160" y1="120" x2="200" y2="200" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="160" y1="120" x2="160" y2="220" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" />
    </svg>
  );
};
