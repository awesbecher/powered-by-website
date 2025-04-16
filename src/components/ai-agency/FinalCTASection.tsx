
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const FinalCTASection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
        Ready to transform your SMB with AI agents?
      </h2>
      <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
        Join the businesses revolutionizing the way they work, communicate, & engage customers.
      </p>
      <Link to="/contact">
        <Button 
          className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white px-8 py-6 text-lg rounded-md"
        >
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Link>
    </section>
  );
};

export default FinalCTASection;
