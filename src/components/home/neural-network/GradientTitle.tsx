
const GradientTitle = () => {
  return (
    <>
      <defs>
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D6BCFA" />
          <stop offset="50%" stopColor="#9b87f5" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>

      <text
        x="128"
        y="40"
        textAnchor="middle"
        fill="url(#textGradient)"
        fontSize="18"
        fontFamily="system-ui"
        fontWeight="bold"
        className="select-none"
      >
        Custom Agent Builder
      </text>
      
      <text
        x="128"
        y="40"
        textAnchor="middle"
        fill="none"
        stroke="#9b87f5"
        strokeWidth="0.5"
        fontSize="18"
        fontFamily="system-ui"
        fontWeight="bold"
        className="select-none"
        opacity="0.3"
      >
        Custom Agent Builder
      </text>
    </>
  );
};

export default GradientTitle;
