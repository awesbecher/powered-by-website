
import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const AutoDealerDemo = () => {
  const [selectedCar, setSelectedCar] = useState<string | null>(null);

  const cars = [
    {
      id: "luxury-sedan",
      name: "Luxury Sedan",
      price: "$45,000",
      features: ["Leather interior", "Premium sound", "Advanced safety"]
    },
    {
      id: "suv",
      name: "Premium SUV",
      price: "$55,000",
      features: ["7 seats", "All-wheel drive", "Panoramic roof"]
    },
    {
      id: "electric",
      name: "Electric Vehicle",
      price: "$65,000",
      features: ["300mi range", "Autopilot", "Zero emissions"]
    }
  ];

  return (
    <div className="min-h-screen w-full bg-[#222222]">
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

      <div className="relative pt-32 pb-16 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              Auto Dealer AI Demo
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
              Experience AI-powered vehicle sales, scheduling test drives, and customer support.
            </p>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cars.map((car) => (
                <div
                  key={car.id}
                  className={`bg-black/50 backdrop-blur-xl p-6 rounded-xl cursor-pointer transition-all ${
                    selectedCar === car.id ? 'ring-2 ring-accent' : ''
                  }`}
                  onClick={() => setSelectedCar(car.id)}
                >
                  <h3 className="text-xl font-semibold text-white mb-2">{car.name}</h3>
                  <p className="text-2xl font-bold text-accent mb-4">{car.price}</p>
                  <ul className="text-gray-400 text-sm space-y-2 mb-6">
                    {car.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                  <Button 
                    variant={selectedCar === car.id ? "default" : "outline"} 
                    className={`w-full ${selectedCar === car.id ? 'bg-accent hover:bg-accent/90' : ''}`}
                  >
                    Schedule Test Drive
                  </Button>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-12 text-center">
              <Button className="bg-accent hover:bg-accent/90">
                <Phone className="w-4 h-4 mr-2" />
                Speak to Sales
              </Button>
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

export default AutoDealerDemo;
