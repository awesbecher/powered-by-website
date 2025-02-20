
import { Link } from "react-router-dom";

const Index = () => {
  const services = [
    {
      title: "Room Service",
      description: "Order food and drinks directly to your room",
      link: "/room-service",
      image: "/lovable-uploads/f61255a3-5368-4739-a068-ec3431ea636f.png"
    },
    {
      title: "Insurance",
      description: "Protect your stay with our insurance options",
      link: "/insurance",
      image: "/lovable-uploads/403d2bfb-bc52-4ca1-937c-64ab85d08216.png"
    },
    {
      title: "License",
      description: "Manage your hotel license and compliance",
      link: "/license",
      image: "/lovable-uploads/57b14d49-eab1-4dd2-827d-dceb363f5514.png"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-neutral-soft">
      {/* Hero Section */}
      <div className="relative overflow-hidden px-6 lg:px-8 pt-32 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              Hotel Management{" "}
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
      <div className="relative px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.title}
                to={service.link}
                className="group relative overflow-hidden rounded-2xl bg-neutral-medium p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/5"
              >
                <div className="relative z-10">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-16 h-16 mb-6 transition-transform duration-300 group-hover:scale-110"
                  />
                  <h3 className="text-2xl font-semibold tracking-tight text-white mb-4">
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
