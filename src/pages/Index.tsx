
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
    <div className="min-h-screen w-full bg-neutral-soft px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold tracking-tight text-white text-center sm:text-5xl md:text-6xl mb-16">
          Hotel Services
        </h1>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.title}
              to={service.link}
              className="service-card group"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-16 h-16 mb-6"
              />
              <h3 className="service-title">{service.title}</h3>
              <p className="mt-4 text-gray-400">{service.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
