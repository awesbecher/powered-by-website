
import { motion } from "framer-motion";
import { CentralPlatform } from "./CentralPlatform";
import { ServiceIcons } from "./ServiceIcons";
import { AnimatedConnections } from "./AnimatedConnections";

const AgencyIllustration = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto h-[400px] flex items-start justify-center mt-12">
      <div className="relative">
        <ServiceIcons />
        <AnimatedConnections />
        <CentralPlatform />
      </div>
    </div>
  );
};

export default AgencyIllustration;

