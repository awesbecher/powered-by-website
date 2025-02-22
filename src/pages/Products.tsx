
import { Package2, Users, HeadphonesIcon, Building2, Check, Mail, Phone, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const Products = () => {
  return (
    <div className="min-h-screen bg-[#222222]">
      {/* Hero Section */}
      <div className="relative overflow-hidden px-6 lg:px-8 pt-24 pb-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              AI Automation{" "}
              <span className="text-white">
                Simplified
              </span>
            </h1>
            
            {/* Value Proposition */}
            <p className="mt-8 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Empower your business with intelligent AI agents that handle customer interactions across all channels - voice, email, SMS, chat, and more.
            </p>
          </div>
        </div>

        {/* Gradient orbs for visual interest */}
        <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
      </div>
    </div>
  );
};

export default Products;
