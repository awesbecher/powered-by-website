
import ServiceCard from "./ServiceCard";

const services = [
  {
    title: "Haircut",
    price: "$30",
    duration: "30 mins",
    description: "Classic men's haircut tailored to your style",
    image: "/lovable-uploads/dac317cc-0dbe-4fbd-9e8b-8f3e4e1ef731.png"
  },
  {
    title: "Beard Trim",
    price: "$20",
    duration: "20 mins",
    description: "Professional beard grooming and shaping",
    image: "/lovable-uploads/dac317cc-0dbe-4fbd-9e8b-8f3e4e1ef731.png"
  },
  {
    title: "Hot Towel Shave",
    price: "$35",
    duration: "45 mins",
    description: "Traditional hot towel straight razor shave",
    image: "/lovable-uploads/dac317cc-0dbe-4fbd-9e8b-8f3e4e1ef731.png"
  },
  {
    title: "Kids Haircut",
    price: "$25",
    duration: "30 mins",
    description: "Gentle haircuts for children under 12",
    image: "/lovable-uploads/dac317cc-0dbe-4fbd-9e8b-8f3e4e1ef731.png"
  }
];

const ServicesGrid = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default ServicesGrid;
