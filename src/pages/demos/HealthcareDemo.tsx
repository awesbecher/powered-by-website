
import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const HealthcareDemo = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    {
      id: "checkup",
      name: "Annual Checkup",
      description: "Comprehensive health examination"
    },
    {
      id: "dental",
      name: "Dental Cleaning",
      description: "Professional teeth cleaning"
    },
    {
      id: "specialist",
      name: "Specialist Consultation",
      description: "Expert medical consultation"
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
              Healthcare AI Assistant Demo
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
              See how our AI handles appointment scheduling, patient inquiries, and medical information.
            </p>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`bg-black/50 backdrop-blur-xl p-6 rounded-xl cursor-pointer transition-all ${
                    selectedService === service.id ? 'ring-2 ring-accent' : ''
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <h3 className="text-xl font-semibold text-white mb-2">{service.name}</h3>
                  <p className="text-gray-400 text-sm mb-6">{service.description}</p>
                  <Button 
                    variant={selectedService === service.id ? "default" : "outline"} 
                    className={`w-full ${selectedService === service.id ? 'bg-accent hover:bg-accent/90' : ''}`}
                  >
                    Schedule Appointment
                  </Button>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-12 text-center">
              <Button className="bg-accent hover:bg-accent/90">
                <Phone className="w-4 h-4 mr-2" />
                Speak to an Agent
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

export default HealthcareDemo;
