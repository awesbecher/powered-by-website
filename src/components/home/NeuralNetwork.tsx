
import CircuitPatterns from "./neural-network/CircuitPatterns";
import GradientTitle from "./neural-network/GradientTitle";
import NetworkNodes from "./neural-network/NetworkNodes";
import DataFlowParticles from "./neural-network/DataFlowParticles";

const NeuralNetwork = () => {
  return (
    <div className="absolute inset-0">
      <svg className="w-full h-full" viewBox="0 0 256 192">
        <CircuitPatterns />
        <GradientTitle />
        <NetworkNodes />
        <DataFlowParticles />
      </svg>
    </div>
  );
};

export default NeuralNetwork;
