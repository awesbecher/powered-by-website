
import React from "react";
import PricingCard from "./PricingCard";

const PricingGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <PricingCard type="starter" />
      <PricingCard type="growth" isPopular={true} />
      <PricingCard type="enterprise" />
    </div>
  );
};

export default PricingGrid;
