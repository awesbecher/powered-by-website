
import { Package2, Users, HeadphonesIcon, Building2, Check, Mail, Phone, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { WordAnimation } from "@/components/home/WordAnimation";

const Products = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] pt-36">
      {/* Hero Section */}
      <div className="relative overflow-hidden px-6 lg:px-8 pb-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 
              className={`text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6 transition-all duration-1000 ease-out transform
                ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}
            >
              <WordAnimation />
              Automation{" "}
              <span className="text-white">
                Simplified
              </span>
            </h1>
            
            {/* Value Proposition */}
            <p 
              className={`mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-bold transition-all duration-1000 delay-300 ease-out transform
                ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}
            >
              Empower your business with intelligent AI agents that handle customer interactions across <span className="text-[#9b87f5]">all channels</span> - voice, email, SMS, chat, and more. Streamline operations, reduce costs, and deliver exceptional service 24/7.
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
