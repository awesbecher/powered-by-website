
import { Link } from "react-router-dom";

const Index = () => {
  const services = [
    {
      title: "In-Room Dining",
      description: "Order food and drinks directly to your room",
      link: "/room-service",
    },
    {
      title: "Get an Insurance Quote",
      description: "Protect your stay with our insurance options",
      link: "/insurance",
    },
    {
      title: "Upgrade your License",
      description: "Manage your hotel license and compliance",
      link: "/license",
    }
  ];

  return (
    <div className="min-h-screen w-full bg-neutral-soft">
      {/* Logo */}
      <div className="absolute top-6 right-6 lg:right-8">
        <a 
          href="https://madrone.capital/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img 
            src="/lovable-uploads/af07ee0c-70fa-4261-a83e-98ef6108f8ae.png"
            alt="Madrone Capital Logo"
            className="w-32 lg:w-48 h-auto"
          />
        </a>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden px-6 lg:px-8 pt-24 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              Voice Automation{" "}
              <span className="bg-gradient-to-r from-accent via-accent/80 to-accent/60 bg-clip-text text-transparent">
                Simplified
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 leading-8">
              Streamline your hotel operations with our comprehensive suite of services.
              From room service to compliance, we've got you covered.
            </p>
          </div>
        </div>
        
        {/* Gradient orbs for visual interest */}
        <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
      </div>

      {/* Services Grid */}
      <div className="relative px-4 lg:px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {services.map((service) => (
              <Link
                key={service.title}
                to={service.link}
                className="group relative overflow-hidden rounded-2xl bg-neutral-medium p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/5"
              >
                <div className="relative z-10">
                  <h3 className="text-2xl font-semibold tracking-tight text-white mb-4 whitespace-nowrap">
                    {service.title}
                  </h3>
                  <p className="text-gray-400">{service.description}</p>
                </div>
                
                {/* Card hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
