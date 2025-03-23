
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PoweredByText } from "@/components/shared/PoweredByText";

export const FinalCTASection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#6342ff] to-[#a87cff]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#6342ff] mix-blend-multiply opacity-60"></div>
          <div className="absolute -bottom-48 -right-48 w-96 h-96 rounded-full bg-[#a87cff] blur-3xl opacity-40"></div>
          <div className="absolute -top-48 -left-48 w-96 h-96 rounded-full bg-[#6342ff] blur-3xl opacity-40"></div>
        </div>
        <div className="relative px-8 py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business with AI?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            Join the SMBs already using <PoweredByText /> AI agents to reduce costs, improve customer satisfaction, and scale operations.
          </p>
          <Link to="/contact">
            <Button className="bg-white hover:bg-gray-100 text-[#6342ff] font-bold px-8 py-6 text-lg rounded-md">
              Book a Demo <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
