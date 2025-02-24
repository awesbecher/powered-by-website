
import { motion } from "framer-motion";
import { CentralPlatform } from "./CentralPlatform";
import { ServiceIcons } from "./ServiceIcons";
import { AnimatedConnections } from "./AnimatedConnections";

const AgencyIllustration = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto h-[400px] flex items-center justify-center mb-12">
      <div className="relative w-[400px] h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] opacity-50" />
        <AnimatedConnections />
        <CentralPlatform />
        <ServiceIcons />
      </div>
    </div>
  );
};

export default AgencyIllustration;
