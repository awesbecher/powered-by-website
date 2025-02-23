
const DataFlowParticles = () => {
  return (
    <>
      {/* Cyan particles */}
      <circle className="animate-pulse" cx="128" cy="96" r="1" fill="#61dafb">
        <animateMotion
          path="M 0 0 Q 30 -40 64 -20"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle className="animate-pulse" cx="128" cy="96" r="1" fill="#61dafb">
        <animateMotion
          path="M 0 0 Q -30 -40 -64 -20"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle className="animate-pulse" cx="128" cy="96" r="1" fill="#61dafb">
        <animateMotion
          path="M 0 0 Q 40 20 64 20"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>
      <circle className="animate-pulse" cx="128" cy="96" r="1" fill="#61dafb">
        <animateMotion
          path="M 0 0 Q -40 20 -64 20"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Purple particles */}
      <circle className="animate-pulse" cx="128" cy="96" r="1" fill="#9b87f5">
        <animateMotion
          path="M 0 0 Q 35 -35 70 -15"
          dur="2.3s"
          repeatCount="indefinite"
        />
      </circle>
      <circle className="animate-pulse" cx="128" cy="96" r="1" fill="#9b87f5">
        <animateMotion
          path="M 0 0 Q -35 -35 -70 -15"
          dur="2.3s"
          repeatCount="indefinite"
        />
      </circle>
      <circle className="animate-pulse" cx="128" cy="96" r="1" fill="#9b87f5">
        <animateMotion
          path="M 0 0 Q 45 15 75 25"
          dur="1.7s"
          repeatCount="indefinite"
        />
      </circle>
      <circle className="animate-pulse" cx="128" cy="96" r="1" fill="#9b87f5">
        <animateMotion
          path="M 0 0 Q -45 15 -75 25"
          dur="1.7s"
          repeatCount="indefinite"
        />
      </circle>
    </>
  );
};

export default DataFlowParticles;
