import React from "react";
import { Mic, Settings, Clock, ShieldCheck } from "lucide-react";
import { FeatureIcon } from "./FeatureIcon";

interface FeaturesListProps {
  initialLoad: boolean;
  compact?: boolean;
}

export const FeaturesList: React.FC<FeaturesListProps> = ({ initialLoad, compact = false }) => {
  return (
    <div className={`w-full transition-all duration-1000 ease-out transform
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
    </div>
  );
};
