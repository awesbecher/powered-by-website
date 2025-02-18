
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  return <div className="min-h-screen w-full bg-neutral-soft px-4 py-16 sm:px-6 lg:px-8">
      {/* Logo */}
      {!isMobile && <div className="absolute top-8 right-8">
          <a href="https://madrone.capital/" target="_blank" rel="noopener noreferrer">
            <img src="/lovable-uploads/335f70ec-aa5b-4954-aa12-c425ddd41fc5.png" alt="Madrone Capital Logo" className="h-48 w-auto" />
          </a>
        </div>}

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10">
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
            <div className="mb-6">
              <img 
                src="/lovable-uploads/ba7183d3-c2d6-46b1-b51e-afa9de2b5af2.png" 
                alt="GrandView Hotel" 
                className="h-[102.4px] w-auto mx-auto"
              />
            </div>
            <h2 className="service-title">Order Room Service</h2>
            <p className="mt-4 text-gray-300">
              Delicious meals delivered right to your room, available 24/7
            </p>
            <div className="mt-6 flex items-center text-accent">
              <span className="text-sm font-medium">Talk to Room Service now</span>
              <Phone className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Insurance Quote Card */}
          <Link to="/insurance" className="service-card group">
            <div className="mb-6">
              <img 
                src="/lovable-uploads/994965fb-70d5-436c-8d42-8377d9d8d3bd.png" 
                alt="Planter's Insurance" 
                className="h-16 w-auto mx-auto"
              />
            </div>
            <h2 className="service-title">Get Your Insurance Quote</h2>
            <p className="mt-4 text-gray-300">
              Quick and easy insurance quotes tailored to your needs
            </p>
            <div className="mt-6 flex items-center text-accent">
              <span className="text-sm font-medium">Talk to an Agent now</span>
              <Phone className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* License Upgrade Card */}
          <Link to="/license" className="service-card group">
            <div className="mb-6">
              <img 
                src="/lovable-uploads/ba13be0d-77b7-49f3-aa99-9524e25c5294.png" 
                alt="RightBloom" 
                className="h-16 w-auto mx-auto"
              />
            </div>
            <h2 className="service-title">Upgrade Your License</h2>
            <p className="mt-4 text-gray-300">
              Seamlessly upgrade your license by talking to an agent
            </p>
            <div className="mt-6 flex items-center text-accent">
              <span className="text-sm font-medium">Talk to a Sales Rep now</span>
              <Phone className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </div>
    </div>;
};

export default Index;
