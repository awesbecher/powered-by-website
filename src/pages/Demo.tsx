import { ServiceCard } from "@/components/home/ServiceCard";
import { services, additionalServices } from "@/data/services";
import { Link } from "react-router-dom";

const Demo = () => {
  return (
    <div className="min-h-screen w-full bg-[#222222]">
      {/* Header with Logo and Nav */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 lg:px-8 py-6">
        {/* Logo */}
        <Link to="/">
          <img 
            src="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
            alt="Parlar Logo"
            className="w-[192px] lg:w-[288px] h-auto"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex items-center space-x-3">
            <li>
              <Link to="/" className="text-white hover:text-accent transition-colors">
                AI Agency
              </Link>
            </li>
            <li className="text-white">|</li>
            <li>
              <Link to="/solutions" className="text-white hover:text-accent transition-colors">
                Solutions
              </Link>
            </li>
            <li className="text-white">|</li>
            <li>
              <Link to="/demo" className="text-accent transition-colors">
                Demos
              </Link>
            </li>
            <li className="text-white">|</li>
            <li>
              <Link to="/contact" className="text-white hover:text-accent transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="relative pt-32 pb-16 px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden px-6 lg:px-8 pt-24 pb-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6 animate-fade-in opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '0.2s' }}>
                We have{" "}
                <span className="text-accent">
                  demos
                </span>
                !{" "}
                <span className="text-white">
                  Now go have fun
                </span>
              </h1>
              <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-400 leading-6 animate-fade-in opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '0.4s' }}>
                See our AI agents in action by selecting any of the industry-specific use cases below.
              </p>
            </div>
          </div>
          
          {/* Gradient orbs for visual interest */}
          <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
          <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
        </div>

        {/* Services Grid */}
        <div className="relative px-4 lg:px-6 space-y-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              {services.map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>
          </div>

          {/* Additional Services Grid */}
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              {additionalServices.map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
