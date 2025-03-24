
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <div className="mt-24">
      <div className="bg-gradient-to-r from-[#6342ff]/20 to-[#a87cff]/20 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to get started?</h2>
        <p className="text-xl text-gray-300 mb-8">
          Choose the plan that works for you or contact us for a custom solution.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild className="bg-[#7E69AB] text-white hover:bg-[#6E59A5]">
            <Link to="/contact">Contact Sales</Link>
          </Button>
          <Button asChild variant="outline" className="bg-[#6342ff] text-white hover:bg-[#5838e0] border-transparent">
            <Link to="/demo">Book a Demo</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
