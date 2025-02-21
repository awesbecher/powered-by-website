
import { ServiceCard } from "@/components/home/ServiceCard";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";

const Demo = () => {
  return (
    <div className="min-h-screen w-full bg-[#222222]">
      {/* Header with Logo and Nav */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 lg:px-8 py-6">
        <Link to="/">
          <img 
            src="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
            alt="Parlar Logo"
            className="w-[192px] lg:w-[288px] h-auto"
          />
        </Link>
        <Navigation />
      </div>

      {/* Main Content */}
      <div className="relative pt-32 pb-16 px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden px-6 lg:px-8 pt-24 pb-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6 animate-fade-in opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '0.2s' }}>
                Experience Our{" "}
                <span className="text-accent">
                  AI Demos
                </span>
              </h1>
              <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-400 leading-6 animate-fade-in opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '0.4s' }}>
                Try our industry-specific AI solutions in action. Select any demo below to get started.
              </p>
            </div>
          </div>
        </div>

        {/* Demo Cards Grid */}
        <div className="relative px-4 lg:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              <ServiceCard
                title="Retail AI Demo"
                description="Experience our retail customer service and sales AI assistant."
                link="/demo/retail"
                logo="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
                category="Retail Services"
              />
              <ServiceCard
                title="Insurance AI Demo"
                description="Try our AI-powered insurance claims and policy assistant."
                link="/demo/insurance"
                logo="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
                category="Insurance"
              />
              <ServiceCard
                title="Hospitality AI Demo"
                description="See how our AI handles hotel services and guest requests."
                link="/demo/hospitality"
                logo="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
                category="Hospitality"
              />
              <ServiceCard
                title="SaaS Sales Demo"
                description="Experience our AI sales representative for software solutions."
                link="/demo/saas"
                logo="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
                category="SaaS Licensing"
              />
              <ServiceCard
                title="Auto Dealer Demo"
                description="Try our AI car sales and service scheduling assistant."
                link="/demo/auto"
                logo="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
                category="Auto Dealer"
              />
              <ServiceCard
                title="Healthcare Demo"
                description="Experience our AI healthcare scheduling and support assistant."
                link="/demo/healthcare"
                logo="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
                category="Healthcare"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Background Gradients */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
    </div>
  );
};

export default Demo;
