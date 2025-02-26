
import ServiceCard from "./ServiceCard";

const ServicesGrid = () => {
  const services = [
    {
      title: "Classic Cut",
      price: "$30",
      description: "Traditional haircut with expert styling",
      duration: "30 min"
    },
    {
      title: "Fade",
      price: "$35",
      description: "Professional fade with precise blending",
      duration: "45 min"
    },
    {
      title: "Beard Trim",
      price: "$20",
      description: "Expert beard shaping and trimming",
      duration: "20 min"
    },
    {
      title: "Hot Towel Shave",
      price: "$40",
      description: "Luxurious straight razor shave",
      duration: "45 min"
    },
    {
      title: "Hair & Beard Combo",
      price: "$50",
      description: "Complete grooming package",
      duration: "1 hour"
    },
    {
      title: "Kids Cut",
      price: "$25",
      description: "Gentle styling for young clients",
      duration: "30 min"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center text-white mb-12">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default ServicesGrid;
