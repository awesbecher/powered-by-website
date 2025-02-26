
import { WordAnimation } from "@/components/home/WordAnimation";
import { ServiceCard } from "@/components/home/ServiceCard";
import { services, additionalServices } from "@/data/services";
import { useState, useEffect } from "react";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { useLocation } from "react-router-dom";

const Demo = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  useEffect(() => {
    // Scroll to top with a slight delay to ensure DOM is ready
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 0);
  }, [location]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      {/* Hero Section */}
      <div className="relative overflow-hidden px-6 lg:px-8 pb-8 pt-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className={`text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6 transition-all duration-1000 ease-out transform
                ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}>
              See our <span className="text-[#9b87f5]">AI Agents</span> in Action!
            </h1>
            <p className={`mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-bold transition-all duration-1000 delay-300 ease-out transform
                ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}>
              Our agents can automate &amp; improve even your most complex customer-facing or internal tasks.<br />
              Experience our pre-built voice agents by clicking any one of the below.<br />
              Order room service! Book a test drive with Mercedes! Get an insurance quote!
            </p>
          </div>
        </div>
        
        {/* Gradient orbs for visual interest */}
        <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
      </div>

      {/* Services Grid */}
      <div className="relative px-4 lg:px-6 space-y-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {services.map(service => <ServiceCard key={service.title} {...service} />)}
          </div>
        </div>

        {/* Additional Services Grid */}
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {additionalServices.map(service => <ServiceCard key={service.title} {...service} />)}
          </div>
        </div>
      </div>

      {/* Closing CTA */}
      <ClosingCTA />
    </div>
  );
};

export default Demo;
