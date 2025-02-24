
export const AnimatedConnections = () => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
      {/* Animated Dots */}
      <circle className="animate-pulse" r="3" fill="#4ade80">
        <animateMotion
          path="M 160,100 L 80,50"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle className="animate-pulse" r="3" fill="#4ade80">
        <animateMotion
          path="M 160,100 L 240,50"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle className="animate-pulse" r="3" fill="#4ade80">
        <animateMotion
          path="M 160,100 L 260,100"
          dur="1.8s"
          repeatCount="indefinite"
        />
      </circle>
      <circle className="animate-pulse" r="3" fill="#4ade80">
        <animateMotion
          path="M 160,100 L 60,100"
          dur="1.8s"
          repeatCount="indefinite"
        />
      </circle>
      <circle className="animate-pulse" r="3" fill="#4ade80">
        <animateMotion
          path="M 160,100 L 240,150"
          dur="2.2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle className="animate-pulse" r="3" fill="#4ade80">
        <animateMotion
          path="M 160,100 L 80,150"
          dur="2.2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle className="animate-pulse" r="3" fill="#4ade80">
        <animateMotion
          path="M 160,100 L 160,180"
          dur="2.4s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Hash Lines */}
      <line x1="160" y1="100" x2="80" y2="50" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" className="animate-dash">
        <animate attributeName="stroke-dashoffset" from="0" to="16" dur="1s" repeatCount="indefinite" />
      </line>
      <line x1="160" y1="100" x2="240" y2="50" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" className="animate-dash">
        <animate attributeName="stroke-dashoffset" from="0" to="16" dur="1s" repeatCount="indefinite" />
      </line>
      <line x1="160" y1="100" x2="260" y2="100" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" className="animate-dash">
        <animate attributeName="stroke-dashoffset" from="0" to="16" dur="1s" repeatCount="indefinite" />
      </line>
      <line x1="160" y1="100" x2="60" y2="100" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" className="animate-dash">
        <animate attributeName="stroke-dashoffset" from="0" to="16" dur="1s" repeatCount="indefinite" />
      </line>
      <line x1="160" y1="100" x2="240" y2="150" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" className="animate-dash">
        <animate attributeName="stroke-dashoffset" from="0" to="16" dur="1s" repeatCount="indefinite" />
      </line>
      <line x1="160" y1="100" x2="80" y2="150" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" className="animate-dash">
        <animate attributeName="stroke-dashoffset" from="0" to="16" dur="1s" repeatCount="indefinite" />
      </line>
      <line x1="160" y1="100" x2="160" y2="180" stroke="#9b87f5" strokeWidth="2" strokeDasharray="4 4" className="animate-dash">
        <animate attributeName="stroke-dashoffset" from="0" to="16" dur="1s" repeatCount="indefinite" />
      </line>
    </svg>
  );
};
