
import { WordAnimation } from "@/components/home/WordAnimation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Bot, Clock, ChartBar, MessageSquare, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-[#222222]">
      {/* Logo */}
      <div className="absolute top-6 right-6 lg:right-8">
        <img 
          src="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
          alt="Parlar Logo"
          className="w-[192px] lg:w-[288px] h-auto"
        />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden px-6 lg:px-8 pt-24 pb-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              <WordAnimation />
              Automation{" "}
              <span className="text-white">
                Simplified
              </span>
            </h1>
            
            {/* Value Proposition */}
            <p className="mt-8 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Empower your business with intelligent AI agents that handle customer interactions across all channels - voice, email, SMS, chat, and more.
            </p>
            
            {/* CTA Button */}
            <div className="mt-10">
              <Link to="/demo">
                <Button className="bg-accent hover:bg-accent-dark text-white px-8 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105">
                  See Our Solutions
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {[
            {
              icon: Building2,
              title: "Built for SMBs",
              description: "Tailored automation solutions for businesses with 5-250 employees"
            },
            {
              icon: Bot,
              title: "Multi-Channel AI",
              description: "Voice, email, SMS, Slack, chat, and document automation"
            },
            {
              icon: Clock,
              title: "24/7 Availability",
              description: "Instant responses across all communication channels"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="glass-card p-6 rounded-xl text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <feature.icon className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Gradient orbs for visual interest */}
        <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
      </div>

      {/* Industries Section */}
      <div className="relative px-6 lg:px-8 py-20 bg-neutral-medium/50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12">Industries We Serve</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { title: "Hospitality", icon: "🏨" },
              { title: "Automotive", icon: "🚗" },
              { title: "Restaurants", icon: "🍽️" },
              { title: "Real Estate", icon: "🏢" }
            ].map((industry, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{industry.icon}</div>
                <h3 className="text-white font-medium">{industry.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
