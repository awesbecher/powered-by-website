
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { ServiceCard } from "../components/home/ServiceCard";

const Solutions = () => {
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
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              Industry-Specific AI Solutions
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
              Explore our tailored AI solutions designed to meet the unique challenges of your industry.
            </p>
          </div>

          {/* Solutions Grid */}
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <ServiceCard
              title="Retail AI Suite"
              description="Complete AI solution for retail customer engagement and sales."
              link="/demo"
              logo="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
              category="Retail Services"
            />
            <ServiceCard
              title="Insurance AI Platform"
              description="Intelligent claims processing and policy management."
              link="/demo"
              logo="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
              category="Insurance"
            />
            <ServiceCard
              title="Hospitality Assistant"
              description="AI-powered guest services and experience management."
              link="/demo"
              logo="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
              category="Hospitality"
            />
            <ServiceCard
              title="SaaS Sales AI"
              description="Automated lead qualification and sales processes."
              link="/demo"
              logo="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
              category="SaaS Licensing"
            />
            <ServiceCard
              title="Auto Sales AI"
              description="Streamline vehicle sales and customer interactions."
              link="/demo"
              logo="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
              category="Auto Dealer"
            />
          </div>
        </div>
      </div>

      {/* Background Gradients */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
    </div>
  );
};

export default Solutions;
