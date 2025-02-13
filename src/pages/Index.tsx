
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-neutral-soft px-4 py-16 sm:px-6 lg:px-8">
      {/* Logo */}
      <div className="absolute top-8 right-8">
        <img 
          src="/lovable-uploads/335f70ec-aa5b-4954-aa12-c425ddd41fc5.png" 
          alt="Madrone Capital Logo" 
          className="h-60 w-auto"
        />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-3xl font-medium text-accent mb-4">
            Voice Agent Demo
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Choose Your Service
          </h1>
          <p className="mt-4 text-3xl font-bold text-gray-300">
            Speak to a live agent
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Room Service Card */}
          <Link to="/room-service" className="service-card group">
            <span className="service-label">Hospitality</span>
            <h2 className="service-title">Order Room Service</h2>
            <p className="mt-4 text-gray-300">
              Delicious meals delivered right to your room, available 24/7
            </p>
            <div className="mt-6 flex items-center text-accent">
              <span className="text-sm font-medium">Talk to an agent now</span>
              <Phone className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Insurance Quote Card */}
          <Link to="/insurance" className="service-card group">
            <span className="service-label">Insurance</span>
            <h2 className="service-title">Get Your Insurance Quote</h2>
            <p className="mt-4 text-gray-300">
              Quick and easy insurance quotes tailored to your needs
            </p>
            <div className="mt-6 flex items-center text-accent">
              <span className="text-sm font-medium">Talk to an agent now</span>
              <Phone className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* License Upgrade Card */}
          <Link to="/license" className="service-card group">
            <span className="service-label">Licensing</span>
            <h2 className="service-title">Upgrade Your License</h2>
            <p className="mt-4 text-gray-300">
              Seamlessly upgrade your license by talking to an agent
            </p>
            <div className="mt-6 flex items-center text-accent">
              <span className="text-sm font-medium">Talk to an agent now</span>
              <Phone className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
