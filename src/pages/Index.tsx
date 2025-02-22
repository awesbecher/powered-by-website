import { WordAnimation } from "@/components/home/WordAnimation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Bot, Clock, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const [animate, setAnimate] = useState(true);

  const handleClick = () => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 10);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]" onClick={handleClick}>
      {/* Logo */}
      <div className="absolute top-6 left-6 lg:left-8">
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
            <h1 
              className={`text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4 ${
                animate ? 'animate-fade-in' : 'opacity-0'
              }`}
            >
              Why should those Silicon Valley <span className="font-extrabold text-purple-400">nerds</span> have all the fancy toys?
            </h1>
            
            {/* Value Proposition */}
            <p 
              className={`mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-bold ${
                animate ? 'animate-fade-in [animation-delay:200ms]' : 'opacity-0'
              }`}
            >
              We're the world's first <span className="border-b-2 border-purple-400">AI agency</span> delivering custom AI agent solutions to SMBs.
            </p>
            
            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <Button className="bg-accent hover:bg-accent-dark text-white px-8 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                  Book a Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button className="bg-white hover:bg-gray-100 text-accent px-8 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                Talk to an AI Agent Now
                <Phone className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {[
            {
              icon: Building2,
              title: "Built for SMBs",
              description: "Custom AI automation solutions for business with 1-1,000 employees"
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
    </div>
  );
};

export default Index;
