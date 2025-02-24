
import { motion } from "framer-motion";
import { CentralPlatform } from "./CentralPlatform";
import { ServiceIcons } from "./ServiceIcons";
import { AnimatedConnections } from "./AnimatedConnections";

const AgencyIllustration = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto h-[400px] flex items-center justify-center mb-12">
      <div className="relative">
        <CentralPlatform />
        <ServiceIcons />
        <AnimatedConnections />
      </div>
    </div>
  );
};

export default AgencyIllustration;
