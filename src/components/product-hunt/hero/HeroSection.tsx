
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  initialLoad: boolean;
}

export const HeroSection = ({ initialLoad }: HeroSectionProps) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className={`transition-all duration-1000 ease-out transform ${initialLoad ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Custom AI Agents for <span className="text-[#9b87f5]">Small Businesses</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Deploy agentic AI solutions for voice, email, SMS, and more. No coding required.
            Built for SMBs who need enterprise-grade AI solutions at affordable prices.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <a href="https://www.producthunt.com/posts/powered_by" target="_blank" rel="noreferrer">
              <Button
                className="bg-[#4A2A82] hover:bg-[#3D2269] text-white px-6 py-6 text-lg rounded-md w-full sm:w-auto flex items-center"
              >
                <img src="/lovable-uploads/a5f716f2-7362-4352-8931-2d27b2892c7e.png" alt="Product Hunt" className="w-6 h-6 mr-2" />
                View on Product Hunt
              </Button>
            </a>
            <Link to="/contact">
              <Button
                className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-6 text-lg rounded-md w-full sm:w-auto"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
