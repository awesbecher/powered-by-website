
const ConnectingLines = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
        {/* Chat Agent connection */}
        <path
          d="M 200 100 Q 250 150 300 150 L 350 150"
          stroke="#9b87f5"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 4"
          className="animate-dash"
        />
        {/* Voice Agent connection */}
        <path
          d="M 50 150 L 150 150"
          stroke="#9b87f5"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 4"
          className="animate-dash"
        />
        {/* SMS Agent connection */}
        <path
          d="M 75 200 L 175 150"
          stroke="#9b87f5"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 4"
          className="animate-dash"
        />
        {/* Email Agent connection */}
        <path
          d="M 200 200 Q 250 200 300 200"
          stroke="#9b87f5"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 4"
          className="animate-dash"
        />
        {/* Task Agent connection */}
        <path
          d="M 50 200 L 150 200"
          stroke="#9b87f5"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 4"
          className="animate-dash"
        />
        {/* API Agent connection - Updated to connect to the primary box */}
        <path
          d="M 300 250 Q 250 200 175 175"
          stroke="#9b87f5"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 4"
          className="animate-dash"
        />
        {/* Slack Agent connection - Updated to connect to the primary box */}
        <path
          d="M 75 250 Q 125 200 175 175"
          stroke="#9b87f5"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 4"
          className="animate-dash"
        />
      </svg>
    </div>
  );
};

export default ConnectingLines;
