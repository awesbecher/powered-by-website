
import { Package2, Users, HeadphonesIcon, Building2, Check, Mail, Phone, MessageSquare, BrainCircuit, Bot, Workflow, MessagesSquare, HeartHandshake, Network, Database, Code2, Rocket, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { WordAnimation } from "@/components/home/WordAnimation";
import { ServiceCard } from "@/components/products/ServiceCard";

const Products = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      {/* Hero Section */}
      <div className="relative overflow-hidden px-6 lg:px-8 pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 
              className={`text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6 transition-all duration-1000 ease-out transform
                ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}
            >
              <WordAnimation />
              AI Solutions{" "}
              <span className="text-[#9b87f5]">
                Portfolio
              </span>
            </h1>
            
            <p 
              className={`mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ease-out transform
                ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}
            >
              Discover our comprehensive range of pre-built AI solutions designed to transform your business operations. Each solution is customizable to meet your specific needs.
            </p>
          </div>
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="space-y-0 divide-y divide-white/10">
          <ServiceCard
            title="Digital Strategy"
            icon={Rocket}
            description="Discovery and planning to integrate AI technology that aligns with your business goals and enhances customer experiences."
            features={[
              "AI Readiness Assessment",
              "Implementation Roadmap",
              "ROI Projections"
            ]}
          />
          {/* We'll add the other 9 solutions when you provide the content */}
        </div>
      </div>

      {/* Gradient orbs for visual interest */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
    </div>
  );
};

export default Products;
