
import React from "react";
import PricingCard from "./PricingCard";

interface PricingGridProps {
  isAnnual: boolean;
}

const PricingGrid = ({ isAnnual }: PricingGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <PricingCard type="starter" isAnnual={isAnnual} tallyFormId="w2og9b" />
      <PricingCard type="growth" isPopular={true} isAnnual={isAnnual} tallyFormId="w2og9b" />
      <PricingCard type="enterprise" tallyFormId="w2og9b" />
    </div>
  );
};

export default PricingGrid;
