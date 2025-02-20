
import { Clock, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    name: "Classic Haircut",
    description: "Precision cut with attention to detail and style preferences",
    price: "$35",
    duration: "30 min"
  },
  {
    name: "Beard Trim & Shape",
    description: "Professional beard grooming and styling",
    price: "$25",
    duration: "20 min"
  },
  {
    name: "Premium Package",
    description: "Haircut, beard trim, hot towel treatment & styling",
    price: "$65",
    duration: "60 min"
  },
  {
    name: "Hot Towel Shave",
    description: "Traditional straight razor shave with hot towel treatment",
    price: "$40",
    duration: "45 min"
  },
  {
    name: "Kids Haircut",
    description: "Gentle haircut for children under 12",
    price: "$25",
    duration: "30 min"
  },
  {
    name: "Hair & Scalp Treatment",
    description: "Deep conditioning treatment with scalp massage",
    price: "$45",
    duration: "40 min"
  }
];

const RetailServices = () => {
  return (
    <div className="min-h-screen bg-[#222222] text-white">
      {/* Logo */}
      <div className="absolute top-8 right-8">
        <img 
          src="/lovable-uploads/07f82a95-cea8-417e-96f0-5d8ef95f0200.png"
          alt="Flagship Barbers Logo"
          className="h-12 w-auto"
        />
      </div>

      {/* Header */}
      <div className="relative pt-24 px-4 lg:px-8">
        <Link to="/" className="absolute top-8 left-8 text-gray-400 hover:text-white transition-colors">
          ← Back
        </Link>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome! Book an appointment.
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Flagship Barbers has been serving the Tacoma public for 25 years. We specialize in classic barbershop style and fades. Select which services you'd like and chat with us below to book an appointment.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div 
              key={service.name}
              className="bg-black/50 rounded-lg p-6 backdrop-blur-sm border border-white/10 hover:border-accent/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">{service.name}</h3>
                <span className="text-accent font-bold">{service.price}</span>
              </div>
              <p className="text-gray-400 mb-4">{service.description}</p>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                <span>{service.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Iframe */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-12">
        <div className="bg-accent/10 rounded-lg p-8 border border-accent/20">
          <h2 className="text-2xl font-bold mb-4 text-center">Chat with Us to Book Your Appointment</h2>
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/E3xjnZ-H-sl1mXJ_y7Hza"
            width="100%"
            style={{ height: '700px' }}
            frameBorder="0"
            title="Chatbase Booking Assistant"
          />
        </div>
      </div>
    </div>
  );
};

export default RetailServices;
